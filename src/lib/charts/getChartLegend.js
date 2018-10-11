import {
  TIMELINE,
  WORLDMAP,
} from './chartTypes.js';

const getChartLegend = (type) => {
  switch (type) {
    case TIMELINE:
    case WORLDMAP:
      return [{
          category: 'female',
          color: '#c700ff',
          label: 'Female',
        }, {
          category: 'male',
          color: '#54E0C1',
          label: 'Male',
        }
      ]
    default:
      return [];
  }
};

export default getChartLegend;
