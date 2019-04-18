import React from 'react';
import { isEqual } from 'lodash';

import LegendItem from './legend-item.component.jsx';
import './legend.scss';

class Legend extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data) ||
    !isEqual(this.props.chart, nextProps.chart);
  }
  render() {
    const { chart, data } = this.props;
    return (
      <div className="legend">
        <div className={`legend__list legend__list--${chart}`}>
          {
            data.map((item, index) => (
                <div key={`${chart}-${index}`}>
                  <LegendItem data={item} />
                </div>
              ))
          }
        </div>
      </div>
    )
  }
}

export default Legend;
