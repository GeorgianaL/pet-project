import React from 'react';

import { capitalize } from '../../lib';

const Option = (props) => {
  const checked = props.type === 'checkbox' ?
    props.selection.includes(props.label) :
    props.selection === props.label;

  return (
    <li className="option" onClick={props.selectOption}>
      <input type={props.type} checked={checked} />
      <span className="checkmark">{capitalize(props.label)}</span>
    </li>
  );
};

export default Option;
