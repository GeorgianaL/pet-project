import React from 'react';
import ProgressDonutChart from './progress-donut-chart.component.jsx';

const ProgressChartList = (props) => {
  const maxim = props.data.reduce((acc, item) => acc + item.percent, 0);
  return (
    <div className="progresschart__list">
      {
        props.data.map((item) => (
          <ProgressDonutChart
            key={`${item.credit_card_type}_progress-chart`}
            amount={item.percent}
            maxim={maxim}
          />
        ))
      }
    </div>
  );
}

export default ProgressChartList;
