// the list of profile files, as static resources byndled by webpack
const context = require.context('./', true, /\.shex$/);

// deriving profile name from filename minus extension
const nameOf = (key) => key.match(/\w+/g)[0];

// returns promise of an object with profile's name, and its file's content
const keyToResourceItem = async (key) => ({
  name: nameOf(key),
  content: await fetch(context(key)),
});

let schemas = false;

export default async () => {
  if (!schemas) {
    schemas = await Promise.all(context.keys().map(keyToResourceItem));
  }
  return schemas;
};
