import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  Tabs, Tab, InputGroup, FormControl,
} from 'react-bootstrap';
import Octicon, { Globe, Code } from '@primer/octicons-react';
import CodeBlock from './codeBlock';

class InputResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'raw',
      tabKey: 'raw',
    };
  }

  toggleMode = () => {
    const { mode } = this.state;
    if (mode === 'url') this.setState({ mode: 'raw' });
    if (mode === 'raw') this.setState({ mode: 'url' });
  };

  onTabChange = (eventKey) => {
    this.setState({ tabKey: eventKey });
  };

  render() {
    const { onCodeChange, rawCode } = this.props;
    const { tabKey } = this.state;

    const urlInput = (
      <Fragment>
        <div className="alert alert-warning mt-1 font-italic">Work in progress</div>
        <label htmlFor="basic-url">Type a URL below to retrieve embedded JSON-LD from</label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-url-addon">
              <Octicon icon={Globe} ariaLabel="Web address input" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl disabled id="basic-url" placeholder="https://synbiohub.org/public/igem/BBa_K165005/1" aria-describedby="basic-url-addon" />
        </InputGroup>
      </Fragment>
    );
    const codeInput = (
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
        <Tabs id="controlled-input-tab" activeKey={tabKey} onSelect={(k) => this.onTabChange(k)}>
          <Tab eventKey="url" title={pageInputTabTitle}>
            {urlInput}
          </Tab>
          <Tab eventKey="raw" title={rawInputTabTitle}>
            {codeInput}
          </Tab>
        </Tabs>
      </div>
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
