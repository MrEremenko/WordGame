import React, { Dispatch, SetStateAction, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface Props {
  setPlayersAmount: Dispatch<SetStateAction<number>>;
}

const Players: React.FC<Props> = ({ setPlayersAmount }) => {

  const [players, setPlayers] = useState(2);

  const options = [
    { name: "2 players", value: 2 },
    { name: "3 players", value: 3 },
    { name: "4 players", value: 4 }
  ]

  return (
    <ButtonGroup>
        {options.map((option, idx) => (
          <ToggleButton
            key={idx}
            id={`players-${idx}`}
            type="radio"
            variant={'outline-success'}
            name="players"
            value={option.value}
            checked={players === option.value}
            onChange={(e) => { 
              setPlayers(+e.currentTarget.value);
              setPlayersAmount(+e.currentTarget.value);
            }}>
            {option.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
  );
}

export default Players;
