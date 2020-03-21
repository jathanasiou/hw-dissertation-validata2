import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button, InputGroup, FormControl, Row, Col, Spinner,
  Nav, Tab,
} from 'react-bootstrap';
import Octicon, { Globe, Code } from '@primer/octicons-react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import CardGroup from './CardControlGroup';

import 'prismjs/components/prism-turtle';
import 'prismjs/themes/prism-coy.css';

const hightlightWithLineNumbers = (input, language) => highlight(input, language)
  .split('\n')
  .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
  .join('\n');

class InputResource extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputMode: 'url',
      inputUrl: '',
      onCodeChange: props.onCodeChange,
      onLoadClick: props.onLoad,
    };
  }

  changeInputMode = (inputMode) => {
    this.setState({ inputMode });
  };

  onUrlChange = (event) => {
    this.setState({ inputUrl: event.target.value });
  };

  onCodeEdit = (newCode) => {
    const { onCodeChange, loading } = this.state;
    if (loading) {
      return;
    }
    onCodeChange(newCode);
  };

  onLoad = async () => {
    const { onLoadClick, inputUrl } = this.state;
    onLoadClick(inputUrl);
  };

  render() {
    const { inputUrl, inputMode } = this.state;
    const { rdfCode, loading } = this.props;
    const spinnerClass = `pl-0${ loading ? '' : ' invisible'}`;
    const loadBtnDisabled = loading || !inputUrl;
    const editorClass = `editor${loading ? ' disabled-code' : ''}`;


    const urlInputControl = (
      <Row className="mb-0">
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-url-addon">
                <Octicon icon={Globe} ariaLabel="Web address input" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              placeholder="URL with emdedded RDF data"
              aria-describedby="basic-url-addon"
              value={inputUrl}
              onChange={this.onUrlChange}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button disabled={loadBtnDisabled} type="primary" onClick={this.onLoad}>Load</Button>
        </Col>
        <Col xs="auto" className={spinnerClass}>
          <Spinner animation="border" variant="primary" />
        </Col>
      </Row>
    );
    const codeInputControl = (
      <div className="editor-wrapper">
        <Editor
          className={editorClass}
          value={rdfCode}
          padding={10}
          textareaId="codeArea"
          onValueChange={this.onCodeEdit}
          highlight={(code) => hightlightWithLineNumbers(code, languages.turtle)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 0,
          }}
        />
      </div>
    );

    const tabs = (
      <Nav variant="tabs" defaultActiveKey="url">
        <Nav.Item>
          <Nav.Link eventKey="url">URL</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="code">Code</Nav.Link>
        </Nav.Item>
      </Nav>
    );

    const tabContents = (
      <Tab.Content>
        <Tab.Pane eventKey="url" title="URL">
          {urlInputControl}
        </Tab.Pane>
        <Tab.Pane eventKey="code" title="Code">
          {codeInputControl}
        </Tab.Pane>
      </Tab.Content>
    );

    return (
      <CardGroup header="1. Structured Data" icon={Code} bodyTitle="Validate data from a web resource or test your own Turtle code.">
        <Tab.Container id="controlled-tab-example" activeKey={inputMode} onSelect={this.changeInputMode}>
          <Row className="pb-1">
            <Col>{tabs}</Col>
          </Row>
          <Row className="border-top pt-2">
            <Col className=" ">{tabContents}</Col>
          </Row>
        </Tab.Container>
      </CardGroup>
    );
  }
}

InputResource.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  rdfCode: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default InputResource;
