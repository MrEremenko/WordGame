import React, { Dispatch, SetStateAction, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { setDuration } from '../actions/GameActions';
// import GameState from '../reducers/GameReducer';

interface Props {
  setDuration?: Dispatch<SetStateAction<number>>;
}

const Duration: React.FC<Props> = () => {

  // const durationValue = useSelector<GameState, GameState["duration"]>((state) => state.duration);
  const dispatch = useDispatch();

  const onSetDuration = (duration:number) => {
    // dispatch(setDuration(duration));
  }


  const options = [
    { name: "10 seconds", value: 10 },
    { name: "20 seconds", value: 20 }
  ]

  return (
    <ButtonGroup>
        {options.map((option, idx) => (
          <ToggleButton
            key={idx}
            id={`duration-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="duration"
            value={option.value}
            // checked={durationValue === option.value}
            onChange={(e) => {
              onSetDuration(+e.target.value);
            }}>
            {option.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
  );
}

export default Duration;
