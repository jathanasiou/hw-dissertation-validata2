# Validata2
Validation of RDF documents with Bioschemas profiles. Supports:

* JSON-LD RDF documents
* [Bioschemas Profiles](https://bioschemas.org/profiles/) validation with ShEx definitions
* User input with on-the-fly editing
* Missing/invalid properties output (structure is WIP)
* Web page markup embedded RDF code

<hr>
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Structure

### Validation Schemas
Bioschemas Profiles (in the form of ShEx schemas) can be placed under `/src/schemas` and will be automatically made available by the index file. Webpack's configuration will also serve those files under `<hosted_url>/static/media/`.

Each schema's filename (before extension) will be used as a display name in the GUI. In order for described shapes to be accessible they need to be declared with one of the following name patterns:

* \<FILENAMEMinimum>
* \<FILENAMERecommended>
* \<FILENAMEOptional> 

### External Services
The **SWeL RDF Scraper** service (http://lxbisel.macs.hw.ac.uk:8080/scraper/#api-Developers) is needed for retrieving the RDF embedded in websites. The module for handling that is 

src/utils/webScraper.js

which provides the functions:
* `turtleScraper(rdfResource)`
* `jsonldScraper(rdfResource)`

which take a resource URL as input.

The **RDFShape** project API (https://app.swaggerhub.com/apis-docs/labra/rdfshape/1.0.1) is utilized for performing validations. Specifically the `POST /validate` endpoint. The helper module for this is 

src/utils/webScraper.js

which provides the `validate` function that forms a request to the `/validate` endpoint, containing the required data.

## Local running/testing
*Note:* A [CORS-unblocking](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) addon might be needed for local runs.

In order to run in your local computer (after `git clone`-ing the project) you need to:

```bash
npm install
```
to get the dependencies. Then:

```bash
npm start
```
to run the application in development mode. Should automatically open a browser window with it running on localhost.

## Deployment
In order to deploy the app a build needs to be produced via
```bash
$ npm run build
```

Afterwards, the contents of the `build` subdirectory can be placed in the serving directory of a web server.

*Note:* the `"homepage":` entry in `package.json` needs to contain the full URL path where the app will be served from. This path will also be appended to `localhost:3000` when running locally via `npm run start`.