import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button, InputGroup, FormControl, Row, Col, Spinner,
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
      inputUrl: '',
      onCodeChange: props.onCodeChange,
      onLoadClick: props.onLoad,
    };
  }

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
    const { inputUrl } = this.state;
    const { rdfCode, loading } = this.props;
    const spinnerClass = `pl-0${ loading ? '' : ' invisible'}`;
    const loadBtnDisabled = loading || !inputUrl;
    const editorClass = `editor border border-secondary${
      loading ? ' disabled-code' : ''}`;


    const urlInputControl = (
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-url-addon">
                <Octicon icon={Globe} ariaLabel="Web address input" />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="basic-url"
              placeholder="https://myurl.com/embedded_RDF_document"
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

    return (
      <CardGroup header="Structured Data" icon={Code} bodyTitle="Edit the sample code below or load from a web resource with embedded RDF">
        <Fragment>
          {urlInputControl}
          {codeInputControl}
        </Fragment>
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
