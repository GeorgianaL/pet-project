export const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const colors = [
  '#328cc3',
  '#54E0C1',
  'rgba(95, 227, 194, 0.25)',
  '#06BC9B',
  '#4aba79',
  '#6d9a3d',
  '#c700ff',
  '#791c98',
  '#a40cb4',
  '#ff5d3a',
  '#ff9d00',
  '#ff4600',
  '#C44563',
];

export const getRandomColor = () => colors[getRandomInt(0, colors.length - 1)];
