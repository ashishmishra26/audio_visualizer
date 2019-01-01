import React, { Component } from 'react';

export default class Visualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {
            plotType: 'line' 
        }
        this.resize = this.resize.bind(this);
      }

      componentDidMount() {
        this.resize();
        window.addEventListener('resize', this.resize);
      }

      componentDidUpdate() {
        switch (this.props.plotType) {
            case 'line':
            this.draw();
            break;
            case 'column':
            this.draw2()
            break;
            default:
            this.draw()
        }
      }
    
      draw() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1) / audioData.length;

        context.lineWidth = 1;
        context.strokeStyle = this.getRandomColor() || '#F2B945';
        context.clearRect(0, 0, width, height);
    
        context.beginPath();
        context.moveTo(0, height / 2);
        for (let i = 0; i < audioData.length ; i++) {
          const y = (audioData[i] / 255) * height;
          context.lineTo(x, y);
            x += sliceWidth;
        }

        context.lineTo(x, height / 2);
        context.stroke();
      }

      draw2() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const barWidth = (width / audioData.length) * 2.5;
        const context = canvas.getContext('2d');
        let x = 0;
        var barHeight;

        context.lineWidth = 1;
        context.strokeStyle = '#17839F';
        context.clearRect(0, 0, width, height);
        context.beginPath();

        for (let i = 0; i < audioData.length; i++) {
            barHeight = audioData[i] * 6;
            context.fillStyle = '#00000f';
            context.fillRect(x, height-barHeight / 2, barWidth, barHeight / 2);      
            x += barWidth + 1;
        }
        context.stroke();
      }

      resize () {
        const canvas = document.getElementById('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight / 1.16;
      }

      getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      render() {
        return <div className="visualiser"><canvas id="canvas" ref={this.canvas} /></div>;
      }
}
