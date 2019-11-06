import React, { PureComponent } from 'react';
import Search from '../components/Search';
import CardInfo from '../components/CardInfo';
import uuid from 'uuid';
import TrainingService from '../shared/TrainingService';
import DisplayEvents from './DisplayEvents';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.TrainingService = new TrainingService();
    this.ERR_MSG = {
      NAME: 'Invalid Input. Name should be 5 characters long',
      DEPARTMENT: 'Value cannot not be empty',
      DURATION: 'Value should be greater than 0',
      DATE_TIME: 'Please select the date and time',
      MEETING_ROOM: 'Please select from the available meeting rooms',
    };
    this.state = {
      event_input: {
        id: '',
        name: '',
        department: '',
        duration: '',
        dateTime: '',
        meetingRoom: '',
        description: '',
        found: true,
      },
      isFormValid: true,
      errors: {
        name: '',
        department: '',
        duration: '',
        dateTime: '',
        meetingRoom: '',
        description: '',
      },
      training_events: [],
    };
  }

  //Loading the events from the service to the state
  componentDidMount() {
    this.getEvents();
  }

  //I will be searching the term among the array of the objects in training_events
  SearchTerm = word => {
    console.log(word);
    let results = this.state.training_events.map(eve => {
      if (
        eve['name'].indexOf(word) > -1 ||
        eve['department'].indexOf(word) > -1 ||
        eve['description'].indexOf(word) > -1
      ) {
        eve.found = true;
      } else {
        eve.found = false;
      }
      return eve;
    });
    this.setState({
      training_events: results,
    });
  };

  //Validating the fields
  //Implemented basic field validation due to time constraints for this assignment
  fieldValidations = async values => {
    this.setState({
      isFormValid: true,
    });

    if (values.name === '' || values.name.length < 5) {
      let err = this.state.errors;
      err.name = this.ERR_MSG.NAME;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }
    if (values.department === '') {
      let err = this.state.errors;
      err.department = this.ERR_MSG.DEPARTMENT;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }
    if (values.duration === '' || values.duration.length < 1) {
      let err = this.state.errors;
      err.duration = this.ERR_MSG.DURATION;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }
    if (values.dateTime === '') {
      let err = this.state.errors;
      err.dateTime = this.ERR_MSG.DATE_TIME;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }

    if (values.meeting_room === '') {
      let err = this.state.errors;
      err.meetingRoom = this.ERR_MSG.MEETING_ROOM;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }

    return this.state.isFormValid;
  };

  getEvents = async () => {
    await this.TrainingService.getAllEvents().then(events => {
      this.setState({
        training_events: this.state.training_events.concat(events),
      });
    });
  };

  addEventToService = async () => {
    await this.fieldValidations(this.state.event_input)
      .then(res => {
        if (this.state.isFormValid) {
          const temp = { ...this.state.event_input };
          temp['id'] = uuid.v4();
          this.TrainingService.addEvent(temp).then(res => {
            console.log(res);
            this.setState({ training_events: res });
          });
        } else {
          console.log('error');
        }
      })
      .catch(e => console.log(e));
  };

  activateCard = async (type, e) => {
    e.stopPropagation();
    await this.TrainingService.getEvent(type).then(async res => {
      let result = {};
      for (let x = 0; x < res.length; x++) {
        if (res[x] !== undefined) {
          result = res[x];
          break;
        }
      }
      console.log(result);
      let obj = { ...result };
      obj.isEdit = true;
      //After I get the card, I have to update values in card
      //Send the new object to the service.
      await this.TrainingService.updateEvent(obj).then(res => {
        this.setState({
          training_events: [],
        });
        this.getEvents();
      });
    });
  };

  editCard = (value, id) => {
    console.log('Editing the card', value, id);
    //value => ClassName and the updated Value and ID
    let key = value[1];
    let val = value[0];
    this.state.training_events.map(event => {
      if (event.id === id) {
        let temp = { ...event };
        temp[key] = val;
        temp.isEdit = false;
        console.log(temp);
        //Update the service data and state values
        this.TrainingService.updateEvent(temp).then(res => {
          console.log(res);
          //On successful update on the service, update the state too
          this.setState({
            training_events: this.state.training_events.map(eve => {
              if (eve.id === id) {
                eve = temp;
              }
              return eve;
            }),
          });
        });
      }
    });
  };

  handleChange = async (e, type) => {
    const inputs = this.state.event_input;
    inputs[type] = e;
    this.setState({
      event_input: inputs,
    });
  };
  render() {
    return (
      <div>
        <CardInfo
          errors={this.state.errors}
          handleChange={this.handleChange}
        ></CardInfo>
        <button onClick={this.addEventToService}>Add Event</button>
        <Search SearchTerm={this.SearchTerm}></Search>
        <DisplayEvents
          allEvents={this.state.training_events}
          activateCard={this.activateCard}
          editCard={this.editCard}
        ></DisplayEvents>
      </div>
    );
  }
}

export default Main;
