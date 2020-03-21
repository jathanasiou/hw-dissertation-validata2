import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import Octicon, { Beaker, ArrowBoth } from '@primer/octicons-react';
import InputResource from './components/inputResource';
import RDFShapeResults from './components/RDFShapeResults';
import CardGroup from './components/CardControlGroup';
import Selector from './components/Selector';
import SchemaPreviewButton from './components/schemaPreviewButton';
import SchemaPreviewModal from './components/schemaPreviewModal';
import ErrorWindow from './components/errorWindow';
import { parseTurtle, validate } from './utils/validationHelper';
import schemasProvider from './schemas';
import scraper from './utils/webScraper';


const datasetExample = `\
<genid-c7a50d6e828f4595a195f9c67304f6d2-0AE87CB066C8D9CD43117E0C5A3090F0> a <http://schema.org/Dataset>;
  <http://schema.org/description> "The GeneChip® Drosophila Genome Array is a microarray tool for studying expression of Drosophila melanogaster transcripts.";
  <http://schema.org/identifier> "http://www.affymetrix.com/products/arrays/specific/fly.affx";
  <http://schema.org/name> "Affymetrix array: GeneChip Drosophila Genome 2.0 Array";
  <http://schema.org/keywords> "buzzword";
  <http://schema.org/url> <https://www.flymine.org/flymine/dataset> .
`;

const SHAPE_TYPES = ['Minimum', 'Recommended', 'Optional'];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: [],
      shapeSelection: null,
      schemas: [],
      schemaSelection: null,
      isCrawling: false,
      rdfNodes: [],
      rdfNodeSelection: null,
      validationResultRDFShape: null,
      showSchemaPreview: false,
      rdfCode: datasetExample,
      error: null,
      errorDetails: null,
    };
  }

  componentDidMount() {
    parseTurtle(datasetExample).then((nodes) => {
      this.setState({ rdfNodes: nodes });
    });
    schemasProvider().then((schemas) => {
      this.setState({ schemas });
    });
  }

  crawlURL = async (url) => {
    try {
      this.setState({ isCrawling: true });
      const rdfCode = await scraper(url);
      this.setState({ isCrawling: false, rdfCode });
      this.refreshRDFNodes(rdfCode);
    } catch (error) {
      this.setState({
        isCrawling: false,
        error: 'Invalid Data resource',
        errorDetails: error.toString(),
      });
      console.error(error);
    }
  };

  refreshRDFNodes = (code) => {
    parseTurtle(code)
      .then((nodes) => {
        this.setState({ rdfNodes: nodes });
      })
      .catch((err) => {
        // error because of invalid code
        this.setState({ rdfNodes: [] });
      });
  };

  codeChange = (code) => {
    this.setState({
      rdfCode: code,
      rdfNodeSelection: null,
    });
    this.refreshRDFNodes(code);
  };

  schemaSelectionChange = (schemaSelection) => {
    this.setState({
      schemaSelection: schemaSelection || null,
      shapes: (schemaSelection)
        ? SHAPE_TYPES.map((type) => `${schemaSelection.value}${type}`)
        : [],
      shapeSelection: null,
    });
  };

  nodeSelectionChange = (rdfNodeSelection) => {
    this.setState({ rdfNodeSelection });
  };

  shapeSelectionChange = (shapeSelection) => {
    this.setState({ shapeSelection });
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
      schemas, schemaSelection, rdfCode, rdfNodeSelection, shapeSelection,
    } = this.state;
    let validationResultRDFShape = null;
    try {
      // TODO: crawl web resource before validation
      const profile = (schemas).find((schema) => schema.name === schemaSelection.value);
      validationResultRDFShape = await validate({
        schema: profile.content,
        rdf: rdfCode,
        node: `<${rdfNodeSelection.value}>`,
        shape: `<${shapeSelection.value}>`,
      });
    } catch (ex) {
      console.error(ex);
      this.setState({
        error: 'Problem with parsing the Bioschemas profile.',
        errorDetails: ex,
      });
      return;
    }
    this.setState({ validationResultRDFShape });
  };

  render() {
    const {
      isCrawling, rdfCode, validationResultRDFShape, error, errorDetails, showSchemaPreview,
      schemas, schemaSelection,
      shapes, shapeSelection,
      rdfNodes, rdfNodeSelection,
    } = this.state;
    const isSchemaSelected = (schemaSelection !== null);
    const isShapeSelected = (shapeSelection !== null);
    const isNodeSelected = (rdfNodeSelection !== null);

    const validateBtnEnabled = (isSchemaSelected && isNodeSelected && isShapeSelected);

    const schemasOptions = schemas.map((schema) => ({ label: schema.name, value: schema.name }));
    const shapesOptions = shapes.map((shape) => ({ label: shape, value: shape }));
    const nodesOptions = rdfNodes.map((node) => ({ label: node, value: node }));
    const nodesSelectPlaceholder = nodesOptions.length ? 'Select a Node to validate' : 'INVALID SOURCE';
    const nodesSelectDisabled = !nodesOptions.length;

    const validateBtn = (<Button onClick={this.runValidation} disabled={!validateBtnEnabled} size="lg">Validate</Button>);

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
          schemaKey={(schemaSelection) ? schemaSelection.value : null}
          onHide={this.onSchemaPreviewHidden}
        />
        <h1>Validata2 Validator tool</h1>
        <Row>
          <Col xs="12">
            <InputResource
              rdfCode={rdfCode}
              loading={isCrawling}
              onCodeChange={this.codeChange}
              onLoad={this.crawlURL}
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <CardGroup header="2. Bioschemas Profile" bodyTitle="Select validation parameters" icon={Beaker}>
              <div>
                <Row className="pb-2">
                  <Col>
                    <Selector options={schemasOptions} onChange={this.schemaSelectionChange} placeholder="Select a Profile" value={schemaSelection} />
                  </Col>
                  <Col xs="auto" className="pl-1">
                    <SchemaPreviewButton
                      disabled={!isSchemaSelected}
                      onClick={this.onSchemaPreviewShown}
                    />
                  </Col>
                </Row>
                <Row className="justify-content-end">
                  <Col xs="12" md className="">
                    <Selector disabled={nodesSelectDisabled} options={nodesOptions} onChange={this.nodeSelectionChange} placeholder={nodesSelectPlaceholder} value={rdfNodeSelection} />
                  </Col>
                  <Col xs="auto" className="px-0 d-none d-md-block">
                    <Octicon className="h-100" size="medium" icon={ArrowBoth} />
                  </Col>
                  <Col xs="12" md className="pt-3 pt-md-0">
                    <Selector disabled={!isSchemaSelected} options={shapesOptions} onChange={this.shapeSelectionChange} placeholder="Select a Profile Shape to validate against" value={shapeSelection} />
                  </Col>
                  <Col xs="auto" className="pt-3 pt-md-0">{validateBtn}</Col>
                </Row>
              </div>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col><RDFShapeResults validationResult={validationResultRDFShape} /></Col>
        </Row>
      </Container>
    );
  }
}

export default App;
