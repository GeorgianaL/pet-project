import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as topojson from 'topojson';

import { isEmpty } from 'lodash';

import mapData from './world-topo.json';
import { MALE, FEMALE } from '../../model/selectors/constants';
import { createTooltipNode, deleteTooltip } from '../../lib/charts';

import './d3-world-map.scss';

const decor = {
  'colors': {
    'male': '#54E0C1',
    'female': '#c700ff',
  }
};

const lngLatToArc = (d, svgWidth, svgHeight) => {
  const projection = d3.geoMercator()
    .translate([svgWidth / 2, svgHeight / 1.75])
    .scale(svgWidth / 2 / Math.PI);
  const sourceLngLat = d.source;
  const targetLngLat = d.target;

  if (targetLngLat && sourceLngLat) {
    const sourceXY = projection(sourceLngLat);
    const targetXY = projection(targetLngLat);

    const sourceX = sourceXY[0];
    const sourceY = sourceXY[1];

    const targetX = targetXY[0];
    const targetY = targetXY[1];

    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const dr = Math.sqrt((dx * dx) + (dy * dy)) * 2;

    const westOfSource = (targetX - sourceX) < 0;

    const dependencies = [targetX, targetY, sourceX, sourceY,  dx, dy, dr];
    let path = true;
    dependencies.forEach((dep) => {
      if (isNaN(dep)) {
        path = false;
      }
    });

    if (path) {
      if (westOfSource) {
        return `M${targetX},${targetY}A${dr},${dr} 0 0,1 ${sourceX},${sourceY}`;
      }
      return `M${sourceX},${sourceY}A${dr},${dr} 0 0,1 ${targetX},${targetY}`;
    }
  }
  return 'M0,0,l0,0z';
};

export class WorldMap extends Component {
  constructor(props) {
    super(props);

    this.svgNode = null;
    this.renderD3 = this.renderD3.bind(this);
  }

  componentDidMount() {
    if (!isEmpty(mapData)) {
      this.renderD3(mapData);
      createTooltipNode(this.props.className);
    }
  }

  componentDidUpdate() {
    if (!isEmpty(mapData)) {
      this.renderD3(mapData);
    }
  }

  componentWillUnmount() {
    deleteTooltip(this.props.className);
  }

  renderD3(world) {
    const { data, config, className } = this.props;
    const node = this.svgNode;

    const nodes = data.sources;
    const relations = data.connections;

    const projection = d3.geoMercator()
      .translate([config.svgWidth / 2, config.svgHeight / 1.75])
      .scale(config.svgWidth / 2 / Math.PI);

    const path = d3.geoPath()
      .projection(projection);

    const svg = d3.select(node);
    const contours = svg.select('.contours');
    const points = svg.select('.points');
    // const connections = svg.select('.connections');

    // zoom in and out
    const move = () => {
      const transform = d3.event.transform;
      const scale = transform.k;
      transform.x = Math.min(0, Math.max(config.svgWidth * (1 - scale), transform.x));
      transform.y = Math.min(
        110 * scale,
        Math.max((config.svgHeight * (1 - scale)) - (10 * scale), transform.y),
      );

      contours
        .style('stroke-width', 1 / scale)
        .attr('transform', transform);
      points
        .attr('transform', transform);
      // connections
      //   .attr('transform', transform);
    };
    const zoom = d3.zoom()
      .scaleExtent([1, 30])
      .on('zoom', move);

    svg.call(zoom);

    svg.selectAll('.land').remove();
    contours.append('path')
      .datum(topojson.feature(world, world.objects.countries))
      .attr('class', 'land')
      .attr('d', path);
    contours.exit().remove();

    const tooltip = d3.select(`.${className}__tooltip`);

    // add points for all nodes
    const pointsGroupData = points.selectAll('circle')
      .data(nodes);

    pointsGroupData.enter()
      .append('circle')
      .attr('transform', d => `translate(${projection([d.longitude, d.latitude])})`)
      .attr('r', 2)
      .style('fill', d => d.gender === MALE ? decor.colors.male : decor.colors.female);
    pointsGroupData.on('mouseover', (d) => {
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
        tooltip.html(`<div class="tooltip">
          <p>${d.country} - ${d.city}</p>
        </div>`);
        tooltip
          .style('top', `${d3.event.pageY}px`)
          .style('left', `${d3.event.pageX}px`);
        });
    pointsGroupData.on("mouseout", (d) => {
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);
        });

    pointsGroupData
      .attr('transform', d => `translate(${projection([d.longitude, d.latitude])})`)
      .style('fill', d => d.gender === MALE ? decor.colors.male : decor.colors.female);

    pointsGroupData.exit().remove();

    // // add paths for connections
    // const connectionsGroupData = connections.selectAll('path')
    //   .data(relations);
    //
    // connectionsGroupData.enter()
    //   .append('path')
    //   .attr('d', d => lngLatToArc(d, config.svgWidth, config.svgHeight))
    //   .attr('class', 'connection');
    // connectionsGroupData
    //   .attr('d', d => lngLatToArc(d, config.svgWidth, config.svgHeight));
    // connectionsGroupData.exit().remove();
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
              <g className="contours" />
              <g className="points" />
              // <g className="connections" />
            </g>
        </svg>
      </div>
     );
   }
}

WorldMap.displayName = 'WorldMap';
WorldMap.propTypes = {
  'config': PropTypes.object,
  'data': PropTypes.object,
  'className': PropTypes.string,
};

WorldMap.defaultProps = {
  'config': {},
  'data': {},
  'className': 'd3-world-map',
};

export default WorldMap;
