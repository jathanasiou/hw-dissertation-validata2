import shex from 'shex';
import * as n3 from 'n3';


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
    const triples = await parseData(data);
    const validator = shex.Validator.construct(parsedSchema);
    const shape = shex.Validator.start;
    result = validator.validate(shex.Util.makeN3DB(triples), 'http://hl7.org/ObservationShapeSOMEDOMAIN', shape);
  }
  return result;
};


export default runValidation;
