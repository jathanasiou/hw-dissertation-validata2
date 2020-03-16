import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import schemasProvider from '../schemas';
import 'prismjs/components/prism-turtle';
import 'prismjs/themes/prism-coy.css';


class SchemaPreviewModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { content: '' };
  }

  async componentDidMount() {
    const { schemaKey } = this.props;
    const schema = (await schemasProvider()).find((s) => s.name === schemaKey);
    this.setState({ content: schema ? schema.content : '' });
  }

  async componentDidUpdate(prevProps) {
    const { schemaKey } = this.props;
    if (schemaKey !== prevProps.schemaKey) { // to avoid infinite recursion
      const schema = (await schemasProvider()).find((s) => s.name === schemaKey);
      this.setState({ content: schema ? schema.content : '' });
    }
  }

  render() {
    const { show, onHide, schemaKey } = this.props;
    const { content } = this.state;

    return (
      <Modal show={show} onHide={onHide} dialogClassName="mw-100 w-50">
        <Modal.Header className="bg-info text-white" closeButton>
          <Modal.Title>
            {`Profile: ${schemaKey}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Editor
            className="border border-secondary"
            value={content}
            onValueChange={this.onCodeEdit}
            highlight={(code) => highlight(code, languages.turtle)}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </Modal.Body>
      </Modal>
    );
  }
}

SchemaPreviewModal.defaultProps = {
  show: false,
  schemaKey: null,
  onHide: () => {}, // do nothing by default
};

SchemaPreviewModal.propTypes = {
  show: PropTypes.bool,
  schemaKey: PropTypes.string,
  onHide: PropTypes.func,
};

export default SchemaPreviewModal;
