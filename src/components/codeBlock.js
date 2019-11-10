import React from 'react';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/javascript/javascript');

const example = `\
{
  "identifier": [
    "yfp"
  ],
  "mainEntity": {
    "@type": "https://bioschemas.org/BioChemEntity",
    "identifier": "yfp",
    "hasBioChemRole": [
      "http://identifiers.org/so/SO:0000316",
      "http://wiki.synbiohub.org/wiki/Terms/igem#partType/Coding"
    ],
    "url": "https://synbiohub.org/public/igem/BBa_K165005/1",
    "description": "Venus YFP, yeast optimized for fusion<br/>"
  },
  "url": "https://synbiohub.org/public/igem/BBa_K165005/1",
  "@context": {
    "scheme": "http://schema.org/",
    "bs": "http://bioschema.org/"
  },
  "@type": "https://bioschemas.org/DataRecord"
}`;

const CodeBlock = ({ className }) => (
  <CodeMirror
    value={example}
    options={{
      mode: 'javascript',
      theme: 'eclipse',
      lineNumbers: true,
    }}
    // onChange={(editor, data, value) => {
    // }}
    className={className}
  />
);

CodeBlock.defaultProps = {
  className: '',
};

CodeBlock.propTypes = {
  className: PropTypes.string,
};

export default CodeBlock;
