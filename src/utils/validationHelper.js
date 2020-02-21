import qs from 'query-string';


const API = 'http://shaclex.herokuapp.com/api';

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
      shapeMapFormat: 'compact',
      "shape-map": "<genid-c7a50d6e828f4595a195f9c67304f6d2-0AE87CB066C8D9CD43117E0C5A3090F0>@<DatasetMinimum>",
      schema,
    },
  });
  return (await fetch(requestEndpoint, {method: 'POST'})).text();
}

export {
  getFormats,
  validate,
};
