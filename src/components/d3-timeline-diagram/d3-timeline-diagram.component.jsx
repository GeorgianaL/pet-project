import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as moment from 'moment';

import { MALE, FEMALE, DATE } from '../../model/selectors/constants';
import { getX, getY } from '../../lib/d3util';

import './d3-timeline-diagram.scss';

const decor = {
  'colors': {
    'male': '#54E0C1',
    'female': '#c700ff',
  }
}

const deleteSvg = (className) => {
  d3.selectAll(`.${className}__xAxis > *`).remove();
  d3.selectAll(`.${className}__yAxis > *`).remove();
  d3.selectAll(`.${className}__lines > *`).remove();
  d3.selectAll(`.${className}__areas > *`).remove();
  d3.selectAll(`.${className}__points > *`).remove();
  d3.selectAll(`.${className}__dashedLineGroup`).remove();
};

export class TimelineDiagram extends PureComponent {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.renderD3 = this.renderD3.bind(this);
  }

  componentDidMount() {
    deleteSvg(this.props.className);
    this.renderD3();
  }

  componentDidUpdate() {
    deleteSvg(this.props.className);
    this.renderD3();
  }

  /**
  * Attach 'g' tag to svg reference
  */
  getSvgNode() {
    const { config, className } = this.props;
    const node = this.svgNode;

    return d3.select(node)
    .select(`.${className}__group`)
    .attr('transform', `translate(${config.marginLeft}, ${config.marginTop})`);
  }

  /**
 * Attach 'g' tag which contains x axis, scaled by a start time and an
 * end time
 * @param {Object} svg
 * @param {Object} data
 * @param {function} x = d3 scale function
 * @param {function} y = d3 scale function
 */
  drawLine(svg, x, y, key, data) {
    const { className } = this.props;

    const d3Line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d[key]));

    const lineGroup = svg.select(`.${className}__lines`);
    const lineGroupData = lineGroup.selectAll(`.${key} ${key}-line`)
        .data([data]);
    lineGroupData.enter()
      .append('path')
      .attr('class', `${key} ${key}-line`)
      .attr('d', d3Line)
      .attr('stroke', decor.colors[key]);
    lineGroupData
      .attr('d', d3Line(data))
      .attr('stroke', decor.colors[key]);
    lineGroupData.exit().remove();
  }

  drawArea(svg, x, y, key, data) {
    const { config, className } = this.props;
    const height = config.svgHeight
      - config.marginTop
      - config.marginBottom;

    const d3Area = d3.area()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d[key]));

    const areaGroup = svg.select(`.${className}__areas`);
    const areaGroupData = areaGroup.selectAll(`.${key}-area`)
        .data([data]);
    areaGroupData.enter()
      .append('path')
      .attr('class', `${key}-area`)
      .attr('d', d3Area)
      .style('fill', `url(#${key})`);
    areaGroupData
      .attr('d', d3Area(data))
      .style('fill', `url(#${key})`);
    areaGroupData.exit().remove();
  }

  /**
* For each data object, append a d3 circle on the graph, according to
* it's x and y coordinates
* @param {Object} svg
* @param {Array} data
* @param {String} label
*/
//  drawPoints(svg, x, y, key, data) {
//    const points = svg.append('g')
//      .attr('class', `points ${label}_points`);
//    points.selectAll('.pathPoint')
//      .data(data)
//      .enter().append('circle')
//      .attr('class', `pathPoint ${label}`)
//      .attr('r', 5)
//      .attr('cx', d => d.x)
//      .attr('cy', d => d.y);
//  }

  renderD3() {
    const { data, config, className } = this.props;

    const startDate = moment('01/01/1990', 'MM/DD/YYYY');
    const endDate = moment('12/31/1990', 'MM/DD/YYYY');

    const svg = this.getSvgNode();
    const x = getX(svg, className, config, startDate, endDate);
    const y = getY(svg, className, config);

    if (data.length > 0) {
      const yAxisLabels = Object.keys(data[0]).filter(label => label !== DATE);
      console.log(data);
      yAxisLabels.forEach((yAxisLabel) => {
        this.drawLine(svg, x, y, yAxisLabel, data);
        // this.drawArea(svg, x, y, yAxisLabel, data);
        // this.drawPoints(svg, x, y, yAxisLabel, data);
      });
    }

  }

   render() {
     const { config, className } = this.props;
     return (
       <div className={className}>
        <svg
          ref={node => this.svgNode = node}
          width={config.svgWidth}
          height={config.svgHeight - config.marginLeft}
          >
            <g className={`${className}__group`}>
              <g className={`${className}__xAxis`} />
              <g className={`${className}__yAxis`} />
              <g className={`${className}__lines`} />
              <g className={`${className}__areas`} />
              <g className={`${className}__points`} />
              <text className={`${className}__message`} />
            </g>
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
      </div>
     );
   }
}

TimelineDiagram.displayName = 'TimelineDiagram';
TimelineDiagram.propTypes = {
  'config': PropTypes.object,
  'data': PropTypes.array,
  'className': PropTypes.string,
};

TimelineDiagram.defaultProps = {
  'config': {},
  'data': [],
  'className': 'd3-timeline-graph',
};

export default TimelineDiagram;
