import React, { Component } from 'react';
import './App.css';
import Analyser from './components/Analyser';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      audio: null,
      plotType: 'line'
    }
  }
  render() {
    return (
      <div className="App">
        <div className="wrapper">
         <div className="upper">
          <button className="mt-auto btn" onClick={()=>{this.toggleMicrophone()}}>
           {this.state.audio ? 'Stop' : 'Start'}
          </button>
          <div className="type-container">
            <button className="mt-auto type-btn" onClick={()=>{this.changePlotType('line')}}>
              <i className="fas fa-chart-line"></i>
            </button>
            <button className="mt-auto type-btn" onClick={()=>{this.changePlotType('column')}}>
              <i className="fas fa-chart-bar"></i>
            </button>
          </div>
         </div>
         <div className="lower">
          {this.state.audio ? <Analyser audio={this.state.audio} plotType={this.state.plotType}/> : ''}
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

  changePlotType = (plotType) => {
    this.setState({'plotType': plotType});
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
