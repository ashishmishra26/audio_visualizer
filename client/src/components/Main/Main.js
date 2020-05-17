import React, {useState, useCallback} from 'react';

// components
import Analyser from '../Analyser/Analyser';
import TypeSelector from '../TypeSelector/TypeSelector';
import Switch from '@material-ui/core/Switch';

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
      <div className="switch-wrapper">
        <Switch
          checked={Boolean(audioInput)}
          onChange={toggleMicrophone}
          color="default"
          name="controller"
          inputProps={{ 'aria-label': 'primary controller' }}
        />
      </div>
      <TypeSelector 
        setPlotType={setPlotType}
      />
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
