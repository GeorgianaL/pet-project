import React from 'react';

import LegendItem from './legend-item.component.jsx';
import './legend.scss';

const Legend = (props) => (
  <div className="legend">
    <div className="legend__list">
      {
        props.data.map((item, index) => <div key={`${props.chart}-${index}`}><LegendItem data={item} /></div>)
      }
    </div>
  </div>
);

export default Legend;
