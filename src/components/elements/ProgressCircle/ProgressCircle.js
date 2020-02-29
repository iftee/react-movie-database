import React, { Component } from 'react';
import './ProgressCircle.scss';

class ProgressCircle extends Component {
  constructor(props) {
    super(props);

    const { radius, strokeWidth } = this.props;

    this.normalizedRadius = radius - strokeWidth * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
    
    this.state = {
      progress: 0
    };
  }

  componentDidMount() {
    const { progress } = this.props;
    setTimeout(function() {
      this.setState({progress: progress * 10});
    }.bind(this), 1000);
  }

  render() {
    const { radius, strokeWidth, strokeColor, fillColor, progress } = this.props;
    const strokeDashoffset = this.circumference - this.state.progress / 100 * this.circumference;
    return(
      <div className="progress-circle-wrap">
        <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-circle"
        >
          <circle
            stroke={strokeColor}
            fill={fillColor}
            strokeDasharray={this.circumference + ' ' + this.circumference}
            style={{strokeDashoffset}}
            strokeWidth={strokeWidth}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="progress-numeric">{progress}</div>
      </div>      
    )
  }
}

export default ProgressCircle;