import * as d3 from 'd3';

import { timeFormat } from '../index';

const scaleTime = (width, startDate, endDate) => d3.scaleTime()
  .range([0, width])
  .domain([new Date(startDate), new Date(endDate)]);

const scaleLinear = (height, min, max) => d3.scaleLinear()
  .range([height, 0])
  .domain([min, max]);

export const getX = (svg, className, config, startDate, endDate) => {
  const width = config.svgWidth - config.marginLeft;

  const x = scaleTime(width, startDate, endDate);

  svg.select(`.${className}__xAxis`)
    .attr('transform', `translate(${config.marginLeft}, 0)`)
    .call(d3.axisTop(x)
      .ticks(7)
      .tickFormat(d3.timeFormat(timeFormat(startDate, endDate))));

  d3.selectAll('.xAxis > g')
    .attr('class', 'tick xAxis__tick');
  return x;
};

export const getY = (svg, className, config) => {
  const height = config.svgHeight - config.marginTop - config.marginBottom;
  const min = 0;
  const max = 40;

  const y = scaleLinear(height, min, max);

  svg.select(`.${className}__yAxis`)
    .call(d3.axisRight(y));
  d3.selectAll('.yAxis > g')
    .attr('class', 'tick yAxis__tick');
  return y;
};
