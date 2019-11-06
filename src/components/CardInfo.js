/**
|--------------------------------------------------
| This component is used to Book the sessions
|--------------------------------------------------
*/

import React from 'react';
import styled from '@emotion/styled';
import CardTemplate from '../templates/CardTemplate';
import { Departments, MeetingRooms } from '../shared/SharedData';

const ErrorDiv = styled.div`
  background: red;
  color: white;
`;

const CardInfo = ({ errors, handleChange, meetRooms }) => {
  return (
    <CardTemplate>
      <div>
        <input
          type="text"
          onChange={e => handleChange(e.target.value, 'name')}
          placeholder="name"
        ></input>
        <ErrorDiv>{errors.name}</ErrorDiv>
      </div>
      <div>
        <input
          type="number"
          onChange={e => handleChange(e.target.value, 'duration')}
          placeholder="duration"
        ></input>
        <ErrorDiv>{errors.duration}</ErrorDiv>
      </div>
      <div>
        <select
          defaultValue="Select from below options"
          onChange={e => handleChange(e.target.value, 'meetingRoom')}
        >
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
        <ErrorDiv>{errors.meetingRoom}</ErrorDiv>
      </div>
      <div>
        <select onChange={e => handleChange(e.target.value, 'department')}>
          <option>Select</option>
          {Departments.map(d => (
            <option>{d}</option>
          ))}
        </select>
        <ErrorDiv>{errors.department}</ErrorDiv>
      </div>
      <div>
        <input
          type="datetime-local"
          onChange={e => handleChange(e.target.value, 'dateTime')}
          placeholder="date"
        ></input>
        <ErrorDiv>{errors.dateTime}</ErrorDiv>
      </div>
      <div>
        <input
          type="text"
          onChange={e => handleChange(e.target.value, 'description')}
          placeholder="description"
        ></input>
        <ErrorDiv>{errors.dateTime}</ErrorDiv>
      </div>
    </CardTemplate>
  );
};

export default CardInfo;
