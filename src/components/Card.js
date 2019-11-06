/**
|--------------------------------------------------
| This component displays single event, which can also be editable by double 
| clicking the card.
|--------------------------------------------------
*/
import React from 'react';
import styled from '@emotion/styled';
import CardTemplate from '../templates/CardTemplate';
import { Departments, MeetingRooms } from '../shared/SharedData';

const ToolTip = styled.div`
  visibility: hidden;
  width: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  left: 0%;
  z-index: 1;
`;

class Editable extends React.Component {
  render() {
    const { event, editCard, meetRooms } = this.props;
    return (
      <CardTemplate>
        <div>
          <input
            type="text"
            className="name"
            placeholder="Name"
            width="40"
            defaultValue={event.name}
            onKeyPress={this.checkEnter}
          ></input>
        </div>
        <div>
          <input
            type="number"
            className="duration"
            placeholder="Duration(in mins)"
            width="40"
            defaultValue={event.duration}
            onKeyPress={this.checkEnter}
          ></input>
        </div>
        <div>
          <select className="meetingRoom" onChange={e => this.finishEdit(e)}>
            <option>Select</option>
            {meetRooms.map(mr =>
              mr.status !== 'Available' ? (
                ''
              ) : (
                <option>
                  {mr.name}-{mr.status}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <select className="department" onChange={e => this.finishEdit(e)}>
            <option>Select</option>
            {Departments.map(d => (
              <option>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            className="dateTime"
            placeholder="DateTime"
            width="40"
            defaultValue={event.dateTime}
            onKeyPress={this.checkEnter}
          ></input>
        </div>
        <div></div>
      </CardTemplate>
    );
  }

  checkEnter = e => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = e => {
    const value = e.target.value;
    const typo = e.target.className;
    console.log(value, typo);
    if (this.props.editCard) {
      this.props.editCard([value, typo], this.props.event.id);
    }
  };
}

const Card = ({ event, isEdit, editCard, meetRooms }) => {
  if (isEdit)
    return (
      <Editable
        event={event}
        editCard={editCard}
        meetRooms={meetRooms}
      ></Editable>
    );
  else
    return (
      <CardTemplate>
        <div>{event['name']}</div>
        <div>{event['duration']}</div>
        <div>{event['meetingRoom']}</div>
        <div>{event['department']}</div>
        <div>{event['dateTime']}</div>
        <ToolTip className="tooltip">Double click the card to edit</ToolTip>
      </CardTemplate>
    );
};

export default Card;
