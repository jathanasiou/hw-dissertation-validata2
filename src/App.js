import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/eclipse.css';
import InputResource from './components/inputResource';
import ResultsPanel from './components/resultsPanel';
// import logo from './logo.svg';

function App() {
  return (
    <Container>
      <h1>Validata 2 validator tool</h1>
      <Row>
        <InputResource />
      </Row>
      <Row className="justify-content-end">
        <Col xs="auto"><Button size="lg">Validate</Button></Col>
      </Row>
      <Row className="justify-content-end">
        <Col xs={6}>
          <ResultsPanel />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
