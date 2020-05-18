import React, {useState, useRef, useEffect, useCallback} from 'react';

import TypeSelector from  '../TypeSelector/TypeSelector';

import { plotMap } from '../../constants';
import { getRandomColor } from '../../utils';

import '../Visualiser/Visualiser.css';

export default function Visualiser(props) {
    const [plotType, setPlotType] = useState(plotMap.LINE);
    const canvasRef = useRef(null);
    const wrapperRef = useRef(null);

    const drawLine = useCallback(() => {
        const canvas = canvasRef.current;
        const height = canvas.clientHeight;
        const width = canvas.clientWidth;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1) / props.audioData.length;

        context.lineWidth = 1;
        context.strokeStyle = '#3E4E50';
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.moveTo(0, height / 2);
        for (let i = 0; i < props.audioData.length; i++) {
            const y = (props.audioData[i] / 255) * height;
            context.lineTo(x, y);
            x += sliceWidth;
        }
        context.lineTo(x, height / 2);
        context.stroke();
    }, [props.audioData]);

    const drawColumn = useCallback(() => {
        const canvas = canvasRef.current;
        const height = canvas.clientHeight;
        const width = canvas.clientWidth;
        const barWidth = (width / props.audioData.length) * 2.5;
        const context = canvas.getContext('2d');
        let x = 0;
        var barHeight;

        context.lineWidth = 1;
        context.strokeStyle = '#17839F';
        context.clearRect(0, 0, width, height);
        context.beginPath();

        for (let i = 0; i < props.audioData.length; i++) {
            barHeight = props.audioData[i] * 3;
            context.fillStyle = '#3E4E50';
            context.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 4;
        }

        context.stroke();
    }, [props.audioData]);

    useEffect(() => {
        switch (plotType) {
            case plotMap.LINE:
                drawLine();
                break;
            case plotMap.BAR:
                drawColumn()
                break;
            default:
                drawLine()
        }
    }, [plotType, drawColumn, drawLine]);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        canvas.width = wrapper.clientWidth;
        canvas.height = wrapper.clientHeight - 56;
    }, []);

    return (
        <div className="visualiser" ref={wrapperRef}>
            <TypeSelector 
                setPlotType={setPlotType}
            />
            <canvas className="canvas" ref={canvasRef} />
        </div>
    )
}