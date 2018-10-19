import colors from '../skins/colors.js';

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

export const getRandomColor = () => colors[getRandomInt(0, colors.length - 1)];

export const getUniqueProps = (data, property) => {
  let props = [];
  data.forEach((element) => {
    if (!props.includes(element[property])) {
      props.push(element[property]);
    }
  });
  return props;
}
