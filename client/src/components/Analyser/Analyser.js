import React, { useState, useRef, useEffect } from 'react';
import Visualiser from '../Visualiser/Visualiser';

export default function Analyser(props) {
    // states
    const [audioData, setAudioData] = useState(new Uint8Array(0));

    // refs
    const controller = useRef({});
    const rAfId = useRef(null);

    const tick = () => {
        controller.current.analyser.getByteTimeDomainData(controller.current.dataArray);

        console.log('tick');
        setAudioData(controller.current.dataArray);

        rAfId.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        // instantiate audio content
        const audioCntxt = new(window.AudioContext || window.webkitAudioContext)();

        const analyser = audioCntxt.createAnalyser();
        const source = audioCntxt.createMediaStreamSource(props.audio);

        // create different instances
        const distortion = audioCntxt.createWaveShaper();
        const gainNode = audioCntxt.createGain();
        const biquadFilter = audioCntxt.createBiquadFilter();
        const convolver = audioCntxt.createConvolver();

        // intialise analyser config
        analyser.fftSize = 512;
        analyser.minDecibels = -31;
        analyser.smoothingTimeConstant = 1;

        // create connections
        source.connect(analyser);
        analyser.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(convolver);
        convolver.connect(gainNode);
        gainNode.connect(audioCntxt.destination);

        biquadFilter.type = "lowshelf";
        biquadFilter.frequency.setValueAtTime(1000, audioCntxt.currentTime);
        biquadFilter.gain.setValueAtTime(25, audioCntxt.currentTime);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        controller.current = {
            analyser,
            source,
            dataArray,
        };

        rAfId.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rAfId.current);
            controller.current.analyser.disconnect();
            controller.current.source.disconnect();
        }
    }, []);

    return (
        <Visualiser 
            audioData={audioData}
            plotType={props.plotType}
        />
    )
}