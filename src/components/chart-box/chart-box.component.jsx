import React from 'react';

import './chart-box.scss';

/**
  ChartBox - stateless component which renders a box containing
  the title, the svg and the description for any Chart
  props {
    type: 'column'/ 'row'
  }
*/

const ChartBox = props => (
  <div className={`chart-box chart-box--${props.type}`}>
    <div className="chart-box--content">
      <svg width="700" height="200"></svg>
    </div>
    <div className="chart-box__main">
      <div className="chart-box--title">
        <p>Chart name</p>
      </div>
      <div className="chart-box--description">
        <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
      </div>
    </div>
  </div>
);

export default ChartBox;
