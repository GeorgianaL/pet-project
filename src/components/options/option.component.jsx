import React from "react";
import { isEqual } from "lodash";

import { capitalize } from "../../lib";

class Option extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { type, selection, selectOption, label } = this.props;
    return (
      !isEqual(selection, nextProps.selection) ||
      !isEqual(type, nextProps.type) ||
      !isEqual(selectOption, nextProps.selectOption) ||
      !isEqual(label, nextProps.label)
    );
  }
  render() {
    const { type, selection, selectOption, label } = this.props;
    const checked =
      type === "checkbox" ? selection.includes(label) : selection === label;

    return (
      <li className="option" onClick={selectOption}>
        <input type={type} checked={checked} />
        <span className="checkmark">{capitalize(label)}</span>
      </li>
    );
  }
}

export default Option;
