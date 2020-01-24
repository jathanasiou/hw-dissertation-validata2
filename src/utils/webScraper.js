// retrieves embedded RDF from webpages
import qs from 'query-string';

const crawlerService = 'http://lxbisel.macs.hw.ac.uk:8080';

export default async (url) => (await (await fetch(`${crawlerService}/scraper/getRDF?${qs.stringify({
  url,
  output: 'turtle',
})}`)).json()).rdf[0];
