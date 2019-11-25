import shex from 'shex';

let shexc; // ShEx schema file
let data; // Turtle file
let node; // name of the Node/Graph to validate


shex.Loader.load([shexc], [], [data], []).then((loaded) => {
  const db = shex.Util.makeN3DB(loaded.data);
  const validator = shex.Validator.construct(loaded.schema, { results: 'api' });
  const result = validator.validate(db, [{ node, shape: shex.Validator.start }]);
  console.log(result);
});

export default {};
