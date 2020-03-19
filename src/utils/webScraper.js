// retrieves embedded RDF from webpages
import qs from 'query-string';

const crawlerService = 'http://lxbisel.macs.hw.ac.uk:8080';

export default async (rdfResource) => {
  const response = (await fetch(
    qs.stringifyUrl({
      url: `${crawlerService}/scraper/getRDF`,
      query: {
        output: 'turtle',
        url: rdfResource,
      },
    }),
  ));
  const content = await response.json();

  if (!response.ok || (typeof content.rdf === 'undefined') || (!content.rdf.length)) {
    throw new Error(`Web resource "${rdfResource}" has no data or is unreachable.`);
  }

  return content.rdf[0];
};
