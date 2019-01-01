import React, { Component } from 'react';

export default class Visualiser extends Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
      }
    
      componentDidUpdate() {
        this.draw();
      }
    
      draw() {
        const { audioData } = this.props;
        const canvas = this.canvas.current;
        const height = canvas.height;
        const width = canvas.width;
        const context = canvas.getContext('2d');
        let x = 0;
        const sliceWidth = (width * 1.0) / audioData.length;
    
        context.lineWidth = 1;
        context.strokeStyle = '#00ff00';
        context.clearRect(0, 0, width, height);
    
        context.beginPath();
        context.moveTo(0, height / 2);
        for (const item of audioData) {
          const y = (item / 255.0) * height;
          context.lineTo(x, y);
          x += sliceWidth;
        }
        context.lineTo(x, height / 2);
        context.stroke();
      }

    //   draw2() {
    //     const { audioData } = this.props;
    //     const canvas = this.canvas.current;
    //     const height = canvas.height;
    //     const width = canvas.width;
    //     const barWidth = (width / audioData.length) * 2.5;
    //     const context = canvas.getContext('2d');
    //     let x = 0;
    //     var barHeight;

    //     context.lineWidth = 1;
    //     context.strokeStyle = '#00ff00';
    //     context.clearRect(0, 0, width, height);
    
    //     context.beginPath();
    //     for (const item of audioData) {
    //         barHeight = audioData[item];
    //         context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
    //         context.fillRect(x, height-barHeight / 2, barWidth, barHeight / 2);    
        
    //         x += barWidth + 1;
    //     }
    //     context.stroke();
    //   }
    
      render() {
        return <canvas width="600" height="600" ref={this.canvas} />;
      }
}
