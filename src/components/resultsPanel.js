import React from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';
import errorLineItem from './errorLineItem';

const ResultsPanel = ({ validationResult }) => {
  let title;
  let validationErrors;

  if (!validationResult) {
    validationErrors = [];
    title = 'N/A';
  } else {
    validationErrors = validationResult.errors;
    title = `${validationResult.type} | Errors: ${validationErrors.length}`;
  }

  return (
    <Card>
      <Card.Header as="h5">
        <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Report} ariaLabel="Validation Report panel" />
        <span>Validation Report</span>
        <span>{validationResult ? `: ${validationResult.shape}` : ''}</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Issue</th>
              <th>Property</th>
              <th>Validation</th>
              <th>Expected</th>
            </tr>
          </thead>
          <tbody>
            {validationErrors.map(errorLineItem)}
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
