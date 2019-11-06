import React, { PureComponent } from 'react';
import Search from '../components/search';
import CardInfo from '../components/CardInfo';
import uuid from 'uuid';
import TrainingService from '../shared/TrainingService';
import DisplayEvents from './displayEvents';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.TrainingService = new TrainingService();
    this.state = {
      event_input: {
        id: '',
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

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    this.TrainingService.getAllEvents().then(events => {
      this.setState({
        training_events: this.state.training_events.concat(events),
      });
    });
  };

  addEventToService = () => {
    const temp = { ...this.state.event_input };
    temp['id'] = uuid.v4();
    this.TrainingService.addEvent(temp).then(res => {
      console.log(res);
      this.setState({ training_events: res });
    });
  };

  handleChange = (e, type) => {
    const inputs = this.state.event_input;
    inputs[type] = e;
    this.setState({
      event_input: inputs,
    });
  };
  render() {
    return (
      <div>
        <Search></Search>
        <CardInfo handleChange={this.handleChange}></CardInfo>
        <DisplayEvents allEvents={this.state.training_events}></DisplayEvents>
        <button onClick={this.addEventToService}>Add Event</button>
      </div>
    );
  }
}

export default Main;
