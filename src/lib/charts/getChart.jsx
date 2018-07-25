import React from 'react';

import {
  TIMELINE,
  CHORD,
} from './chartTypes.js';

import TimelineDiagram from '../../components/d3-timeline-diagram';

const getChart = (props) => {
  return (
    <div>
      {(() => {
        switch (props.chart) {
          case TIMELINE:
            return <TimelineDiagram {...props} />;
            break;
          default:
            return <p>No chart</p>;
          }
        })()}
    </div>
  );
};

export default getChart;
