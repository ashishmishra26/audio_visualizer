import React, {useRef, useEffect, useCallback} from 'react';

import { plotMap } from '../../constants';
import { getRandomColor } from '../../utils';

import '../Main/Main';

export default function Visualiser(props) {
    const canvasRef = useRef(null);

    const drawLine = useCallback(() => {
        const canvas = canvasRef.current;
        const height = canvas.clientHeight;
        const width = canvas.clientWidth;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1) / props.audioData.length;

        context.lineWidth = 1;
        context.strokeStyle = getRandomColor();
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
            barHeight = props.audioData[i] * 6;
            context.fillStyle = '#00000f';
            context.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
        context.stroke();
    }, [props.audioData]);

    useEffect(() => {
        switch (props.plotType) {
            case plotMap.LINE:
                drawLine();
                break;
            case plotMap.BAR:
                drawColumn()
                break;
            default:
                drawLine()
        }
    }, [props.plotType, drawColumn, drawLine]);

    useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
    }, []);

    const resize = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 1.16;
    }

    return (
        <>
            <div>Hi</div>
            <canvas id="canvas" ref={canvasRef} />
        </>
    )
}