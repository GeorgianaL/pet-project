import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { isEqual } from 'lodash';

import { creditCardIcon } from '../../lib/charts';

import './chord.style.scss';

const d3ItemsConfig = {
  'flowBeta': 0.2, // 0 - 1: how much the flow should draw close the center
  'radiansFlipLabel': Math.PI / 1.6, // below x-axis (-90 rotation) or grater than PI/2
  'iconWidth': 35,
  'iconHeight': 30,
  'iconCloseWidth': 25,
  'iconCloseHeight': 16,
  'mIconSize': 20,
  'iconsDistance': 30,
  'closeIconDistance': 20,
  'chordRadius': 80,
  'chordStroke': 10,
};

const pie = d3.pie()
  .startAngle(0)
  .endAngle((Math.PI / 2) + (2 * Math.PI))
  .value(d => d.male + d.female)
  .sort(null);

export class Chord extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      'openPipelines': [],
    };

    this.svgNode = null;
    this.hoverTimeout = null;
    this.injectD3 = this.injectD3.bind(this);
  }

  componentDidMount() {
    this.injectD3();
  }

  componentDidUpdate() {
    this.injectD3();
  }

  setArcsDistance(pieData) {
    const { openPipelines } = this.state;
    const { entities } = this.props;

    let openPie = pieData;
    if (pieData.length > 1) {
      openPie = pieData.map((arc) => {
        if (openPipelines.includes(arc.data[2])) {
          const initialCluster = entities.filter(entity => entity[2] === arc.data[2])[0];
          const firstClusterEntity = initialCluster[0][0];
          const lastClusterEntity = initialCluster[0][initialCluster[0].length - 1];
          if (initialCluster[0].length === 1) {
            // one entity/cluster
            return {
              ...arc,
              'endAngle': arc.endAngle - 0.035,
              'startAngle': arc.startAngle + 0.035,
            };
            // 2 entities/cluster
          } else if (initialCluster[0].length === 2) {
            // first entity from 2entities/cluster
            if (arc.data[0][0] === firstClusterEntity) {
              return {
                ...arc,
                'startAngle': arc.startAngle + 0.035,
                'endAndle': arc.endAndle - 0.015,
              };
            }
            // second entity from 2entities/cluster
            return {
              ...arc,
              'startAngle': arc.startAngle + 0.015,
              'endAngle': arc.endAngle - 0.035,
            };
          }
          // more then 2 items/arc
          if (arc.data[0][0] === firstClusterEntity) {
            return {
              ...arc,
              'startAngle': arc.startAngle + 0.035,
              'endAngle': arc.endAngle - 0.007,
            };
          } else if (arc.data[0][0] === lastClusterEntity) {
            return {
              ...arc,
              'startAngle': arc.startAngle + 0.007,
              'endAngle': arc.endAngle - 0.035,
            };
          }
          return {
            ...arc,
            'endAngle': arc.endAngle - 0.007,
            'startAngle': arc.startAngle + 0.007,
          };
        }
        // All clusters closed
        return {
          ...arc,
          'endAngle': arc.endAngle - 0.035,
          'startAngle': arc.startAngle + 0.035,
        };
      });
    }
    return openPie;
  }

  arc() {
    return d3.arc()
      .innerRadius(d3ItemsConfig.chordRadius)
      .outerRadius(d3ItemsConfig.chordRadius + (d3ItemsConfig.chordStroke * 2));
  }

  getCentroid(d) {
    return this.arc().centroid(d);
  }

  getIconPosition(d, hasMultipleEntities, isCloseIcon = false) {
    let x; let y;

    if (hasMultipleEntities) {
      const data = {
        'startAngle': d[0].startAngle,
        'endAngle': d[d.length - 1].endAngle,
      };

      if (isCloseIcon) {
        x = this.getCentroid(data)[0] - (d3ItemsConfig.iconCloseWidth / 2);
        y = this.getCentroid(data)[1] - (d3ItemsConfig.iconCloseHeight / 2);
      } else {
        x = this.getCentroid(data)[0] - (d3ItemsConfig.iconWidth / 2);
        y = this.getCentroid(data)[1] - (d3ItemsConfig.iconHeight / 2);
      }
    } else {
      x = this.getCentroid(d)[0] - (d3ItemsConfig.iconWidth / 2);
      y = this.getCentroid(d)[1] - (d3ItemsConfig.iconHeight / 2);
    }

    const distance = Math.hypot(x, y);
    const iconClusterDistance = isCloseIcon
      ? distance + d3ItemsConfig.closeIconDistance
      : distance + d3ItemsConfig.iconsDistance;
    const r = iconClusterDistance / distance;
    return {
      'x': r * x,
      'y': r * y,
    };
  }

  addArcs(svg) {
    const { entities } = this.props.data;

    const pieData = pie(entities);

    const chordLayer = svg.select('.chord');
    const arcsGroupData = chordLayer.selectAll('.arcSlice')
      .data(pieData);

    const arcsCentroids = {};
    // ENTER
    arcsGroupData.enter()
      .append('path')
      .attr('class', 'arcSlice')
      .attr('d', this.arc());
    // UPDATE
    arcsGroupData
      .attr('class', (d) => {
        return 'arcSlice';
      })
      .attr('d', this.arc());
    // EXIT
    arcsGroupData.exit().remove();
  }

  addIcons(svg) {
    const { entities } = this.props.data;

    const pieData = pie(entities);

    const iconsLayer = svg.select('.icons');
    const iconsGroupData = iconsLayer.selectAll('.icon')
      .data(pieData);

    // ENTER
    iconsGroupData.enter()
      .append('svg:image')
      .attr('class', 'icon')
      .attr('width', d3ItemsConfig.iconWidth)
      .attr('height', d3ItemsConfig.iconHeight)
      .attr('xlink:href', d => creditCardIcon[d.data.credit_card_type])
      .attr('transform', d => `translate(${this.getIconPosition(d).x},${this.getIconPosition(d).y})`);

    // UPDATE
    iconsGroupData
      .attr('xlink:href', d => creditCardIcon[d.data.credit_card_type])
      .attr('transform', d => `translate(${this.getIconPosition(d).x},${this.getIconPosition(d).y})`);

    iconsGroupData.exit().remove();
  }

  injectD3() {
    const { config } = this.props;
    const node = this.svgNode;

    const svgTag = d3.select(node)
      .attr('class', 'chord__svg');
    const svgChord = svgTag.select('.chord__group');
    svgChord.attr(
      'transform',
      `translate(${config.svgWidth / 2}, ${config.svgHeight / 2})`,
    );

    const arcsCentroids = this.addArcs(svgChord);
    this.addIcons(svgChord);
    // this.addFlows(svgChord, arcsCentroids);
  }

  render() {
    const { config } = this.props;
    return (
      <div className="chord">
        <svg ref={node => this.svgNode = node} width={config.svgWidth} height={config.svgHeight}>
          <g className="chord__group">
            <g className="flows" />
            <g className="chord" />
            <g className="icons" />
          </g>
        </svg>
      </div>
    );
  }
}

Chord.displayName = 'Chord';
Chord.propTypes = {
  'config': PropTypes.object,
  'entities': PropTypes.array,
  'relations': PropTypes.array,
};
Chord.defaultProps = {
  'config': {},
  'entities': [],
  'relations': [],
};

export default Chord;
