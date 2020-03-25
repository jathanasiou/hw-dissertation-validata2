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
import { parseJsonld, validate } from './utils/validationHelper';
import schemasProvider from './schemas';
import { jsonldScraper as scraper } from './utils/webScraper';


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
      rdfCode: '',
      error: null,
      errorDetails: null,
    };
  }

  componentDidMount() {
    const { rdfCode } = this.state;
    this.refreshRDFNodes(rdfCode);
    schemasProvider().then((schemas) => {
      this.setState({ schemas });
    });
  }

  onCrawlURL = async (url) => {
    try {
      this.setState({ isCrawling: true });
      const rdfCode = await scraper(url);
      this.setState({ isCrawling: false });
      this.codeChange(rdfCode);
    } catch (error) {
      console.error(error);
      this.setState({
        isCrawling: false,
        error: 'Invalid Data resource',
        errorDetails: error.toString(),
      });
    }
  };

  refreshRDFNodes = async (code) => {
    try {
      const rdfNodes = await parseJsonld(code);
      this.setState({ rdfNodes });
    } catch (err) {
      // console.error(err);
      this.setState({ rdfNodes: [] });
    }
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
        ? SHAPE_TYPES.map((type) => `<${schemaSelection.value}${type}>`)
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
        node: `${rdfNodeSelection.value}`,
        shape: `${shapeSelection.value}`,
      });
      if (validationResultRDFShape.message.startsWith('Error:')) throw validationResultRDFShape.message;
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

    const schemasOptions = schemas.map((schema) => ({ label: schema.name, value: schema.name }));
    const shapesOptions = shapes.map((shape) => ({ label: shape, value: shape }));
    const nodesOptions = rdfNodes.map((node) => ({ label: node, value: node }));

    const nodesSelectPlaceholder = nodesOptions.length ? 'Select a Node to validate' : 'Invalid Data';

    const validateBtnEnabled = (isSchemaSelected && isNodeSelected && isShapeSelected
      && !isCrawling);
    const nodesSelectDisabled = !nodesOptions.length || isCrawling;

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
          <Col xs="6">
            <h3>Made by:</h3>
            <ul>
              <li>John Athanasiou (Author) - ia50 [at] hw [dot] ac [dot] uk</li>
              <li>Dr. Alasdair Gray (MSc project supervisor) - A.J.G.Gray [at] hw [dot] ac [dot] uk</li>
            </ul>
          </Col>
          <Col xs="6">
            <h3>Source code</h3>
            <div>
              {'Hosted on '}
              <a href="https://github.com/jathanasiou/hw-dissertation-validata2">Github</a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <InputResource
              rdfCode={rdfCode}
              loading={isCrawling}
              onCodeChange={this.codeChange}
              onLoad={this.onCrawlURL}
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
