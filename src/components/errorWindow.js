import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';
import Octicon, { Alert } from '@primer/octicons-react';


const ErrorWindow = ({
  title, message, show, onHide,
}) => (
  <Modal show={show} onHide={onHide} dialogClassName="mw-100 w-50">
    <Modal.Header className="bg-danger text-white" closeButton>
      <Modal.Title>
        <Octicon size="medium" className="inline-icon size30" verticalAlign="middle" icon={Alert} ariaLabel="Error" />
        {title}
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
  </Modal>
);

ErrorWindow.defaultProps = {
  title: 'Error',
  show: false,
  message: null,
  onHide: () => {}, // do nothing by default
};

ErrorWindow.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onHide: PropTypes.func,
};

export default ErrorWindow;
