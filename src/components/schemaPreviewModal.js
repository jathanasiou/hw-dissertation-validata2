import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import { Controlled as CodeMirror } from 'react-codemirror2';
import schemasProvider from '../schemas';


class SchemaPreviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: null };
  }

  async componentDidMount() {
    const { schemaKey } = this.props;
    const schema = (await schemasProvider()).find((s) => s.name === schemaKey);
    this.setState({ content: schema ? schema.content : null });
  }

  async componentDidUpdate(prevProps) {
    const { schemaKey } = this.props;
    if (schemaKey !== prevProps.schemaKey) { // to avoid infinite recursion
      const schema = (await schemasProvider()).find((s) => s.name === schemaKey);
      this.setState({ content: schema ? schema.content : null });
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
          <CodeMirror
            className="border border-secondary"
            value={content}
            autoScroll={false}
            options={{
              mode: 'turtle',
              theme: 'eclipse',
              lineNumbers: true,
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
