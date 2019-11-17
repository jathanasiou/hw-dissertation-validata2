import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Tabs, Tab, Button, InputGroup, FormControl,
} from 'react-bootstrap';
import Octicon, { Globe } from '@primer/octicons-react';
import CodeBlock from './codeBlock';

// TODO make input modes into TABs instead
function ControlledTabs(key, setKey) {
  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey="url" title="URL resource">
        abc
      </Tab>
      <Tab eventKey="raw" title="Raw code {}">
        abc
      </Tab>
    </Tabs>
  );
}

class InputResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'raw',
    };
  }

  toggleMode = () => {
    const { mode } = this.state;
    if (mode === 'url') this.setState({ mode: 'raw' });
    if (mode === 'raw') this.setState({ mode: 'url' });
  };

  render() {
    const { onCodeChange, rawCode } = this.props;
    const { mode } = this.state;
    let input;

    if (mode === 'url') {
      input = ([
        <label htmlFor="basic-url">Type a URL below:</label>,
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-url-addon">
              <Octicon icon={Globe} ariaLabel="Web address input" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id="basic-url" placeholder="https://synbiohub.org/public/igem/BBa_K165005/1" aria-describedby="basic-url-addon" />
        </InputGroup>,
      ]);
    } else {
      input = (
        <CodeBlock value={rawCode} onChange={onCodeChange} className="border border-secondary" />
      );
    }

    return (
      <Col xs={12} className="border border-primary">
        <Row>
          <Col>
            <h2 className="text-muted">JSON-LD Input</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {/*<Button onClick={this.toggleMode}>Toggle Input Type</Button>*/}
        </Row>
        <Row>
          <Col>
            {input}
          </Col>
        </Row>
      </Col>
    );
  }
}

InputResource.defaultProps = {
  rawCode: '',
};

InputResource.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  rawCode: PropTypes.string,
};

export default InputResource;
