import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import InputResource from './components/inputResource';
import ShexjsResultsPanel from './components/ShexjsResultsPanel';
import RDFShapeResults from './components/RDFShapeResults';
import SchemaSelect from './components/schemaSelector';
import SchemaPreviewButton from './components/schemaPreviewButton';
import SchemaPreviewModal from './components/schemaPreviewModal';
import ErrorWindow from './components/errorWindow';
import ShexjsValidate from './validator';
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
      // validationResult: null,
      validationResultRDFShape: null,
      showSchemaPreview: false,
      error: null,
      errorDetails: null,
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

  onErrorHidden = () => {
    this.setState({
      error: null,
      errorDetails: null,
    });
  };

  onSchemaPreviewHidden = () => {
    this.setState({ showSchemaPreview: false });
  };

  onSchemaPreviewShown = () => {
    this.setState({ showSchemaPreview: true });
  };

  runValidation = async () => {
    const {
      schemaKey, rawCode, inputUrl, inputMode,
    } = this.state;
    let profile;
    // let validationResult = null;
    let validationResultRDFShape = null;
    try {
      profile = (await schemasProvider()).find((schema) => schema.name === schemaKey);
      const rdfContent = (inputMode === 'code') ? rawCode : (await scraper(inputUrl));
      // validationResult = await ShexjsValidate(profile.content, rawCode);
      validationResultRDFShape = await validate(profile.content, rdfContent);
    } catch (ex) {
      console.error(ex);
      this.setState({ error: 'Problem with parsing the Bioschemas profile.', errorDetails: ex });
    }
    this.setState({ /*validationResult,*/ validationResultRDFShape });
  };

  render() {
    const {
      schemaKey, rawCode, /*validationResult,*/ validationResultRDFShape, error, errorDetails,
      inputUrl, inputMode, showSchemaPreview,
    } = this.state;
    const isSchemaSelected = (schemaKey === null) || !rawCode;
    const validateBtn = (<Button onClick={this.runValidation} disabled={isSchemaSelected} size="lg">Validate</Button>);

    return (
      <Container>
        <ErrorWindow
          show={!!error}
          title={error}
          message={errorDetails}
          onHide={this.onErrorHidden}
        />
        <SchemaPreviewModal
          show={showSchemaPreview}
          schemaKey={schemaKey}
          onHide={this.onSchemaPreviewHidden}
        />
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
          <Col xs="auto" className="pr-1">
            <SchemaPreviewButton disabled={isSchemaSelected} onClick={this.onSchemaPreviewShown} />
          </Col>
          <Col className="pl-1">
            <SchemaSelect onChange={this.schemaSelectionChange} validateButton={validateBtn} />
          </Col>
          {/*<Col xs={12}><ShexjsResultsPanel validationResult={validationResult} /></Col>*/}
          <Col xs={12}><RDFShapeResults validationResult={validationResultRDFShape} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
