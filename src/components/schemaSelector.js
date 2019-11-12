import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown, DropdownButton,
} from 'react-bootstrap';
import schemas from '../schemas';
// import Octicon, { Globe } from '@primer/octicons-react';


class SchemaSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
    };
  }

  itemSelected = (eventKey, event) => {
    this.setState({
      selection: schemas[eventKey].name
    })
    this.props.onChange(schemas[eventKey])
  }

  clear = () => {
    this.setState({selection: null});
    this.props.onChange(null)
  }

  render() {
    const { size } = this.props;
    const { selection } = this.state;

    return (
      <DropdownButton
        size={size}
        title={selection || 'Select a schema'}
        variant="info"
        id="schema-selector"
      >
        <Dropdown.Item as="button" key={999} eventKey={999} onSelect={this.clear}>Clear</Dropdown.Item>
        <Dropdown.Divider />
        {schemas.map((schema, index) =>
          (<Dropdown.Item as="button" key={index} eventKey={index} onSelect={this.itemSelected}>{schema.name}</Dropdown.Item>)
        )}
      </DropdownButton>
    );
  }
}


SchemaSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};


export default SchemaSelector;
