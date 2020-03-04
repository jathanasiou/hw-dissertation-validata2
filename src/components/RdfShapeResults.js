import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';
import errorLineItem from './rdfShapeLineItem';

const ResultsPanel = ({ validationResult }) => {
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
            {rows.map(errorLineItem)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

ResultsPanel.defaultProps = {
  validationResult: null,
};

ResultsPanel.propTypes = {
  validationResult: PropTypes.object,
};

export default ResultsPanel;
