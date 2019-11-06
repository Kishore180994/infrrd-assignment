class TrainingService {
  constructor() {
    this.tr_events = [
      {
        id: '1',
        name: 'Example',
        department: 'None',
        duration: 'None',
        dateTime: 'None',
        meeting_room: 'None',
        description: 'None',
      },
    ];
  }

  async getAllEvents() {
    return Promise.resolve(this.tr_events);
  }

  async getEvent(id) {
    return this.tr_events.map(e => {
      if (e.id === id) {
        return Promise.resolve(e);
      }
    });
  }

  async addEvent(event) {
    this.tr_events = this.tr_events.concat(event);
    return Promise.resolve(this.tr_events);
  }

  async deleteEvent(id) {
    this.tr_events.map(e => {
      if (e.id === id) {
        console.log(e);
      }
    });
  }

  async updateEvent(id) {
    this.tr_events.map(e => {
      if (e.id === id) {
        console.log(e);
      }
    });
  }
}

export default TrainingService;
