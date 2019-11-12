import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/javascript/javascript');


const CodeBlock = ({
  value, className, lineNumbers, onChange,
}) => (
  <CodeMirror
    value={value}
    className={className}
    options={{
      mode: 'javascript',
      theme: 'eclipse',
      lineNumbers,
    }}
    onBeforeChange={(editor, data, value) => onChange(value)}
  />
);

CodeBlock.defaultProps = {
  lineNumbers: true,
  value: '',
  className: '',
};

CodeBlock.propTypes = {
  onChange: PropTypes.func.isRequired,
  lineNumbers: PropTypes.bool,
  value: PropTypes.string,
  className: PropTypes.string,
};

export default CodeBlock;
