import React from 'react';

import {
  TIMELINE,
  WORLDMAP,
} from './chartTypes.js';

const getChartDescription = (type, config) => {
  switch (type) {
    case TIMELINE:
      return (
        <p>
          Timelines come in all shapes and sizes. One of the most common and popular is the kind that represents the duration of events as bands and tries to efficiently pack them into discrete lanes. This layout takes an array of data with start and end points and creates the data necessary to draw the data as bands on a timeline.
        </p>
      );
      break;
    case WORLDMAP:
      return (
        <p>
          You can use a Map Chart to compare values and show categories across geographical regions. Use it when you have geographical regions in your data, like countries/regions, states, counties or postal codes.
        </p>
      );
    default:
      return (
        <p>No chart description.</p>
      );
  }
};

export default getChartDescription;
