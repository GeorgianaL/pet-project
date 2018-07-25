import React from 'react';

import { getChart, getChartDescription } from '../../lib/charts';
import './chart-box.scss';

/**
  ChartBox - stateless component which renders a box containing
  the title, the svg and the description for any Chart
  props {
    type: 'column'/ 'row'
  }
*/

const ChartBox = props => (
  <div className={`chart-box chart-box--${props.boxType}`}>
    <div className="chart-box__content">
      {getChart(props)}
    </div>
    <div className="chart-box__main">
      <div className="chart-box--title">
        <p>{props.chart}</p>
      </div>
      <div className="chart-box--description">
        {getChartDescription(props.chart)}
      </div>
    </div>
  </div>
);

export default ChartBox;
