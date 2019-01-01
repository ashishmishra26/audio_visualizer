import React, { Component } from 'react';
import Visualiser from './Visualiser';

export default class Analyser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioData: new Uint8Array(0)
        }
        this.tick = this.tick.bind(this);
    }
    componentDidMount() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.analyser.minDecibels = -31;
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.rafId = requestAnimationFrame(this.tick);
      }
    
      tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
      }
    
      componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
      }
    
      render() {
        return <Visualiser audioData={this.state.audioData} />;
      }
}
