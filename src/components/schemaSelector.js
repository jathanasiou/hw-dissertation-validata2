import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  Row, Col,
} from 'react-bootstrap';
import schemas from '../schemas';
// import Octicon, { Globe } from '@primer/octicons-react';


class SchemaSelector extends React.PureComponent {
  itemSelected = (selection, change) => {
    const { onChange } = this.props;
    let schemaKey;

    if (change.action === 'select-option') {
      schemaKey = selection.value;
    } else if (change.action === 'clear' || change.action === 'pop-value') {
      schemaKey = null;
    } else {
      throw new Error('Invalid select action');
    }

    onChange(schemaKey);
  };

  render() {
    const { validateButton } = this.props;
    const options = schemas.map((schema, index) => ({
      label: schema.title,
      value: index,
    }));
    return (
      <>
        <Row>
          <Col>
            <Select
              placeholder="Search or select a schema"
              options={options}
              onChange={this.itemSelected}
              isClearable
            />

          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            {validateButton}
          </Col>
        </Row>
      </>
    );
  }
}

SchemaSelector.defaultProps = {
};

SchemaSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  validateButton: PropTypes.node.isRequired,
};


export default SchemaSelector;
