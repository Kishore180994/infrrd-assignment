/**
|--------------------------------------------------
| This is the re-usable component(template) designed
| for all the cards.
|--------------------------------------------------
*/
import React from 'react';
import styled from '@emotion/styled';

const Perimeter = styled.div`
  display: flex;
  border: 1px black solid;
  justify-content: space-around;
  width: 80%;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 0px 0 rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.3);
    transform: scale(1.02, 1.02);
    .tooltip {
      visibility: visible;
    }
  }
`;

const RowFlex = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 3px 0px;
`;

const Child = styled.div`
  padding: 5px 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  div {
    width: 100%;
  }
`;

const Card = ({ children }) => {
  return (
    <Perimeter>
      <RowFlex>
        <Child>
          <div>
            <b>Name:</b>
          </div>
          <div>{children[0]}</div>
        </Child>
        <Child>
          <div>
            <b>Duration:</b>
          </div>
          <div>{children[1]}</div>
        </Child>
        <Child>
          <div>
            <b>Meeting Room #</b>
          </div>
          <div>{children[2]}</div>
        </Child>
      </RowFlex>
      <RowFlex>
        <Child>
          <div>
            <b>Department:</b>
          </div>
          <div>{children[3]}</div>
        </Child>
        <Child>
          <div>
            <b>DateTime:</b>
          </div>
          <div>{children[4]}</div>
        </Child>
        <Child>
          <div>
            <b>Description:</b>
          </div>
          <div>{children[5]}</div>
        </Child>
      </RowFlex>
      {children[6]}
    </Perimeter>
  );
};

export default Card;
