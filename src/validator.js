import { ElixirValidator } from 'elixir-jsonschema-validator';

// const jsonSchema = {
//   $schema: 'http://json-schema.org/draft-07/schema#',
//   type: 'object',
//   properties: {
//     alias: {
//       description: 'A sample unique identifier in a submission.',
//       type: 'string',
//     },
//   },
//   required: ['alias'],
// };

// const jsonObj = { alias: 'MTB1' };

const validator = new ElixirValidator();
// const { validate } = validator;

// validator.validate(jsonSchema, jsonObj).then((validationResult) => {
//   console.log(validationResult.validationState);
//   for (const errors of validationResult.validationErrors) {
//     console.log(errors.userFriendlyMessage);
//   }
// });

export default validator;
