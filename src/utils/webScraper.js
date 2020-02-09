// retrieves embedded RDF from webpages
import qs from 'query-string';

const crawlerService = 'http://lxbisel.macs.hw.ac.uk:8080';

export default async (rdfResource) => (await (await fetch(
  qs.stringifyUrl({
    url: `${crawlerService}/scraper/getRDF`,
    query: {
      output: 'turtle',
      url: rdfResource,
    },
  }),
)).json()).rdf[0];
