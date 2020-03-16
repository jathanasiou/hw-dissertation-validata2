import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Report } from '@primer/octicons-react';
import BootstrapTable from 'react-bootstrap-table-next';
import CardGroup from './CardControlGroup';


const rowDecorator = (row) => ((row.status === 'conformant') ? 'good clickable' : 'bad clickable');

const columns = [{
  dataField: 'node',
  text: 'Node',
}, {
  dataField: 'shape',
  text: 'Shape',
}, {
  dataField: 'status',
  text: 'Status',
}];

const expandRow = {
  renderer: (row) => (
    <Fragment>{row.reason}</Fragment>
  ),
  showExpandColumn: true,
};


class RDFShapeResultsPanel extends React.PureComponent {
  render() {
    const { validationResult } = this.props;
    const rows = validationResult
      ? validationResult.shapeMap || []
      : [];

    return (
      <CardGroup header="Validation  Report" icon={Report} bodyTitle="Validation status for each Node-Shape pair">
        <BootstrapTable
          bootstrap4
          bordered={false}
          keyField="node" // field to use as key
          data={rows}
          columns={columns}
          expandRow={expandRow}
          rowClasses={rowDecorator}
        />
      </CardGroup>
    );
  }
}

RDFShapeResultsPanel.defaultProps = {
  validationResult: null,
};

RDFShapeResultsPanel.propTypes = {
  validationResult: PropTypes.object,
};

export default RDFShapeResultsPanel;
