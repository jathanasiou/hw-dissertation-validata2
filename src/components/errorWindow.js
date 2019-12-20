import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

const ErrorWindow = ({
  title, message, show,
}) => (
  <Modal show={show}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
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
};

ErrorWindow.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default ErrorWindow;
