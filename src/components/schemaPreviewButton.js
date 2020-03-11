import React from 'react';
import PropTypes from 'prop-types';
import {
  OverlayTrigger, Tooltip, Button,
} from 'react-bootstrap';
import Octicon, { Eye } from '@primer/octicons-react';


const SchemaPreviewButton = ({
  disabled, onClick,
}) => (
  <OverlayTrigger placement="top" overlay={<Tooltip>Schema Preview</Tooltip>}>
    <Button size="lg" variant="info" disabled={disabled} onClick={onClick}>
      <Octicon size="medium" verticalAlign="middle" icon={Eye} />
    </Button>
  </OverlayTrigger>
);

SchemaPreviewButton.defaultProps = {
  disabled: false,
};

SchemaPreviewButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default SchemaPreviewButton;
