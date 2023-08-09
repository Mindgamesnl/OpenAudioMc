import React from 'react';
import PropTypes from 'prop-types';

export function DropdownSetting(props) {
  const ops = props.options.map((option) => <option key={option.key} value={option.key}>{option.value}</option>);

  return (
    <div className="content-card w-full md:w-1/2 xl:w-1/3 m-2">
      <span>
        <div dangerouslySetInnerHTML={{ __html: props.icon }} className="inline" />
        {props.title}
      </span>
      <div className="content-card-content content-card-content-border-bottom">
        {props.description}
      </div>
      <select value={`${props.value}`} className="w-full soft-tex content-pill" onChange={props.onChange}>
        {ops}
      </select>
    </div>
  );
}

DropdownSetting.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
