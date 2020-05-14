import React, {useState, useRef, useEffect, useCallback} from 'react';

// constants & utils
import {plotMap} from '../../constants';
import { getUserAudioInput, stopUserAudioInput } from '../../utils';

export default function Main() {
  const [plotType, setPlotType] = useState(undefined);
  const audioInput = useRef(null);

  const toggleMicrophone = () => {
    if (audioInput) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  }
  
  const getMicrophone = async () => {
    audioInput.current = await getUserAudioInput();
  }
  
  const stopMicrophone = () => {
    stopUserAudioInput(audioInput.current);
    audioInput.current = null;
  }

  useEffect(() => {
    getMicrophone();
  }, [])

  return (
    <div className="wrapper">
      <div className="upper">
        {/* <button className="mt-auto btn" onClick={()=>{this.toggleMicrophone()}}>
          {this.state.audio ? 'Stop' : 'Start'}
        </button> */}
        <div className="type-container">
          <button className="mt-auto type-btn" onClick={() => { setPlotType(plotMap.LINE); }}>
            <i className="fas fa-chart-line"></i>
          </button>
          <button className="mt-auto type-btn" onClick={() => { setPlotType(plotMap.BAR); }}>
            <i className="fas fa-chart-bar"></i>
          </button>
        </div>
      </div>
      <Analyser audio={this.state.audio} plotType={this.state.plotType}/>
    </div>
  )
}
