import React from 'react';

import {
  TIMELINE,
  CHORD,
} from './chartTypes.js';

const getChartData = (type) => {
  switch (type) {
    case TIMELINE:
      return <TimelineDiagram config={config} />;
      break;
    default:
      return getUsers;
};

export default getChartData;
