import {
  TIMELINE,
  WORLDMAP,
  CHORD,
  PROGRESS,
  SCHEDULE
} from './chartTypes.js';

import { creditCardIcon } from './';

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
    case PROGRESS:
      return data.reduce((acc, type) => [...acc, {
          'category': type.credit_card_type,
          'icon': creditCardIcon[type.credit_card_type],
          'label': `${type.percent}%`,
        }], []);
    case SCHEDULE:
      return [
        {
          label: 'Active Jobs',
          category: 'active',
          color: '#5EA214',
        }, {
          label: 'Pending Jobs',
          category: 'pending',
          color: '#FB5C41',
        }, {
          label: 'Opportunities',
          category: 'opportunity',
          color: '#265CBF',
        }, {
          label: 'Unplanned',
          category: 'unplanned',
          color: '#9B9B9B',
        }
      ]
    default:
      return [];
  }
};

export default getChartLegend;
