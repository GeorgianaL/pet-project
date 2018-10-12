import React from 'react';

import {
  TIMELINE,
  WORLDMAP,
  CHORD,
} from './chartTypes.js';

import TimelineDiagram from '../../components/d3-timeline-diagram';
import WorldMap from '../../components/d3-world-map';
import Chord from '../../components/d3-chord';

const getChart = (props) => {
  return (
    <div>
      {(() => {
        switch (props.chart) {
          case TIMELINE:
            return <TimelineDiagram {...props} />;
          case WORLDMAP:
            return <WorldMap {...props} />;
          case CHORD:
            return <Chord {...props} />;
          default:
            return <p>No chart</p>;
          }
        })()}
    </div>
  );
};

export default getChart;
