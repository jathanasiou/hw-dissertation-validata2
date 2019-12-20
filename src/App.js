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


const jsonldToolExample = `
PREFIX : <http://hl7.org/fhir/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

<Obs1>
  :status    "final" ;
  :subject   <Patient2> .

<Patient2>
  :name "Bob" ;
  :birthdate "1999-12-31T01:23:45"^^xsd:dateTime .
`;


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
