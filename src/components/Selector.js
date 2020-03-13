import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';


const Selector = ({
  options, onChange, placeholder, value, disabled
}) => (
  <Select
    className="h-100"
    isDisabled={disabled}
    placeholder={placeholder}
    options={options}
    onChange={onChange}
    value={value}
    isClearable
  />
);

Selector.defaultProps = {
  placeholder: '',
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};


export default Selector;
