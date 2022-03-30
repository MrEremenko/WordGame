import React from 'react';

interface Props {
  twoPlayerWins: number;
  threePlayerWins: number;
  fourPlayerWins: number;
}

const PlayerTag: React.FC<Props> = ({ twoPlayerWins, threePlayerWins, fourPlayerWins }) => {

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {twoPlayerWins} · {threePlayerWins} · {fourPlayerWins}
    </div>
  );
}

export default PlayerTag;
