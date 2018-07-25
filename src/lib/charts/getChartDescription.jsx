import React from 'react';

import {
  TIMELINE,
  CHORD,
} from './chartTypes.js';

const getChartDescription = (type, config) => {
  switch (type) {
    case TIMELINE:
      return (
        <p>
          Timelines come in all shapes and sizes. One of the most common and popular is the kind that represents the duration of events as bands and tries to efficiently pack them into discrete lanes (sometimes called a swimlane chart). This layout takes an array of data with start and end points and creates the data necessary to draw the data as bands on a timeline.
        </p>
      );
      break;
    default:
      return (
        <p>No chart description.</p>
      );
  }
};

export default getChartDescription;
