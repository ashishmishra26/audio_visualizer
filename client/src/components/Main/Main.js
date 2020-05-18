import React, {useState, useCallback} from 'react';

// components
import Header from '../Header/Header';
import Analyser from '../Analyser/Analyser';
import TypeSelector from '../TypeSelector/TypeSelector';

// constants & utils
import { getUserAudioInput, stopUserAudioInput } from '../../utils';

// css & media
import './Main.css';

export default function Main() {
  const [audioInput, setAudioInput] = useState(false); 

  const getMicrophone = useCallback(async () => {
    setAudioInput(await getUserAudioInput());
  }, []);

  const stopMicrophone = useCallback(() => {
    stopUserAudioInput(audioInput);
    setAudioInput(null);
  }, [audioInput]);
  
  const toggleMicrophone = useCallback(() => {
    if (audioInput) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }, [audioInput, getMicrophone, stopMicrophone]);

  return (
    <div className="wrapper">
      <Header 
        audioInput={audioInput}
        toggleMicrophone={toggleMicrophone}
      />
      {
        audioInput ?
          <Analyser
            audio={audioInput}
          /> 
        : null
      }
    </div>
  )
}
