// import qs from 'query-string';
import { Parser } from 'n3';
import * as jsonld from 'jsonld';


const parserTurtle = new Parser({ format: 'Turtle' });

const API = 'http://rdfshape.weso.es:8080/api';

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
  const formData = new FormData();
  // formData.append('activeTab', '#dataTextArea');
  // formData.append('dataFormatTextArea', 'JSON-LD');
  // formData.append('schemaFormatTextArea', 'ShExC');
  // formData.append('shapeMapActiveTab', '#shapeMapTextArea');
  // formData.append('shapeMapFormatTextArea', 'Compact');
  // formData.append('activeSchemaTab', '#schemaTextArea');
  formData.append('dataFormat', 'JSON-LD');
  formData.append('data', rdf);
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
