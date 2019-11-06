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
        isEdit: false,
        found: true,
      },
    ];
  }

  async getAllEvents() {
    return Promise.resolve(this.tr_events);
  }

  async getEvent(id) {
    let et = this.tr_events.map(e => {
      if (e.id === id) {
        return e;
      }
    });
    return Promise.resolve(et);
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

  async updateEvent(obj) {
    this.tr_events = this.tr_events.map(e => {
      if (e.id === obj.id) {
        e = obj;
      }
      return e;
    });
    return Promise.resolve('Updated the Event');
  }
}

export default TrainingService;
