import React from 'react';
import styled from '@emotion/styled';

const Perimeter = styled.div`
  display: flex;
  border: 1px black solid;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  .first {
    border: 1px red solid;
    width: 100%;
  }
  .second {
    border: 1px purple solid;
    width: 100%;
  }
`;

const CardInfo = ({ handleChange }) => {
  return (
    <Perimeter className="card">
      <RowFlex>
        <div className="first">
          <div className="name">
            <span>Name</span>
            <input
              type="text"
              onChange={e => handleChange(e.target.value, 'name')}
            ></input>
          </div>
          <div className="duration">
            <span>Duration</span>
            <input
              type="text"
              onChange={e => handleChange(e.target.value, 'duration')}
            ></input>
          </div>
          <div className="meetingRoom">
            <span>Meeting Room #</span>
            <input
              type="text"
              onChange={e => handleChange(e.target.value, 'meetingRoom')}
            ></input>
          </div>
        </div>
        <div className="second">
          <div className="department">
            <span>Department</span>
            <input
              type="text"
              onChange={e => handleChange(e.target.value, 'department')}
            ></input>
          </div>
          <div className="date">
            <span>Date</span>
            <input
              type="text"
              onChange={e => handleChange(e.target.value, 'description')}
            ></input>
          </div>
        </div>
      </RowFlex>
      <div className="desc">
        <span>Description</span>
        <textarea
          onChange={e => handleChange(e.target.value, 'description')}
        ></textarea>
      </div>
    </Perimeter>
  );
};

export default CardInfo;
