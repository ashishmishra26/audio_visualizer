import React, {useState, useCallback} from 'react';

// components
import Analyser from '../Analyser/Analyser';

// constants & utils
import {plotMap} from '../../constants';
import { getUserAudioInput, stopUserAudioInput } from '../../utils';

// css & media
import './Main.css';

export default function Main() {
  const [audioInput, setAudioInput] = useState(false); 
  const [plotType, setPlotType] = useState(plotMap.LINE);

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
      <div className="upper">
        <button className="mt-auto btn" onClick={toggleMicrophone}>
          {audioInput ? 'Stop' : 'Start'}
        </button>
        <div className="type-container">
          <button className="mt-auto type-btn" onClick={() => { setPlotType(plotMap.LINE); }}>
            <i className="fas fa-chart-line"></i>
          </button>
          <button className="mt-auto type-btn" onClick={() => { setPlotType(plotMap.BAR); }}>
            <i className="fas fa-chart-bar"></i>
          </button>
        </div>
      </div>
      {
        audioInput ?
          <Analyser
            audio={audioInput}
            plotType={plotType}
          /> 
        : null
      }
    </div>
  )
}
