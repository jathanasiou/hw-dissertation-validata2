import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
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
    const { onChange } = this.props;
    this.setState({
      selection: schemas[eventKey].title,
    });
    onChange(eventKey);
  };

  clear = () => {
    const { onChange } = this.props;
    this.setState({ selection: null });
    onChange(null);
  };

  render() {
    const { size } = this.props;
    const { selection } = this.state;

    // return dropdown control that takes up entire wrapper width
    return (
      <Dropdown>
        <Dropdown.Toggle className="w-100" size={size} variant="info" id="schema-selector">{selection || 'Select a schema'}</Dropdown.Toggle>
        <Dropdown.Menu className="w-100">
          <Dropdown.Item as="button" className="w-100" key={999} eventKey={999} onSelect={this.clear}>Clear</Dropdown.Item>
          <Dropdown.Divider />
          {schemas.map((schema, index) => (<Dropdown.Item as="button" key={schema.title} eventKey={index} onSelect={this.itemSelected}>{schema.title}</Dropdown.Item>))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SchemaSelector.defaultProps = {
  size: '',
};

SchemaSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
};


export default SchemaSelector;
