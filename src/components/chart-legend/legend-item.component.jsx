import React from 'react';
import { isEqual } from 'lodash';

class LegendItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="legend__item">
        {
          Object.keys(data).includes('color') ? (
            <svg className="legend__item--circle">
              <circle cx="10" cy="10" r="5" fill={data.color} />
            </svg>
          ) : (
            <img
              className="legend__item--img"
              alt={data.label}
              src={data.icon}
            />
          )
        }
        <p>{data.label}</p>
      </div>
    );
  }
}

export default LegendItem;
