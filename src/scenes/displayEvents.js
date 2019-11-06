import React from 'react';
import Card from '../components/Card';
import styled from '@emotion/styled';

const List = styled.ul`
  list-style-type: none;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    display: list-item;
    width: 100%;
  }
`;

const DisplayEvents = ({
  allEvents,
  activateCard = () => {},
  editCard = () => {},
}) => {
  return (
    <List>
      {allEvents.map(evnt => (
        <li key={evnt.id}>
          <div onDoubleClick={activateCard.bind(null, evnt.id)}>
            <Card event={evnt} isEdit={evnt.isEdit} editCard={editCard}></Card>
          </div>
        </li>
      ))}
    </List>
  );
};

export default DisplayEvents;
