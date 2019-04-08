import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as moment from 'moment';

import { getBottomX, getTransparentY } from '../../lib/d3util';

import './d3-timeline-schedule.scss';

const deleteSvg = (className) => {
  d3.selectAll(`.${className}__xAxis > *`).remove();
  d3.selectAll(`.${className}__yAxis > *`).remove();
};

const addDashedLine = (group, height, position) => {
  group.append('line')
    .attr('x1', position)
    .attr('y1', 0)
    .attr('x2', position)
    .attr('y2', height);
};

export class TimelineSchedule extends Component {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.renderD3 = this.renderD3.bind(this);
    this.createBars = this.createBars.bind(this);
  }

  componentDidMount() {
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

  createBars(svg, x, y) {
    const { data, config, className } = this.props;
    const mini = svg.append("g")
			.attr("transform", "translate(0, 20)")
			.attr("width", config.svgWidth)
			.attr("height", config.svgHeight)
			.attr("class", `${className}__chart`);

    mini.append("g").selectAll("miniItems")
			.data(data)
			.enter().append("rect")
			.attr("x", d => x(d.startDate))
			.attr("y", d => y(d.company))
			.attr("width", d => d.endDate.diff(d.startDate, 'days'))
      .attr("fill", d => {
        switch (d.status) {
          case "active":
            return "#5EA214";
          case "pending":
            return "#FB5C41";
          case "opportunity":
            return "#265CBF";
          default:
            return "#9B9B9B";
        }
      })
      .attr("rx", 10)         // set the x corner curve radius
      .attr("ry", 10);        // set the y corner curve radius

    mini.append("g").selectAll("miniItems")
      .data(data)
      .enter().append("text")
      .text(d => `${d.jobTitle} @ ${d.company}`)
      .attr("x", d => x(d.startDate) + 10)
      .attr("y", d => y(d.company) + 15);
  }

  addDashedLineDelimiters(svg, height, scale) {
     const { className } = this.props;

     let tickWidth = 0;

     d3.selectAll(`.${className}__xAxis > g > text`)
       .nodes()
       .map((t) => {
         if (t instanceof SVGElement) {
           tickWidth = t.getBoundingClientRect().width;
         }
         return t.innerHTML;
       });

     let defaultTicksPosition = [];

     d3.selectAll(`.${className}__xAxis > g > text`)
       .each(d => defaultTicksPosition = [...defaultTicksPosition, scale(d)]);

     let delimiters = [];

     if (defaultTicksPosition.length > 1) {
       defaultTicksPosition.forEach((tick, i) => {
         if (defaultTicksPosition[i] >= 0 && defaultTicksPosition[i + 1]) {
           delimiters = [
             ...delimiters,
             defaultTicksPosition[i]
           ];
         }
       });
     }

     const dashedLines = svg.append('g')
       .attr('class', `${className}__dashedLineGroup`);

     delimiters.forEach((position) => {
       addDashedLine(dashedLines, height - 45, position);
     });
   }

  renderD3() {
    const { data, config, className } = this.props;
    const height = config.svgHeight - config.marginTop - config.marginBottom;

    const startDate = moment('04/04/2019', 'MM/DD/YYYY');
    const endDate = moment('12/31/2021', 'MM/DD/YYYY');

    const svg = this.getSvgNode();

    const taskTypes = ["Company X", "Company Y", "Company Z"].reverse();

// X axis
   const x = d3.scaleTime()
    .domain([ startDate, endDate ])
    .range([ 0, config.svgWidth ])
    .clamp(true);

   const xAxis = d3.axisBottom()
     .scale(x)
     .tickFormat(date => d3.timeYear(date) < date ? d3.timeFormat('%b')(date) : d3.timeFormat('%Y')(date))
     .tickSize(8)
     .tickPadding(8);
   svg.select(`.${className}__xAxis`)
       .attr('transform', 'translate(0, 180)')
       .call(xAxis);
   svg.selectAll(`.${className}__xAxis > g`)
      .append('circle')
      .attr('r', 5);


// Y axis
   const y = d3.scaleBand()
    .domain(taskTypes)
    .range([ 0, height - config.marginTop - config.marginBottom ])
    .padding(0.1);
   const yAxis = d3.axisLeft().scale(y).tickSize(0);
   // svg.select(`.${className}__yAxis`)
   //   .call(yAxis);

    this.addDashedLineDelimiters(svg, height, x);
    this.createBars(svg, x, y);
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
           </g>
       </svg>
     </div>
    );
  }
}

TimelineSchedule.displayName = 'TimelineSchedule';
TimelineSchedule.propTypes = {
  'config': PropTypes.object,
  'data': PropTypes.array,
  'className': PropTypes.string,
};

TimelineSchedule.defaultProps = {
  'config': {},
  'data': [],
  'className': 'd3-timeline-schedule',
};

export default TimelineSchedule;
