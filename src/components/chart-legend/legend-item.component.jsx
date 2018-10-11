import React from 'react';

const LegendItem = (props) => (
  <div className="legend__item">
    <svg width="20" height="20">
      <circle cx="10" cy="10" r="5" fill={props.data.color} />
    </svg>
    {props.data.label}
  </div>
);

export default LegendItem;
