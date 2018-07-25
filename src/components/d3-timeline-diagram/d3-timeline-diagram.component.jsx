import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as moment from 'moment';

import { MALE, FEMALE } from '../../model/selectors/constants';
import { getX, getY } from '../../lib/d3util';

import './d3-timeline-diagram.scss';

const getMiddleMonthDay = (month) => moment().day(15).year('1990').format('X');

/**
 * Iterate through data object and create new array of objects like
 * {'date': data value, 'value': label's value}
 * @param {Object} data
 * @param {String} label it should be one of: MALE or FEMALE
 * @return {Array} of objects date-value type
 */
const formatData = (data, label) => Object.keys(data)
  .map(value => ({ 'date': getMiddleMonthDay(value), 'value': data[value][label.toUpperCase()].length }));

const deleteSvg = () => {
  d3.selectAll('.timeline_diagram > g').remove();
};

export class TimelineDiagram extends PureComponent {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.renderD3 = this.renderD3.bind(this);
    this.getSvgNode = this.getSvgNode.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.drawPoints = this.drawPoints.bind(this);
  }

  componentDidMount() {
    deleteSvg();
    this.renderD3();
  }

  componentDidUpdate() {
    deleteSvg();
    this.renderD3();
  }

  /**
  * Attach 'g' tag to svg reference
  */
  getSvgNode() {
    const { config } = this.props;
    const node = this.svgNode;

    return d3.select(node)
      .attr('class', 'timeline_diagram')
      .append('g')
      .attr('transform', `translate(${config.marginLeft}, ${config.marginTop})`)
      .attr('class', 'diagram__group');
  }

  /**
 * Attach 'g' tag which contains x axis, scaled by a start time and an
 * end time
 * @param {Object} svg
 * @param {Object} data
 * @param {function} x = d3 scale function
 * @param {function} y = d3 scale function
 */
  drawLine(svg, data, x, y) {
    const { config } = this.props;
    const height = config.svgHeight
      - config.marginTop
      - config.marginBottom;

    const lineData = formatData(data, MALE);
    const secondLineData = formatData(data, FEMALE);

    const d3Line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const d3Area = d3.area()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.value));

      const firstLineGroup = svg.append('g')
        .attr('class', 'male group');
      firstLineGroup.append('path')
        .data([lineData])
        .attr('class', 'line male')
        .attr('d', d3Line);
      firstLineGroup.append('path')
        .data([lineData])
        .attr('class', 'area male')
        .attr('d', d3Area)
        .style('fill', 'url(#male)');

      const secondlineGroup = svg.append('g')
        .attr('class', 'female group');
      secondlineGroup.append('path')
        .data([secondLineData])
        .attr('class', 'line female')
        .attr('d', d3Line);
      secondlineGroup.append('path')
        .data([secondLineData])
        .attr('class', 'area female')
        .attr('d', d3Area)
        .style('fill', 'url(#female)');

      this.drawPoints(svg, lineData, 'male');
      this.drawPoints(svg, secondLineData, 'female');
  }

  /**
* For each data object, append a d3 circle on the graph, according to
* it's x and y coordinates
* @param {Object} svg
* @param {Array} data
* @param {String} label
*/
 drawPoints(svg, data, label) {
   const points = svg.append('g')
     .attr('class', `points ${label}_points`);
   points.selectAll('.pathPoint')
     .data(data)
     .enter().append('circle')
     .attr('class', `pathPoint ${label}`)
     .attr('r', 5)
     .attr('cx', d => d.x)
     .attr('cy', d => d.y);
 }

  renderD3() {
    const { data, config } = this.props;

    const startDate = moment('01/01/1990', 'MM/DD/YYYY');
    const endDate = moment('12/31/1990', 'MM/DD/YYYY');

    console.log(data);
    const svg = this.getSvgNode();
    const x = getX(svg, config, startDate, endDate);
    const y = getY(svg, config);

    this.drawLine(svg, data, x, y);

    // addDashedLineDelimiters(svg, height, x)[0];
  }

   render() {
     const { config } = this.props;
     return (
       <svg
         ref={node => this.svgNode = node}
         width={config.svgWidth}
         height={config.svgHeight - config.marginLeft}
        >
          <defs>
            <linearGradient id="male" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="40%" style={{ 'stopColor': '#fffa00', 'stopOpacity': 1 }} />
              <stop offset="100%" style={{ 'stopColor': '#fffa00', 'stopOpacity': 0.3 }} />
            </linearGradient>
            <linearGradient id="female" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="40%" style={{ 'stopColor': '#ff0000', 'stopOpacity': 1 }} />
              <stop offset="100%" style={{ 'stopColor': '#ff0000', 'stopOpacity': 0.3 }} />
            </linearGradient>
          </defs>
       </svg>
     );
   }
}

export default TimelineDiagram;
