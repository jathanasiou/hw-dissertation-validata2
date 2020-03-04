import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import InputResource from './components/inputResource';
import ResultsPanel from './components/resultsPanel';
import RdfShapeResults from './components/RdfShapeResults';
import SchemaSelect from './components/schemaSelector';
import ErrorWindow from './components/errorWindow';
import validator from './validator';
import { validate } from './utils/validationHelper';
import schemasProvider from './schemas';
import scraper from './utils/webScraper';


const datasetExample = `\
<genid-c7a50d6e828f4595a195f9c67304f6d2-0AE87CB066C8D9CD43117E0C5A3090F0> a <http://schema.org/Dataset>;
  <http://schema.org/description> "The GeneChip® Drosophila Genome Array is a microarray tool for studying expression of Drosophila melanogaster transcripts.";
  <http://schema.org/identifier> "http://www.affymetrix.com/products/arrays/specific/fly.affx";
  <http://schema.org/name> "Affymetrix array: GeneChip Drosophila Genome 2.0 Array";
  <http://schema.org/url> <https://www.flymine.org/flymine/dataset> .
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaKey: null,
      validationResult: null,
      validationResultRDFShape: null,
      validationError: null,
      inputMode: 'code',
      rawCode: datasetExample,
      inputUrl: 'https://www.flymine.org/flymine/begin.do',
    };
  }

  inputModeChange = (inputMode) => {
    this.setState({ inputMode });
  };

  codeChange = (code) => {
    this.setState({ rawCode: code });
  };

  inputUrlChange = (newUrl) => {
    this.setState({ inputUrl: newUrl });
  };

  schemaSelectionChange = (schemaKey) => {
    this.setState({ schemaKey });
  };

  runValidation = async () => {
    const {
      schemaKey, rawCode, inputUrl, inputMode,
    } = this.state;
    let profile;
    let validationResult = null;
    let validationResultRDFShape = null;
    try {
      profile = (await schemasProvider()).find((schema) => schema.name === schemaKey);
      console.log('Validating with schema:', schemaKey);
      const codeRDF = (inputMode === 'code')
        ? rawCode
        : (await scraper(inputUrl));
      validationResult = await validator(profile.content, codeRDF);
      validationResultRDFShape = await validate(profile.content, codeRDF);
    } catch (err) {
      console.error(err);
      alert('Problem with parsing the Bioschemas profile.');
      // TODO: change to modal error window
      // this.setState({validationError: error})
    }
    this.setState({ validationResult, validationResultRDFShape });
  };

  render() {
    const {
      schemaKey, rawCode, validationResult, validationResultRDFShape, validationError,
      inputUrl, inputMode,
    } = this.state;
    const validateBtnDisabled = (schemaKey === null) || !rawCode;
    const validateBtn = (<Button onClick={this.runValidation} disabled={validateBtnDisabled} size="lg">Validate</Button>);

    return (
      <Container>
        <ErrorWindow show={!!validationError} message={validationError} />
        <h1>Validata 2 Validator tool</h1>
        <Row>
          <Col xs="12">
            <InputResource
              inputMode={inputMode}
              onInputModeChange={this.inputModeChange}
              rawCode={rawCode}
              onCodeChange={this.codeChange}
              inputUrl={inputUrl}
              onInputUrlChange={this.inputUrlChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SchemaSelect onChange={this.schemaSelectionChange} validateButton={validateBtn} />
            { /* TODO: add Schema Preview */ }
          </Col>
          <Col xs={12}><ResultsPanel validationResult={validationResult} /></Col>
          <Col xs={12}><RdfShapeResults validationResult={validationResultRDFShape} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
