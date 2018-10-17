import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { isEmpty } from 'lodash';

import data from '../../model/expertise';

import  { getRandomColor } from '../../lib';

export class ForceLayout extends Component {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.renderD3 = this.renderD3.bind(this);
  }

  componentDidMount() {
    this.renderD3();
  }

  componentDidUpdate() {
    this.renderD3();
  }

  renderD3() {
    const { config } = this.props;
    const node = this.svgNode;
    const svg = d3.select(node);

    const center = {
      'x': config.svgWidth / 2,
      'y': config.svgHeight / 1.5,
    };

    const strength = 0.01;
    const format = d3.format(',d');

    const pack = d3.pack()
			.size([config.svgWidth, config.svgHeight])
			.padding(1.5);
    const root = d3.hierarchy({ children: data })
  			.sum(d => d.value);
    //
  	const nodes = pack(root).leaves().map(node => {
  			// console.log('node:', node.x, (node.x - center.x) * 2);
  			const data = node.data;
  			return {
  				x: center.x + (node.x - center.x) * 3, // magnify start position to have transition to center movement
  				y: center.y + (node.y - center.y) * 3,
  				r: 0, // for tweening
  				radius: node.r, //original radius
  				id: data.cat + '.' + (data.name.replace(/\s/g, '-')),
  				cat: data.cat,
  				name: data.name,
  				value: data.value,
  				icon: data.icon,
  				desc: data.desc,
  			}
  		});

    svg.style('background-color', '#eee');

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

    const imagesGroup = svg.select('.images');
    const imagesGroupData = nodesGroup.selectAll('image')
      .data(data);
    imagesGroupData
      .enter()
      .append('image')
      .attr('fill', d => d.color)
      .attr('xlink:href', d => d.icon)
      .attr('width', d => d.value)
      .attr('height', d => d.value);

		const forceCollide = d3.forceCollide(d => d.r + 1);
    // use the force
    const simulation = d3.forceSimulation()
    	.force('charge', d3.forceManyBody())
    	.force('collide', forceCollide)
    	.force('x', d3.forceX(center.x).strength(strength))
    	.force('y', d3.forceY(center.y).strength(strength));

    const ticked = () => {
      nodesGroupData
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .select('circle')
          .attr('r', d => d.value);
      imagesGroupData.attr('transform', d =>
        `translate(${+d.x - (d.value / 2)},
        ${+d.y - (d.value / 2)})`);
    };

    simulation
      .nodes(data);
    simulation
      .on('tick', ticked);
  }

  render() {
    const { config, className } = this.props;
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
