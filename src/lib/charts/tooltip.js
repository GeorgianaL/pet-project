import * as d3 from 'd3';

export const createTooltipNode = (className) => {
  d3.select('body')
    .append('div')
    .attr('class', `${className}__tooltip`);
};

export const deleteTooltip = (className) => {
  d3.select(`.${className}__tooltip`).remove();
};
