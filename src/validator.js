import shex from 'shex';
import * as n3 from 'n3';

const schemaObservation = `PREFIX : <http://hl7.org/fhir/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

start = @<ObservationShape>

<ObservationShape> {               # An Observation has:
  :status ["preliminary" "final"]; #   status in this value set
  :subject @<PatientShape>         #   a subject matching <PatientShape>.
}

<PatientShape> {                   # A Patient has:
 :name xsd:string*;                #   one or more names
 :birthdate xsd:date?              #   and an optional birthdate.
}
`;

const schemaDataset = `PREFIX schema: <http://schema.org/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
    <URL> 
      xsd:string OR IRI
    
start = @<DatasetMinimum>

<DatasetMinimum> {
  rdf:type [schema:Dataset] ;
  schema:description xsd:string  ;
  schema:identifier xsd:string OR @<URL> OR {a [schema:PropertyValue]} OR IRI + ;
  schema:keywords xsd:string + ;
  schema:name xsd:string  ;
  schema:url @<URL>  ;
}

<DatasetRecommended> {
  rdf:type [schema:Dataset] ;
  schema:citation xsd:string OR {a [schema:CreativeWork]} OR IRI * ;
  schema:creator  @<OrganizationOrPerson> OR IRI * ;
  schema:distribution  {a [schema:DataDownload]} OR IRI ? ;
  schema:includedInDataCatalog  {a [schema:DataCatalog]} OR IRI * ;
  schema:license @<URL> OR {a [schema:CreativeWork]} OR IRI ? ;
  schema:measurementTechnique xsd:string OR @<URL> * ;
  schema:variableMeasured xsd:string OR {a [schema:PropertyValue]} OR IRI * ;
  schema:version xsd:double OR xsd:string ? ;
}

<DatasetOptional> {
  rdf:type [schema:Dataset] ;
}

<OrganizationOrPerson>{
  rdf:type [ schema:Organization schema:Person]
}
`;

const dataObservationGood = `PREFIX : <http://hl7.org/fhir/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

<Obs1>
  :status    "final" ;
  :subject   <Patient2> .

<Patient2>
  :name "Bob" ;
  :birthdate "1999-12-31"^^xsd:date .
`;
const dataObservationBad = `PREFIX : <http://hl7.org/fhir/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

<Obs1>
  :status    "final" .

<Patient2>
  :name "Bob" ;
  :birthdate "1999-12-31"^^xsd:date .
`;

const dataDataset = `<https://disprot.org/> a <https://schema.org/DataCatalog>;
  <https://schema.org/citation> <https://doi.org/10.1093/nar/gkz975>;
  <https://schema.org/dataset> <https://disprot.org/#2019_09>;
  <https://schema.org/dateModified> "2019-09";
  <https://schema.org/datePublished> "2019-09";
  <https://schema.org/description> "DisProt is a database of intrinsically disordered proteins. Disordered regions are manually curated from literature. DisProt annotations cover both structural and functional aspects of disorder detected by specific experimental methods. Annotation concepts and detection methods are encoded in the Disorder Ontology.";
  <https://schema.org/encodingFormat> "text/html";
  <https://schema.org/identifier> "https://www.ebi.ac.uk/miriam/main/datatypes/MIR:00000199";
  <https://schema.org/keywords> "DisProt", "IDP", "IDPs", "intrinsic protein disorder",
    "protein annotation", "protein disorder";
  <https://schema.org/license> <https://www.disprot.org/licence>;
  <https://schema.org/name> "DisProt, The database of intrinsically disordered proteins";
  <https://schema.org/provider> _:genid-1eb1215b98a644a1be226e4a87c62643-782A6FD92A5630D1865BF0DD162D8D56 .

_:genid-1eb1215b98a644a1be226e4a87c62643-782A6FD92A5630D1865BF0DD162D8D56 a <https://schema.org/Person>;
  <https://schema.org/email> "silvio.tosatto@unipd.it";
  <https://schema.org/name> "Silvio Tosatto" .

<https://disprot.org/> <https://schema.org/sourceOrganization> <http://protein.bio.unipd.it#O>;
  <https://schema.org/url> <https://disprot.org> .

<https://doi.org/10.1093/nar/gkz975> a <https://schema.org/ScholarlyArticle>;
  <https://schema.org/name> "DisProt: intrinsic protein disorder annotation in 2020";
  <https://schema.org/sameAs> <https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gkz975/5622715>,
    <https://www.ncbi.nlm.nih.gov/pubmed/31612960>;
  <https://schema.org/url> <https://doi.org/10.1093/nar/gkz975> .

<https://disprot.org/#2019_09> a <https://schema.org/Dataset>;
  <https://schema.org/creator> <http://protein.bio.unipd.it#O>;
  <https://schema.org/description> "DisProt is a database of intrinsically disordered proteins. Disordered regions are manually curated from literature. DisProt annotations cover both structural and functional aspects of disorder detected by specific experimental methods. Annotation concepts and detection methods are encoded in the Disorder Ontology.";
  <https://schema.org/identifier> "https://www.ebi.ac.uk/miriam/main/datatypes/MIR:00000199";
  <https://schema.org/includedInDataCatalog> <https://disprot.org>;
  <https://schema.org/keywords> "DisProt", "IDP", "IDPs", "intrinsic protein disorder",
    "manually curated", "protein annotation", "protein disorder";
  <https://schema.org/license> <https://www.disprot.org/licence>;
  <https://schema.org/name> "DisProt";
  <https://schema.org/url> <https://disprot.org>;
  <https://schema.org/version> "2019-09" .

<http://protein.bio.unipd.it#O> a <https://schema.org/Organization>;
  <https://schema.org/name> "University of Padua, Department of Biomedical Sciences, BioComputing UP";
  <https://schema.org/url> <http://protein.bio.unipd.it> .

<https://www.disprot.org/licence> a <https://schema.org/CreativeWork>;
  <https://schema.org/name> "Creative Commons CC4 Attribution";
  <https://schema.org/url> <https://creativecommons.org/licenses/by/4.0> .

<https://www.disprot.org/> <http://purl.org/dc/terms/title> "DisProt";
  <http://vocab.sindice.net/any23#viewport> "width=device-width, initial-scale=1";
  <http://www.w3.org/1999/xhtml/vocab#icon> <https://www.disprot.org/favicon.ico>;
  <http://www.w3.org/1999/xhtml/vocab#stylesheet> <https://www.disprot.org/styles.b68c2d74e499801049f1.css> .
`;

let Schema;
let Triples;

// documentation saying Parser(<iri>) is wrong...
const parseSchema = (schemaURI, schemaContent) => shex.Parser
  .construct(schemaURI).parse(schemaContent);

const parseN3Data = (inputData) => new Promise((resolve, reject) => {
  const db = n3.Store();
  n3.Parser({ baseIRI: '' }).parse(inputData, (error, triple, prefixes) => {
    if (error) {
      reject(error);
    } else if (triple) {
      // console.log('triple added ', triple);
      db.addTriple(triple);
    } else {
      resolve(db);
    }
  });
});

const isJSON = (str) => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};

// load the data
const parseData = async (inputData) => {
  const turtledata = '';
  return parseN3Data(inputData, turtledata, {});

  // json-ld Approach
  // if (isJSON(dataText)) {
  //   console.log('json-ld passed to shex-validator');
  //   const doc = JSON.parse(dataText);
  //   jsld.toRDF(doc, { format: 'application/nquads' }, (err, nquads) => {
  //     console.log(nquads);
  //     console.log(err);
  //     turtledata = nquads;
  //     inputData = nquads;
  //     parseN3Data(inputData, turtledata, db, {}, resolve, reject);
  //   });
  // }
  // let triples;
  // // new missing in documentation
  // const db = new n3.Store();
  // try {
  //   // new missing in documentation
  //   triples = (new n3.Parser({ baseIRI: dataURI, format: 'text/turtle' }))
  //     .parse(turtleData, (error, parsed, prefixes) => parsed);
  // } catch (e) {
  //   console.error(e);
  //   // throw Error(`error parsing ${dataURI}:`, e);
  // }
  // console.log('triples', triples);
  // console.log(db);
  // db.addTriple(triples);
  // return db;
};


// Schema = parseSchema('www.somedomain.com/schema/dataset', schemaDataset);
// todo try with new func definition
// Triples = parseData(dataObservationBad);

const runValidation = async (schema, data) => {
  let result;
  if (schema && data) {
    const parsedSchema = parseSchema('', schema);
    console.log(parsedSchema);
    const triples = await parseData(data);
    const validator = shex.Validator.construct(parsedSchema);
    const shape = shex.Validator.start;
    console.log(shape);
    result = validator.validate(shex.Util.makeN3DB(triples), 'http://hl7.org/ObservationShapeSOMEDOMAIN', shape);
  }
  console.log(result);
  return result;
};

  runValidation(schemaObservation, dataObservationGood);
  runValidation(schemaDataset, dataDataset);

export default runValidation;
