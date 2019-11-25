import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import InputResource from './components/inputResource';
import ResultsPanel from './components/resultsPanel';
import SchemaSelect from './components/schemaSelector';
import ErrorWindow from './components/errorWindow';
import validator from './validator';
import schemas from './schemas';
// import logo from './logo.svg';


const jsonldToolExample = `\
{
    "@context": "http://schema.org/",
    "@type": "SoftwareApplication",
    "name": "Cscan",
    "citation": "Zambelli F, Prazzoli GM, Pesole G, Pavesi G. Cscan: finding common regulators of a set of genes by using a collection of genome-wide ChIP-seq datasets. Nucleic Acids Res. 2012 Jul;40(Web Server issue):W510-5. doi: 10.1093/nar/gks483. Epub 2012 Jun 4. PubMed PMID: 22669907; PubMed Central PMCID: PMC3394253.",
    "description": "Cscan is a web resource that includes a large collection of genome-wide ChIP-Seq experiments performed on TFs, histone modifications, RNA polymerases and others. Enriched peak regions from the ChIP-Seq experiments are crossed with the genomic coordinates of a set of input genes, to identify which of the experiments present a statistically significant number of peaks within the input genes’ loci.",
    "url": "http://www.beaconlab.it/cscan",
    "featureList": ["Enrichment analysis", "Transcription factors and regulatory sites", "ChIP-seq", "Epigenetics", "Gene regulation"],
    "softwareVersion": "1.2",
    "applicationCategory": "Web application",
    "operatingSystem": "Any",
    "softwareHelp": {
        "@type": "CreativeWork",
        "Name": "Help Page",
        "url": "http://159.149.160.88/cscan/help.html"
    },
    "dateCreated": "2012-07-01",
    "dateModified": "2013-05-29",

    "potentialAction": {
        "@type": "ControlAction",
        "object": {
            "@type": "Dataset",
            "additionalType": "http://edamontology.org/data_1098"
        },
        "result": {
            "@type": "Dataset",
            "additionalType": "http://edamontology.org/operation_3501"
        }
    },
    "license": "https://www.gnu.org/licenses/gpl-3.0.en.html",
    "publisher": {
        "@type": "Organization",
        "name": "BeaconLab",
        "url": "http://www.beaconlab.it",
        "employee": [{
                "@type": "Person",
                "name": "Giulio Pavesi",
                "email": "giulio.pavesi@unimi.it"
            },
            {
                "@type": "Person",
                "name": "Federico Zambelli",
                "email": "federico.zambelli@unimi.it"
            }
        ],
        "founder": {
            "@type": "Person",
            "name": "Graziano Pesole",
            "email": "graziano.pesole@uniba.it"
        },
        "memberOf": {
            "@type": "Organization",
            "name": "ELIXIR-IIB",
            "url": "http://www.elixir-italy.org"
        }
    }
}`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaKey: null,
      rawCode: jsonldToolExample,
      validationResult: null,
      validationError: null,
    };
  }

  codeChange = (code) => {
    this.setState({ rawCode: code });
  };

  schemaSelection = (schemaKey) => {
    this.setState({ schemaKey });
  };

  runValidation = () => {
    const { schemaKey, rawCode } = this.state;
    let profile;
    try {
      profile = JSON.parse(rawCode);
    } catch (err) {
      console.error(err);
      alert('Problem with parsing the JSON-LD code.');
      // TODO: change to modal error window
      // console.log('Got error',error.message())
      // this.setState({validationError: error})
    }
  };

  render() {
    const {
      schemaKey, rawCode, validationResult, validationError,
    } = this.state;
    const validateBtnDisabled = (schemaKey === null) || !rawCode;
    const validateBtn = (<Button onClick={this.runValidation} disabled={validateBtnDisabled} size="lg">Validate</Button>);

    return (
      <Container>
        <ErrorWindow show={!!validationError} message={validationError} />
        <h1>Validata 2 Validator tool</h1>
        <Row>
          <Col xs="12">
            <InputResource rawCode={rawCode} onCodeChange={this.codeChange} />
          </Col>
        </Row>
        <Row>
          <Col xs="5"><SchemaSelect onChange={this.schemaSelection} validateButton={validateBtn} /></Col>
          <Col><ResultsPanel validationResult={validationResult} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
