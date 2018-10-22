import React, { Component } from 'react';

import OptionsList from '../../components/options';
import ForceLayout from '../../components/d3-force-layout';
import './style.scss';

import data from '../../model/expertise';
import { getUniqueProps } from '../../lib';

const listType = 'radio'; // checkbox

class Expertise extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      'config': {
        'svgWidth': parseInt(window.innerWidth, 10),
        'svgHeight': 500,
      },
      'tools': [],
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.updateSelectedOptions = this.updateSelectedOptions.bind(this);
  }

componentWillMount() {
   window.addEventListener('resize', this.updateDimensions);
 }

 componentDidMount() {
   this.updateDimensions();
   this.setState({
     'tools': data,
   });
 }
 componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
      const { config } = this.state;
      let chartWidth;

      if (window.innerWidth <= 690) {
        chartWidth = parseInt(window.innerWidth, 10);
      } else {
        chartWidth = parseInt(window.innerWidth * 0.6, 10);
      }
      console.log(window.innerWidth, chartWidth);
      if (chartWidth !== config.svgWidth) {
        this.setState({
          'config': {
            ...this.state.config,
            'svgWidth': chartWidth,
          },
        });
      }
    }

    updateSelectedOptions(option) {
      let allTools = data;
      if (option !== '') {
        allTools = allTools.filter(item => item.cat === option);
      } else {
        allTools = data;
      }
      this.setState({
        'tools': allTools,
      })
    }

    render() {
      return (
        <div className="expertise">
          <div className="expertise__description">
            <p className="expertise__title">Technologies Stack I use</p>
            <p className="expertise__subtitle">Filter them by...</p>
            <OptionsList
              options={getUniqueProps(data, 'cat')}
              type={listType}
              updateSelectedOptions={this.updateSelectedOptions}
            />
          </div>
          <ForceLayout
            data={this.state.tools}
            config={{
              ...this.state.config
            }}
          />
        </div>
      );
    }
 }

 export default Expertise;
