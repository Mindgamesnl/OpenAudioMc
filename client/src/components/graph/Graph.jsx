import React from 'react';
import PropTypes from 'prop-types';

export class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.drawGraph();
    window.addEventListener('resize', this.drawGraph);
  }

  componentDidUpdate() {
    this.drawGraph();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.drawGraph);
  }

  drawLine = (ctx, startX, startY, endX, endY, color) => {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  drawGraph = () => {
    const canvas = this.canvasRef.current;
    const { data, color, catchLine } = this.props;

    // Calculate min and max values of data
    let minDataValue = data[0];
    let maxDataValue = data[0];
    for (let i = 1; i < data.length; i++) {
      if (data[i] < minDataValue) {
        minDataValue = data[i];
      }
      if (data[i] > maxDataValue) {
        maxDataValue = data[i];
      }
    }

    const hasBigValues = minDataValue < -1 || maxDataValue > 1;

    if (hasBigValues) {
      minDataValue -= 0.2;
      maxDataValue += 0.2;
    } else {
      minDataValue -= 0.001;
      maxDataValue += 0.001;
    }

    // Scale graph to fit available space
    const { width } = canvas;
    const { height } = canvas;
    const yScale = height / (maxDataValue - minDataValue);
    const xScale = width / data.length;

    // Draw the graph
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'black';
    if (catchLine) ctx.fillText(catchLine, 5, 15);

    const initValue = data[0];
    let prevY = height - (initValue - minDataValue) * yScale;
    let skipped = false;

    let xBeforeSkip = 0;
    let yBeforeSkip = 0;

    for (let i = 1; i < data.length; i++) {
      const x1 = (i - 1) * xScale;
      const x2 = i * xScale;
      const currentValue = data[i];
      const currentY = height - (currentValue - minDataValue) * yScale;

      // fill the area under the line
      if (this.props.fill) {
        ctx.fillStyle = color;
        // change opacity based on the value
        ctx.fillRect(x1, currentY, xScale * 2, height - currentY);
      } else {
        if (currentValue === data[i - 1] && i !== data.length - 1) {
          // continue to next iteration of loop
          if (!skipped) {
            xBeforeSkip = x1;
            yBeforeSkip = prevY;
          }
          skipped = true;
          continue;
        } else if (skipped) {
          // draw a line from the previous value to the current value
          this.drawLine(ctx, xBeforeSkip, yBeforeSkip, x2, currentY, color);
          skipped = false;
        } else {
          this.drawLine(ctx, x1, prevY, x2, currentY, color);
        }

        // is this the last value?
        if (i === data.length - 1) {
          // draw current value
          // estimate the lenght of the text in pixels
          let textWidth = currentValue.toString().length * 8;

          // cap the text width to 50px
          if (textWidth > 50) textWidth = 50;

          ctx.fillText(currentValue, x2 - textWidth, currentY - 5);
        }
      }

      prevY = currentY;
    }
  };

  render() {
    return (
      <canvas
        style={{ width: '100%', height: '100%' }}
        ref={this.canvasRef}
        className="border-double border-2 border-blue-900"
      />
    );
  }
}

Graph.propTypes = {
  data: PropTypes.array.isRequired,
  color: PropTypes.string,
  catchLine: PropTypes.string,
};

Graph.defaultProps = {
  color: 'black',
  catchLine: 'No description provided',
};
