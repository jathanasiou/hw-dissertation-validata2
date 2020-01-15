// retrieves embedded RDF from webpages
import qs from 'query-string';

const crawlerService = 'http://lxbisel.macs.hw.ac.uk:8080';

export default async (url) => (await fetch(`${crawlerService}/getRDF?${qs.stringify({
  url,
  format: 'turtle',
})}`)).text();
