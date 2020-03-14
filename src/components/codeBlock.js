import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/javascript/javascript');


const CodeBlock = ({
  value, className, lineNumbers, onChange, readonly,
}) => (
  <CodeMirror
    value={value}
    className={className}
    options={{
      mode: 'javascript',
      theme: 'eclipse',
      readonly,
      lineNumbers,
    }}
    onBeforeChange={(editor, data, value) => {
      console.log('onBeforeChange',data.cancel);
      onChange(value, data);
    }}
  />
);

CodeBlock.defaultProps = {
  lineNumbers: true,
  value: '',
  className: '',
  readonly: false,
};

CodeBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  lineNumbers: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
  readonly: PropTypes.bool,
};

export default CodeBlock;
