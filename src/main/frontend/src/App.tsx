import HCaptcha from '@hcaptcha/react-hcaptcha';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Duration from './components/Duration';
import Input from './components/Input';
import PlayerAmount from './components/PlayerAmount';
import PlayArea from './components/PlayerArea/PlayArea';


const App: React.FC = () => {
  const [go, setGo] = useState(false);
  const [playersAmount, setPlayersAmount] = useState<number>(2);
  const [duration, setDuration] = useState<number>(10);

  const handleVerificationSuccess = (token: string) => {
    console.log("token:", token);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", marginTop: "2vh" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginTop: "2vh" }}>
          {/* <Duration setDuration={setDuration} /> */}
          <Input />
          <div style={{ width: "2vw" }}></div>
          <PlayerAmount setPlayersAmount={setPlayersAmount} />
          <div style={{ width: "2vw" }}></div>
          <Button variant="primary" onClick={e => {
            console.log(playersAmount);
            console.log(duration);
            setGo(true);
          }}>Go</Button>
      </div>
      <form style={{ display: "flex", justifyContent: "center", marginTop: "2vh", visibility: go ? "visible":  "hidden" }}>
          <HCaptcha
            sitekey="7965b0cd-82f8-47da-a7a6-dbd48a47f201"
            onVerify={handleVerificationSuccess}
          />
      </form>
      <PlayArea playerAmount={2} me={{ twoPlayerWins: 2, threePlayerWins: 3, fourPlayerWins: 5 }}  />
    </div>
  );
}

export default App;