import qs from 'query-string';


const API = 'http://rdfshape.weso.es:8080/api/';

async function getFormats() {
  const requestEndpoint = qs.stringifyUrl({
    url: `${API}/data/formats`,
  });
  return (await fetch(requestEndpoint)).json();
}

async function validate(schema, rdf) {
  const requestEndpoint = qs.stringifyUrl({
    url: `${API}/validate`,
    query: {
      dataFormat: 'turtle',
      schemaFormat: 'ShExC',
      data: rdf,
      schema,
      shapeMapFormat: 'compact',
      "shape-map": "<genid-c7a50d6e828f4595a195f9c67304f6d2-0AE87CB066C8D9CD43117E0C5A3090F0>@<DatasetMinimum>",
    },
  });
  return (await fetch(requestEndpoint, {method: 'GET'})).text();
}

export {
  getFormats,
  validate,
};
