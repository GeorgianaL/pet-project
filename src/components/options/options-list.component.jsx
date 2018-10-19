import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Option from './option.component.jsx';

export class OptionsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'selection': '',
    };

    this.selectOption = this.selectOption.bind(this);
  }

  componentDidMount() {
    const { type } = this.props;
    if (type === "checkbox") {
      this.setState({
        'selection': [],
      });
    }
  }

  selectOption(option) {
    const { type } = this.props;
    const { selection } = this.state;
    if (type === "checkbox") {
      let newSelection = selection;
      if (!selection.includes(option)) {
        newSelection = [...newSelection, option];
      } else {
        newSelection.splice(newSelection.indexOf(option), 1);
      }
      this.setState({
        'selection': newSelection,
      }, () => {
        this.props.updateSelectedOptions(newSelection);
      });
    } else {
      const newSelectedOption = selection !== option ? option : ''
      this.setState({
        'selection': newSelectedOption,
      }, () => {
        this.props.updateSelectedOptions(newSelectedOption)
      });
    }
  }

  render() {
    const { type, options } = this.props;
    return (
      <ul>
        {
          options.map((option) => (
            <Option
              label={option}
              type={type}
              selectOption={() => this.selectOption(option)}
              selection={this.state.selection}
            />
          ))
        }
      </ul>
    );
  }
}

OptionsList.displayName = 'OptionsList';
OptionsList.propTypes = {
  'options': PropTypes.array,
  'type': PropTypes.string,
};
OptionsList.defaultProps = {
  'options': [],
  'type': 'radio',
};

export default OptionsList;
