import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Tab, InputGroup, FormControl,
} from 'react-bootstrap';
import Octicon, { Globe, Code } from '@primer/octicons-react';
import CodeBlock from './codeBlock';

class InputResource extends React.Component {

  onTabChange = (tabKey) => {
    this.setState({ tabKey });
    this.props.onInputModeChange(tabKey);
  };

  urlChange = (event) => {
    this.props.onInputUrlChange(event.target.value);
  };

  render() {
    const {
      onCodeChange, rawCode, inputUrl, inputMode,
    } = this.props;

    const urlInputControl = (
      <Fragment>
        <div className="alert alert-warning mt-1 font-italic">Work in progress</div>
        <label htmlFor="basic-url">Type a URL below to retrieve embedded JSON-LD from</label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-url-addon">
              <Octicon icon={Globe} ariaLabel="Web address input" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="basic-url"
            placeholder="https://myurl.com/RDF_entry"
            aria-describedby="basic-url-addon"
            onChange={this.urlChange}
            value={inputUrl}
          />
        </InputGroup>
      </Fragment>
    );
    const codeInputControl = (
      <CodeBlock value={rawCode} onChange={onCodeChange} className="border border-secondary" />
    );
    const pageInputTabTitle = (
      <span>
        <Octicon className="inline-icon size20" verticalAlign="middle" icon={Globe} ariaLabel="web page input" />
        <span>Web page</span>
      </span>
    );

    const rawInputTabTitle = (
      <span>
        <Octicon className="inline-icon size20" verticalAlign="middle" icon={Code} ariaLabel="Code input" />
        <span>Turtle code</span>
      </span>
    );

    return (
      <div className="border-bottom pb-2">
        <h3>RDF data source</h3>
        <Tabs id="controlled-input-tab" activeKey={inputMode} onSelect={(k) => this.onTabChange(k)}>
          <Tab eventKey="url" title={pageInputTabTitle}>
            {urlInputControl}
          </Tab>
          <Tab eventKey="code" title={rawInputTabTitle}>
            {codeInputControl}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

InputResource.defaultProps = {
  rawCode: '',
  inputUrl: '',
};

InputResource.propTypes = {
  onInputModeChange: PropTypes.func.isRequired,
  inputMode: PropTypes.string.isRequired, // one of 'code', 'url'
  rawCode: PropTypes.string,
  onCodeChange: PropTypes.func.isRequired,
  inputUrl: PropTypes.string,
  onInputUrlChange: PropTypes.func.isRequired,
};

export default InputResource;
