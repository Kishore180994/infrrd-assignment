/**
|--------------------------------------------------
| This is the component which displays all the sessions
| which are previously scheduled.
|--------------------------------------------------
*/

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
  meetRooms,
  activateCard = () => {},
  editCard = () => {},
}) => {
  return (
    <List>
      {allEvents.map(evnt =>
        evnt.found === false ? (
          ''
        ) : (
          <li key={evnt.id}>
            <div onDoubleClick={activateCard.bind(null, evnt.id)}>
              <Card
                meetRooms={meetRooms}
                event={evnt}
                isEdit={evnt.isEdit}
                editCard={editCard}
              ></Card>
            </div>
          </li>
        )
      )}
    </List>
  );
};

export default DisplayEvents;
