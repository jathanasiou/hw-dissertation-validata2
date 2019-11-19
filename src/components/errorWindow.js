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

    {/* <Modal.Footer>
	    <Button variant="secondary">Close</Button>
	    <Button variant="primary">Save changes</Button>
	  </Modal.Footer> */}
  </Modal>
);

ErrorWindow.defaultProps = {
  title: 'Error',
  show: false,
};

ErrorWindow.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
};

export default ErrorWindow;
