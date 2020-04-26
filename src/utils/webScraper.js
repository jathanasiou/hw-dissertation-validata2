// retrieves embedded RDF from webpages
import qs from 'query-string';
// import * as jsonld from 'jsonld';

const crawlerService = 'http://lxbisel.macs.hw.ac.uk:8080';

async function turtleScraper(rdfResource) {
  if (typeof rdfResource !== 'string') throw new Error('Invalid resource URL, expecting string.');
  const url = rdfResource.trim();
  const response = (await fetch(
    qs.stringifyUrl({
      url: `${crawlerService}/scraper/getRDF`,
      query: {
        output: 'turtle', // defaults to json-ld
        url,
      },
    }),
  ));
  const content = await response.json();

  if (!response.ok || (typeof content.rdf === 'undefined') || (!content.rdf.length)) {
    throw new Error(`Web resource "${rdfResource}" has no data or is unreachable.`);
  }

  return content.rdf[0];
}

async function jsonldScraper(rdfResource) {
  if (typeof rdfResource !== 'string') throw new Error('Invalid resource URL, expecting string.');
  const url = rdfResource.trim();

  const response = (await fetch(
    qs.stringifyUrl({
      url: `${crawlerService}/scraper/getRDF`,
      query: {
        url,
      },
    }),
  ));
  const content = await response.json();

  if (!response.ok || (typeof content.rdf === 'undefined') || (!content.rdf.length)) {
    throw new Error(`Web resource "${rdfResource}" has no data or is unreachable.`);
  }

  return JSON.stringify(content.rdf);
}

export {
  turtleScraper,
  jsonldScraper,
};
