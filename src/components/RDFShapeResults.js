import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';
import BootstrapTable from 'react-bootstrap-table-next';


const rowDecorator = (row) => ((row.status === 'conformant') ? 'good' : 'bad');

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


const RDFShapeResultsPanel = ({ validationResult }) => {
  const rows = validationResult
    ? validationResult.shapeMap || []
    : [];

  return (
    <Card className="shadow">
      <Card.Header as="h5" className="bg-primary text-white">
        <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Report} ariaLabel="Validation Report panel" />
        <span>RDFShape Report</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>Validation status for each Node-Shape pair</Card.Title>
        <BootstrapTable
          bootstrap4
          bordered={false}
          keyField="node" // field to use as key
          data={rows}
          columns={columns}
          expandRow={expandRow}
          rowClasses={rowDecorator}
        />
      </Card.Body>
    </Card>
  );
};

RDFShapeResultsPanel.defaultProps = {
  validationResult: null,
};

RDFShapeResultsPanel.propTypes = {
  validationResult: PropTypes.object,
};

export default RDFShapeResultsPanel;
