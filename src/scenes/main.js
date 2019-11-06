/**
|--------------------------------------------------
| This is the main component, which holds the state
| of the all the components and values are passed 
| with the help of props.
| I created the TemplateService.js for this assignment, 
| which can be used to implement CRUD operations.
| Even though for this assignment, we can do without
| that file.

| Just used very simple styling for this assignment 
|--------------------------------------------------
*/

import React, { PureComponent } from 'react';
import Search from '../components/Search';
import CardInfo from '../components/CardInfo';
import uuid from 'uuid';
import TrainingService from '../shared/TrainingService';
import DisplayEvents from './DisplayEvents';
import { Departments, MeetingRooms } from '../shared/SharedData';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.TrainingService = new TrainingService();

    //Error messages which are used for verification.
    //Used simple validation because of time constraint
    this.ERR_MSG = {
      NAME: 'Invalid Input. Name should be 5 characters long',
      DEPARTMENT: 'Value cannot not be empty',
      DURATION: 'Value should be greater than 0',
      DATE_TIME: 'Please select the date and time',
      MEETING_ROOM: 'Please select from the available meeting rooms',
    };

    //Master State => Used to store all the values across this platform.
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
      meetRooms: MeetingRooms,
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
    if (values.department === '' || values.department === 'Select') {
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

    if (values.meeting_room === '' || values.meeting_room === 'Select') {
      let err = this.state.errors;
      err.meetingRoom = this.ERR_MSG.MEETING_ROOM;
      this.setState({
        errors: err,
        isFormValid: false,
      });
    }

    return this.state.isFormValid;
  };

  //getting the values from the service.
  getEvents = async () => {
    await this.TrainingService.getAllEvents().then(events => {
      this.setState({
        training_events: this.state.training_events.concat(events),
      });
    });
  };

  //Adding the event to the service and also to the state
  addEventToService = async () => {
    await this.fieldValidations(this.state.event_input)
      .then(res => {
        if (this.state.isFormValid) {
          //Adding the new event to the state and to the service
          const temp = { ...this.state.event_input };
          const temp1 = temp;
          temp['id'] = uuid.v4();
          this.TrainingService.addEvent(temp)
            .then(res => {
              this.setState({
                //Clearing the errors
                errors: {
                  name: '',
                  department: '',
                  duration: '',
                  dateTime: '',
                  meetingRoom: '',
                  description: '',
                },
                training_events: res,
              });
            })
            .then(res => {
              //Modifying the status of meeting room
              let temp1 = MeetingRooms.map(mr => {
                if (
                  temp.meetingRoom.indexOf(mr.name) > -1 &&
                  mr.status === 'Available'
                )
                  mr.status = 'NA';
                return mr;
              });
              this.setState({
                meetRooms: temp1,
              });
            });
        } else {
          console.log('error');
        }
      })
      .catch(e => console.log(e));
  };

  //Clicking on any of the event to update the event.
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

  //Editing the event
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

  //This method is to dynamically store the values to the state from
  // input field
  handleChange = async (e, type) => {
    const inputs = this.state.event_input;
    inputs[type] = e;
    this.setState({
      event_input: inputs,
    });
  };

  //Render
  render() {
    return (
      <div>
        <h2>Infrrd Take Home assignment</h2>
        <CardInfo
          meetRooms={this.state.meetRooms}
          errors={this.state.errors}
          handleChange={this.handleChange}
        ></CardInfo>
        <button onClick={this.addEventToService}>Add Event</button>
        <Search SearchTerm={this.SearchTerm}></Search>
        <DisplayEvents
          meetRooms={this.state.meetRooms}
          allEvents={this.state.training_events}
          activateCard={this.activateCard}
          editCard={this.editCard}
        ></DisplayEvents>
      </div>
    );
  }
}

export default Main;
