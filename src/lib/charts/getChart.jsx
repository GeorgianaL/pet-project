import React from 'react';

import {
  TIMELINE,
  WORLDMAP,
} from './chartTypes.js';

import TimelineDiagram from '../../components/d3-timeline-diagram';
import WorldMap from '../../components/d3-world-map';

const getChart = (props) => {
  return (
    <div>
      {(() => {
        switch (props.chart) {
          case TIMELINE:
            return <TimelineDiagram {...props} />;
            break;
          case WORLDMAP:
            return <WorldMap {...props} />;
            break;
          default:
            return <p>No chart</p>;
          }
        })()}
    </div>
  );
};

export default getChart;
