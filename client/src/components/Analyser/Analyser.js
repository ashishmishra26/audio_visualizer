import React, {
    Component
} from 'react';
import Visualiser from '../Visualiser/Visualiser';

export default class Analyser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioData: new Uint8Array(0)
        }
        this.tick = this.tick.bind(this);
    }
    componentDidMount() {
        this.audioContext = new(window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.distortion = this.audioContext.createWaveShaper();
        this.gainNode = this.audioContext.createGain();
        this.biquadFilter = this.audioContext.createBiquadFilter();
        this.convolver = this.audioContext.createConvolver();

        this.analyser.fftSize = 512;
        this.analyser.minDecibels = -31;
        this.analyser.smoothingTimeConstant = 1;
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);

        this.source.connect(this.analyser);
        this.analyser.connect(this.distortion);
        this.distortion.connect(this.biquadFilter);
        this.biquadFilter.connect(this.convolver);
        this.convolver.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        this.biquadFilter.type = "lowshelf";
        this.biquadFilter.frequency.setValueAtTime(1000, this.audioContext.currentTime);
        this.biquadFilter.gain.setValueAtTime(25, this.audioContext.currentTime);

        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.rafId = requestAnimationFrame(this.tick);
    }

    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({
            audioData: this.dataArray
        });
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        return <Visualiser audioData = {
            this.state.audioData
        }
        plotType = {
            this.props.plotType
        }
        />;
    }
}