import React from 'react';

const LegendItem = (props) => (
  <div className="legend__item">
    {
      Object.keys(props.data).includes('color') ? (
        <svg className="legend__item--circle">
          <circle cx="10" cy="10" r="5" fill={props.data.color} />
        </svg>
      ) : (
        <img
          className="legend__item--img"
          alt={props.data.label}
          src={props.data.icon}
        />
      )
    }
    <p>{props.data.label}</p>
  </div>
);

export default LegendItem;
