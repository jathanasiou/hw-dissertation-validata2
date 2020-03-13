# Validata2

Validation of RDF documents with Bioschemas profiles. Supports:

* Turtle-serialized RDF documents
* Profile validation with ShEx definitions
* User input with on-the-fly editing
* Missing/invalid properties output
* RDFs embedded in web page markup via http://lxbisel.macs.hw.ac.uk:8080/scraper/#api-Developers
* A [CORS-unblocking](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) addon might be needed for local testing.


<hr>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Structure

Bioschemas Profiles (in the form of ShEx schemas) can be placed under `/src/schemas` and will be automatically made available by the index file. Webpack's configuration will also serve those files under `<hosted_url>/static/media/`.

## Deployment

In order to deploy the app a build needs to be produced via
```bash
$ npm run build
```

Afterwards, the contents of the `build` subdirectory can be placed in the serving directory of a web server.

*Note:* the `"homepage":` entry in `package.json` needs to contain the full URL path where the app will be served from. This path will also be appended to `localhost:3000` when running locally via `npm run start`.