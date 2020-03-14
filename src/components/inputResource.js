import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, InputGroup, FormControl, Row, Col,
} from 'react-bootstrap';
import Octicon, { Globe } from '@primer/octicons-react';
import scraper from '../utils/webScraper';
import CodeBlock from './codeBlock';


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

  onCodeEdit = (code, data) => {
    const { onCodeChange, loading } = this.state;
    console.log('onCodeEdit')
    if (loading)  {
      data.cancel();
      return;
    }
    onCodeChange(code);
  };

  onLoad = async () => {
    const { onCodeChange, inputUrl } = this.state;
    this.setState({ loading: true });

    const rdfCode = await scraper(inputUrl);
    this.setState({ loading: false }, () => onCodeChange(rdfCode));
  };

  render() {
    const { inputUrl, loading } = this.state;
    const { rdfCode } = this.props;

    const urlInputControl = (
      <Row>
        <Col xs="auto" className="pr-0">
          <Button type="primary" onClick={this.onLoad}>Load</Button>
        </Col>
        <Col>
          {/* <label htmlFor="basic-url">Type a URL below to retrieve embedded RDF</label> */}
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
      <CodeBlock
        className="border border-secondary"
        value={rdfCode}
        onChange={this.onCodeEdit}
        readonly={loading}
      />
    );

    return (
      <div className="border-bottom pb-2">
        {`LOADING: ${loading}`}
        <div className="h3">Load from a web resource and/or directly edit the code below</div>
        {urlInputControl}
        {codeInputControl}
      </div>
    );
  }
}

InputResource.propTypes = {
  onCodeChange: PropTypes.func.isRequired,
  rdfCode: PropTypes.string.isRequired,
};

export default InputResource;
