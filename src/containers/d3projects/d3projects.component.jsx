import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartBoxContainer from '../chart-box-container';
import { getUsersByGenderAndBirth } from '../../model/selectors/genders.selectors';
import { TIMELINE } from '../../lib/charts/chartTypes';

class D3Projects extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>D3 Projects</h1>
        <ChartBoxContainer
          boxType="row"
          chart={TIMELINE}
          data={this.props.timelineData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  'timelineData': getUsersByGenderAndBirth(state),
});


export default connect(mapStateToProps)(D3Projects);
