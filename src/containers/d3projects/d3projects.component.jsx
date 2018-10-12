import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartBoxContainer from '../chart-box-container';
import { getUsersByGenderAndBirth } from '../../model/selectors/genders.selectors';
import { getUsersLocation } from '../../model/selectors/location.selectors';
import { getUsersByCreditCardType } from '../../model/selectors/credit-card-type.selectors';

import { TIMELINE, WORLDMAP, CHORD } from '../../lib/charts/chartTypes';

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
        <ChartBoxContainer
          boxType="row"
          chart={WORLDMAP}
          data={this.props.worldMapData}
        />
        <ChartBoxContainer
          boxType="row"
          chart={CHORD}
          data={{ 'entities': this.props.chordData }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  'timelineData': getUsersByGenderAndBirth(state),
  'worldMapData': getUsersLocation(state),
  'chordData': getUsersByCreditCardType(state),
});


export default connect(mapStateToProps)(D3Projects);
