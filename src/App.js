import React from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import InputResource from './components/inputResource';
import ResultsPanel from './components/resultsPanel';
import SchemaSelect from './components/schemaSelector';
// import logo from './logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: null,
    };
  }

  schemaSelection = schema => {
    this.setState({
      schema: schema
    })
  }

  render() {
    const { schema } = this.state;
    const validateBtnDisabled = !schema;
    console.log(this.schemaSelection)

    return (
      <Container>
        <h1>Validata 2 validator tool</h1>
        <Row>
          <InputResource />
        </Row>
        <Row className="justify-content-between">
          <Col xs="6"><SchemaSelect onChange={this.schemaSelection} /></Col>
          <Col xs="auto"><Button disabled={validateBtnDisabled} size="lg">Validate</Button></Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs={6}>
            <ResultsPanel />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
