import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';


const rdfShapeLineItem = (row, index) => (
  <tr key={index}>
    <td>{row.node}</td>
    <td>{row.shape}</td>
    <td>{row.status}</td>
    <td>{row.reason}</td>
  </tr>
);

const RDFShapeResultsPanel = ({ validationResult }) => {
  const rows = validationResult
    ? validationResult.shapeMap || []
    : [];

  return (
    <Card>
      <Card.Header as="h5">
        <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Report} ariaLabel="Validation Report panel" />
        <span>RDFShape Report</span>
        {/* <span>{validationResult ? `: ${validationResult.shape}` : ''}</span> */}
      </Card.Header>
      <Card.Body>
        <Card.Title>title</Card.Title>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Node</th>
              <th>Shape</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(rdfShapeLineItem)}
          </tbody>
        </Table>
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
