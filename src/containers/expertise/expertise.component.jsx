import React, { Component } from 'react';

import ForceLayout from '../../components/d3-force-layout';
import './style.scss';

class Expertise extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      'config': {
        'svgWidth': parseInt(window.innerWidth, 10),
        'svgHeight': 500,
      },
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

componentWillMount() {
   window.addEventListener('resize', this.updateDimensions);
 }

 componentDidMount() {
   this.updateDimensions();
 }
 componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
      const { config } = this.state;

      const chartWidth = parseInt(window.innerWidth * 0.6, 10)

      if (chartWidth !== config.svgWidth) {
        this.setState({
          'config': {
            ...this.state.config,
            'svgWidth': chartWidth,
          },
        });
      }
    }

    render() {
      return (
        <div className="expertise">
          <div>
            <p>Technologies Stack I use</p>
            <p>Filter them by...</p>
          </div>
          <ForceLayout
            config={{
              ...this.state.config
            }}
          />
        </div>
      );
    }
 }

 export default Expertise;
