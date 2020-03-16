import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';


// TODO: look into updates when RDF code is being changed
class Selector extends React.PureComponent {
  render() {
    const {
      options, onChange, placeholder, value, disabled,
    } = this.props;

    return (
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
  }
}

Selector.defaultProps = {
  placeholder: '',
  disabled: false,
  value: null,
};

Selector.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.object,
};


export default Selector;
