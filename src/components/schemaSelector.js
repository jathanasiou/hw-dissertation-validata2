import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import schemasProvider from '../schemas';
// import Octicon, { Globe } from '@primer/octicons-react';


class SchemaSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { schemas: [] };
  }

  UNSAFE_componentWillMount() {
    this.asyncReq = schemasProvider().then(
      (schemas) => {
        this.asyncReq = null;
        this.setState({ schemas });
      },
    );
  }

  UNSAFE_componentWillReceiveProps() {
    if (this.asyncReq) {
      this.asyncReq.cancel();
    }
  }

  itemSelected = (selection, change) => {
    const { onChange } = this.props;
    let schemaName;

    if (change.action === 'select-option') {
      schemaName = selection.label;
    } else if (change.action === 'clear' || change.action === 'pop-value') {
      schemaName = null;
    } else {
      throw new Error('Invalid select action');
    }

    onChange(schemaName);
  };

  render() {
    const { validateButton } = this.props;
    const { schemas } = this.state;
    const options = schemas.map((schema) => ({
      label: schema.name,
      value: schema.content,
    }));

    return (
      <Row>
        <Col>
          <Select
            placeholder="Search or select a schema"
            options={options}
            onChange={this.itemSelected}
            isClearable
          />
        </Col>
        <Col xs="auto">
          {validateButton}
        </Col>
      </Row>
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
