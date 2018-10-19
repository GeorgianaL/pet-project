import React from 'react';

import { capitalize } from '../../lib';

const Option = (props) => {
  const checked = props.type === 'checkbox' ?
    props.selection.includes(props.label) :
    props.selection === props.label;
  return (
    <div onClick={props.selectOption}>
      <input type={props.type} checked={checked}/>
      {capitalize(props.label)}
    </div>
  );
};

export default Option;
