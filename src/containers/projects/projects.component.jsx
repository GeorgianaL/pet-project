import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChartBoxContainer from '../chart-box-container';
import { getUsersByGenderAndBirth } from '../../model/selectors/genders.selectors';
import { getUsersLocation } from '../../model/selectors/location.selectors';
import { getUsersByCreditCardType, getCreditCardTypesPercentages } from '../../model/selectors/credit-card-type.selectors';

import { TIMELINE, WORLDMAP, CHORD, PROGRESS, SCHEDULE } from '../../lib/charts/chartTypes';
import { ROW, COLUMN } from '../../lib/charts/boxTypes';

import { scheduleData } from '../../model/scheduleData';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'boxType': ROW,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
     window.addEventListener('resize', this.updateDimensions);
   }

   componentDidMount() {
     this.updateDimensions();
   }
   componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      const { boxType } = this.state;
      let currentBoxType;

      if (window.innerWidth <= 800) {
        currentBoxType = COLUMN;
      } else {
        currentBoxType = ROW;
      }

      if (currentBoxType !== boxType) {
        this.setState({
          'boxType': currentBoxType,
        });
      }
    }

  render() {
    const { boxType } = this.state;

    return (
      <div className="projects">
        <ChartBoxContainer
          boxType={boxType}
          chart={TIMELINE}
          data={this.props.timelineData}
        />
        <ChartBoxContainer
          boxType={boxType}
          chart={WORLDMAP}
          data={this.props.worldMapData}
        />
        <ChartBoxContainer
          boxType={boxType}
          chart={CHORD}
          data={{ 'entities': this.props.chordData }}
        />
        <ChartBoxContainer
          boxType={boxType}
          chart={PROGRESS}
          data={this.props.progressData}
        />
        <ChartBoxContainer
          boxType={boxType}
          chart={SCHEDULE}
          data={scheduleData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  'timelineData': getUsersByGenderAndBirth(state),
  'worldMapData': getUsersLocation(state),
  'chordData': getUsersByCreditCardType(state),
  'progressData': getCreditCardTypesPercentages(state),
});


export default connect(mapStateToProps)(Projects);
