import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';

const ResultsPanel = ({ validationResult }) => {
  let title;
  let validationErrors;

  if (!validationResult) {
    validationErrors = [];
    title = 'N/A';
  } else {
    validationErrors = validationResult.validationErrors;
    title = `${validationResult.validationState} | Errors: ${validationErrors.length}`;
  }

  return (
    <Card>
      <Card.Header as="h5">
        <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Report} ariaLabel="Validation Report panel" />
        <span>Validation Report</span>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ListGroup variant="flush">
          {validationErrors.map((error, index) => (
            <ListGroup.Item key={index}>{index + 1}: {error.userFriendlyMessage}</ListGroup.Item>
          ))}
        </ListGroup>
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
