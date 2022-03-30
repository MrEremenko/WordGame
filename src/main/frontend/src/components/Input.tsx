import React, { Dispatch, SetStateAction, useState } from 'react';

import { InputGroup, FormControl } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { CheckWord } from '../actions/WordActions';

interface Props {
  // setWord?: () => string;
}


const Input: React.FC<Props> = () => {

  // const durationValue = useSelector<, GameState["duration"]>((state) => state.duration);
  const [word, setWord] = useState("");
  const dispatch = useDispatch();

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter word"
        aria-describedby="word-input"
        onChange={ e => {
          setWord(e.target.value);
          // if(e.target.value.length >= 5) {
          //   dispatch(CheckWord(e.target.value));
          //   setWord(e.target.value);
          // }
        }}
        value={word}
      />
      <InputGroup.Text id="word-input"></InputGroup.Text>
    </InputGroup>
  );
}

export default Input;

