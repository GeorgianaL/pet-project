import {
  TIMELINE,
  WORLDMAP,
  CHORD,
} from './chartTypes.js';

import { creditCardIcon } from './';
import { capitalize } from '../';

const getChartLegend = (type, data) => {
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
      ];
    case CHORD:
      const total = data.entities.reduce((acc, type) => acc + type.male + type.female, 0);
      return data.entities.reduce((acc, type) => [...acc, {
          'category': type.credit_card_type,
          'icon': creditCardIcon[type.credit_card_type],
          'label': `${(type.male * 100) / total}% Male ${(type.female * 100) / total}% Female`,
        }], []);
    default:
      return [];
  }
};

export default getChartLegend;
