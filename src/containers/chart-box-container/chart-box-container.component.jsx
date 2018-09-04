import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChartBox from '../../components/chart-box';

const COLUMN = 'column';
const ROW = 'row';

const basicConfig = {
  'svgHeight': 250,
  'marginLeft': 20,
  'marginTop': 20,
  'marginBottom': 5,
};

class ChartBoxContainer extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      'config': {
        'svgWidth': parseInt(window.innerWidth, 10),
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
      const { boxType } = this.props;

      let fullWidth = 0;
      if (boxType === COLUMN) {
        fullWidth = parseInt(window.innerWidth, 10);
      } else {
        fullWidth = parseInt(window.innerWidth * 0.7, 10);
      }

      if (fullWidth !== config.svgWidth) {
        this.setState({
          'config': {
            ...this.state.config,
            'svgWidth': fullWidth,
          },
        });
      }
    }

    render() {
      return (
        <ChartBox
          {...this.props}
          config={{
            ...basicConfig,
            ...this.state.config
          }}
        />
      );
    }
}

ChartBoxContainer.displayName = 'ChartBoxContainer';
ChartBoxContainer.propTypes = {
     'boxType': PropTypes.string,
   };
ChartBoxContainer.defaultProps = {
     'boxType': COLUMN,
   };

export default ChartBoxContainer;
