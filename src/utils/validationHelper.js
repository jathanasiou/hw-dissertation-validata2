import qs from 'query-string';


const API = 'http://rdfshape.weso.es:8080/api';

async function getFormats() {
  const requestEndpoint = qs.stringifyUrl({
    url: `${API}/data/formats`,
  });
  return (await fetch(requestEndpoint)).json();
}

async function validate(schema, rdf) {
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
  formData.append('shapeMap', '<genid-c7a50d6e828f4595a195f9c67304f6d2-0AE87CB066C8D9CD43117E0C5A3090F0>@<DatasetMinimum>');
  formData.append('schemaEngine', 'ShEx');
  formData.append('triggerMode', 'shapeMap');

  return (await fetch(`${API}/schema/validate`, { method: 'POST', body: formData })).json();
}

export {
  getFormats,
  validate,
};
