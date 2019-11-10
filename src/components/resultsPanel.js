import React from 'react';
import { Card } from 'react-bootstrap';
import Octicon, { Report } from '@primer/octicons-react';

class ResultsPanel extends React.PureComponent {
  render() {
    const header = ' Validation report';
    return (
      <Card>
        {/* TODO improve Icon+Text rendering */}
        <Card.Header as="h5">
          <Octicon size="medium" icon={Report} ariaLabel="Validation Report panel" />
          {header}
        </Card.Header>
        <Card.Body>
          <Card.Title>X errors, Y warnings</Card.Title>
          <Card.Text>
            Dolore voluptate mollit dolor aliqua enim veniam eiusmod ea ut in. Lorem id nostrud sunt cillum sint occaecat ad. Ut irure deserunt ex cillum laboris nisi velit ut ad. Sint occaecat excepteur nulla velit magna incididunt consequat consectetur aliqua dolore ad sint enim ut. Sint labore esse esse ullamco ex. Dolore tempor Lorem id nostrud sint laboris magna deserunt.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ResultsPanel;
