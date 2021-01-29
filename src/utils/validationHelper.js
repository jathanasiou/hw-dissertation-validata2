// import qs from 'query-string';
import { Parser } from 'n3';
import * as jsonld from 'jsonld';


const parserTurtle = new Parser({ format: 'Turtle' });

const API = 'https://rdfshape.weso.es:8080/api';

async function getFormats() {
  return (await fetch(`${API}/data/formats`)).json();
}

function parseTurtle(rdf) {
  return new Promise((resolve, reject) => {
    const subjects = new Set();
    parserTurtle.parse(rdf, (error, quad, prefixes) => {
      if (error) reject(error);
      if (quad) {
        subjects.add(quad.subject.id);
      } else {
        resolve(Array.from(subjects));
      }
    });
  });
}

// OVERRIDE schema.org context (this is to avoid CORS problems)
// Approach comes from the jsonld.js documentation for using a customLoader
// https://github.com/digitalbazaar/jsonld.js/blob/b6862c711c286547c0cbf442b83d0f3bb8f8fd0a/README.md#custom-document-loader

// define a mapping of context URL => context doc
// defining both http and https separately
const CONTEXTS = {
  'http://schema.org': {
    '@context': 'http://www.macs.hw.ac.uk/SWeL/schemas/jsonldcontext.8.0.jsonld',
  },
  'https://schema.org': {
    '@context': 'http://www.macs.hw.ac.uk/SWeL/schemas/jsonldcontext.8.0.jsonld',
  },
  'http://schema.org/': {
    '@context': 'http://www.macs.hw.ac.uk/SWeL/schemas/jsonldcontext.8.0.jsonld',
  },
  'https://schema.org/': {
    '@context': 'http://www.macs.hw.ac.uk/SWeL/schemas/jsonldcontext.8.0.jsonld',
  }
};

// grab the XHR doc loader
const nodeDocumentLoader = jsonld.documentLoaders.xhr();

// change the default document loader
const customLoader = async (url, options) => {
  if (url in CONTEXTS) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: CONTEXTS[url], // this is the actual document that was loaded
      documentUrl: url, // this is the actual context URL after redirects
    };
  }
  // call the default documentLoader
  return nodeDocumentLoader(url);
};
jsonld.documentLoader = customLoader;


async function parseJsonld(rdf) {
  const nquads = await jsonld.toRDF(JSON.parse(rdf), {
    // base: window.location.href,
    format: 'application/n-quads',
  });
  // console.log('parsed nquads', nquads);
  const subjects = nquads.match(/^\S+/gm);

  // ensuring uniqueness
  return [...new Set(subjects)];
}

async function validate({
  schema, rdf, shape, node,
}) {

  // Workaround to overcome issues with schema.org not resolving context properly
  const nquads = await jsonld.toRDF(JSON.parse(rdf), {
    // base: window.location.href,
    format: 'application/n-quads',
  });
  console.log("nquads: " + nquads);
  // End of workaround WPAdBlock

  const formData = new FormData();
  // formData.append('activeTab', '#dataTextArea');
  // formData.append('dataFormatTextArea', 'JSON-LD');
  // formData.append('schemaFormatTextArea', 'ShExC');
  // formData.append('shapeMapActiveTab', '#shapeMapTextArea');
  // formData.append('shapeMapFormatTextArea', 'Compact');
  // formData.append('activeSchemaTab', '#schemaTextArea');

  // Workaround to overcome issues with schema.org not resolving context properly
  // formData.append('dataFormat', 'JSON-LD');
  // formData.append('data', rdf);
  formData.append('dataFormat', 'n-triples');
  formData.append('data', nquads);
  // End of workaround

  formData.append('schemaEmbedded', false);
  formData.append('schemaFormat', 'ShExC');
  formData.append('schema', schema);
  formData.append('shapeMapFormat', 'Compact');
  formData.append('shapeMap', `${node}@${shape}`);
  formData.append('schemaEngine', 'ShEx');
  formData.append('triggerMode', 'shapeMap');

  return (await fetch(`${API}/schema/validate`, { method: 'POST', body: formData })).json();
}

export {
  getFormats,
  parseTurtle,
  parseJsonld,
  validate,
};
