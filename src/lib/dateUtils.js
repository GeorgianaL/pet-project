export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/**
* Calculate difference of 2 date values
* If difference represents a day, return hour format, otherwise days format
* and add coordinates x and y
* @param {Object} startDate
* @param {Object} endDate
* @return {String}    distance < 1000 miliseconds * 60 seconds * 60 minutes * 24 houres * 2 days
*/
export const timeFormat = (startDate, endDate) => {
  const distance = (+new Date(endDate)) - (+new Date(startDate));
  return (distance < 1000 * 60 * 60 * 24 * 2) ? '%H:%M' : '%m-%d-%Y';
};
