import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, InputGroup, FormControl, Row, Col,
  Card,
} from 'react-bootstrap';
import Octicon, { Globe, Code } from '@primer/octicons-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import scraper from '../utils/webScraper';
import 'prismjs/components/prism-turtle';
import 'prismjs/themes/prism-coy.css';


class InputResource extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputUrl: 'https://www.flymine.org/flymine/begin.do',
      loading: false,
      onCodeChange: props.onCodeChange,
    };
  }

  onUrlChange = (inputUrl) => {
    this.setState({ inputUrl });
  };

  onCodeEdit = (newCode) => {
    const { onCodeChange, loading } = this.state;
    if (loading) {
      return;
    }
    onCodeChange(newCode);
  };

  onLoad = async () => {
    const { onCodeChange, inputUrl } = this.state;

    this.setState({ loading: true });

    const rdfCode = await scraper(inputUrl);
    this.setState({
      loading: false,
    }, () => onCodeChange(rdfCode));
  };

  render() {
    const { inputUrl } = this.state;
    const { rdfCode } = this.props;

    const urlInputControl = (
      <Row>
        <Col xs="auto" className="pr-0">
          <Button type="primary" onClick={this.onLoad}>Load</Button>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-url-addon">
                <Octicon icon={Globe} ariaLabel="Web address input" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              placeholder="https://myurl.com/RDF_document"
              aria-describedby="basic-url-addon"
              value={inputUrl}
              onChange={this.onUrlChange}
            />
          </InputGroup>
        </Col>
      </Row>
    );
    const codeInputControl = (
      <Editor
        className="border border-secondary"
        value={rdfCode}
        onValueChange={this.onCodeEdit}
        highlight={(code) => highlight(code, languages.turtle)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
    );

    return (
      <Card className="shadow">
        <Card.Header as="h5" className="bg-primary text-white">
          <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Code} ariaLabel="Structured data panel" />
          <span>Structured Data</span>
        </Card.Header>
        <Card.Body>
          <Card.Title>Load from a web resource and/or directly edit the code below</Card.Title>
          {urlInputControl}
          {codeInputControl}
        </Card.Body>
      </Card>
    );
  }
}

InputResource.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  rdfCode: PropTypes.string.isRequired,
};

export default InputResource;
