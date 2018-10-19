import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { isEmpty } from 'lodash';

import  { getRandomColor } from '../../lib';

export class ForceLayout extends Component {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.tooltipNode = null;
    this.renderD3 = this.renderD3.bind(this);
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    const { data, config } = this.props;
    const node = this.svgNode;
    const tooltip = d3.select(this.tooltipNode);
    tooltip
      .style('position', 'absolute')
      .style('opacity', 0);

    const svg = d3.select(node);

    const center = {
      'x': config.svgWidth / 2,
      'y': config.svgHeight / 1.5,
    };

    const strength = 0.01;
    const format = d3.format(',d');

    svg
      .style('position', 'relative')
      .style('background-color', '#eee');

    // create and upadte background circles
		const nodesGroup = svg.select('.circles');
    const nodesGroupData = nodesGroup.selectAll('circle')
			.data(data);
		nodesGroupData
      .enter()
      .append('circle')
			.attr('fill', d => d.color)
      .attr("stroke-width", 1)
      .attr("stroke", "white")
      .attr('r', d => d.value);
    nodesGroupData
      .attr('fill', d => d.color)
      .attr('r', d => d.value);
    nodesGroupData.exit().remove();

    // create and update icons
    const imagesGroup = svg.select('.images');
    const imagesGroupData = nodesGroup.selectAll('image')
      .data(data);
    imagesGroupData
      .enter()
      .append('image')
      .attr('fill', d => d.color)
      .attr('xlink:href', d => d.icon)
      .attr('width', d => d.value + d.value / 2)
      .attr('height', d => d.value + d.value / 2);
    imagesGroupData
      .attr('fill', d => d.color)
      .attr('xlink:href', d => d.icon)
      .attr('width', d => d.value + d.value / 2)
      .attr('height', d => d.value + d.value / 2);
    // imagesGroupData.on('mouseover', (d) => {
    //   tooltip.transition()
    //       .duration(200)
    //       .style("opacity", .9);
    //   tooltip.html(d.name + "<br/>" + d.desc)
    //     .attr('top', d3.event.pageY)
    //     .attr('left', d3.event.pageX);
    //   });
    // imagesGroupData.on("mouseout", (d) => {
    //   tooltip.transition()
    //       .duration(500)
    //       .style("opacity", 0);
    // });
    imagesGroupData.exit().remove();

		const forceCollide = d3.forceCollide(d => d.r + 1);
    // use the force to create the graph
    const simulation = d3.forceSimulation()
    	.force('charge', d3.forceManyBody())
    	.force('collide', forceCollide)
    	.force('x', d3.forceX(center.x).strength(strength))
    	.force('y', d3.forceY(center.y).strength(strength));

  // add x and y coordinates for circles and icons
    const ticked = () => {
      nodesGroupData
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .select('circle')
          .attr('r', d => d.value);
      imagesGroupData.attr('transform', d =>
        `translate(${+d.x - ((d.value + d.value / 2) / 2)},
        ${+d.y - ((d.value + d.value / 2) / 2)})`);
    };

    simulation
      .nodes(data);
    simulation
      .on('tick', ticked);
  }

  render() {
    const { data, config, className } = this.props;
    console.log(data);
    return (
      <div className={className}>
       <svg
         ref={node => this.svgNode = node}
         width={config.svgWidth}
         height={config.svgHeight}
         >
          <g className="circles" />
          <g className="images" />
       </svg>
       <div
         className={`${className}__tooltip d3tooltip`}
         ref={node => this.tooltipNode = node}
        />
     </div>
    );
  }
}

ForceLayout.displayName = 'ForceLayout';
ForceLayout.propTypes = {
  'className': PropTypes.string,
  'config': PropTypes.object,
};
ForceLayout.defaultProps = {
  'className': 'forcelayout',
  'config': {
    'svgWidth': 500,
    'svgHeight': 400,
    'marginLeft': 20,
  },
};

export default ForceLayout;