import React, { Component } from 'react';
import './App.css';
import Analyser from './components/Analyser';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      audio: null
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
         <div className="upper"><button className="mt-auto btn" onClick={()=>{this.toggleMicrophone()}}>
          {this.state.audio ? 'Stop' : 'Start'}
         </button></div>
         <div className="lower">
          {this.state.audio ? <Analyser audio={this.state.audio} /> : ''}
         </div>
        </div>
      </div>
    );
  }

  toggleMicrophone = () => {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

}

export default App;
