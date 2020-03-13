// import qs from 'query-string';
import { Parser } from 'n3';

const parser = new Parser({ format: 'Turtle' });


const API = 'http://rdfshape.weso.es:8080/api';

async function getFormats() {
  return (await fetch(`${API}/data/formats`)).json();
}

function parseTurtle(rdf) {
  return new Promise((resolve, reject) => {
    const subjects = new Set();
    parser.parse(rdf, (error, quad, prefixes) => {
      if (error) reject(error);
      if (quad) {
        subjects.add(quad.subject.id);
      } else {
        resolve(Array.from(subjects));
      }
    });
  });
}

async function validate({
  schema, rdf, shape, node,
}) {
  console.log(...arguments)
  const formData = new FormData();
  // formData.append('activeTab', '#dataTextArea');
  // formData.append('dataFormatTextArea', 'TURTLE');
  // formData.append('schemaFormatTextArea', 'ShExC');
  // formData.append('shapeMapActiveTab', '#shapeMapTextArea');
  // formData.append('shapeMapFormatTextArea', 'Compact');
  // formData.append('activeSchemaTab', '#schemaTextArea');
  formData.append('dataFormat', 'TURTLE');
  formData.append('data', rdf);
  formData.append('schemaEmbedded', false);
  formData.append('schemaFormat', 'ShExC');
  formData.append('schema', schema);
  formData.append('shapeMapFormat', 'ShExC');
  formData.append('shapeMap', `${node}@${shape}`);
  formData.append('schemaEngine', 'ShEx');
  formData.append('triggerMode', 'shapeMap');

  return (await fetch(`${API}/schema/validate`, { method: 'POST', body: formData })).json();
}

export {
  getFormats,
  parseTurtle,
  validate,
};
