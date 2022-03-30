import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface Props {
  playerAmount: number;
  me: {
    twoPlayerWins: number;
    threePlayerWins: number;
    fourPlayerWins: number;
  }
}

const PlayArea: React.FC<Props> = ({ me, playerAmount }) => {

  const [players, setPlayers] = useState([1, 2, 3]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{  }}>Test</div>
        {
          players.map((player, i) => {
            return <div key={i}>{i}</div>
          })
        }
      </div>
    </div>
  );
}

export default PlayArea;
