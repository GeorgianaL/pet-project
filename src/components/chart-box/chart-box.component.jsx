import React, { Component } from 'react';

import Legend from '../chart-legend';
import { isEqual } from 'lodash';

import { getChart, getChartDescription, getChartLegend } from '../../lib/charts';
import './chart-box.scss';

/**
  ChartBox - stateless component which renders a box containing
  the title, the svg, the chart legend and the description for any Chart
  props {
    type: 'column'/ 'row'
  }
*/

class ChartBox extends Component {

  shouldComponentUpdate(nextProps) {
    if (this.props.boxType !== nextProps.boxType ||
    !isEqual(this.props.config, nextProps.config)) {
      return true;
    }
    return false;
  }

  render() {
    const { boxType, chart, data } = this.props;
    return (
      <div className={`chart-box chart-box--${boxType}`}>
        <div className="chart-box__content">
          {getChart(this.props)}
          <div className="chart-box--legend">
            <Legend data={getChartLegend(chart, data)} chart={chart} />
          </div>
        </div>
        <div className="chart-box__main">
          <div className="chart-box--title">
            <p>{chart}</p>
          </div>
          <div className="chart-box--description">
            {getChartDescription(chart)}
          </div>
        </div>
      </div>
    );
  }
}

export default ChartBox;
