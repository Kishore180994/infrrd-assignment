import React from 'react';

const DisplayEvents = ({ allEvents }) => {
  return (
    <div>
      {allEvents.map(evnt => (
        <li>{evnt.name}</li>
      ))}
    </div>
  );
};

export default DisplayEvents;
