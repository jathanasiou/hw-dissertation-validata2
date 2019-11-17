const profiles = [];
const context = require.context('./', true, /\.json$/);
context.keys().forEach((key) => {
  profiles.push(context(key));
});


// temporary fix for {format: "text"} attributes
profiles.forEach((profile) => {
  if (!profile.definitions) return;
  Object.values(profile.definitions).forEach((definition) => {
    if (!definition) return;
    if (definition.format === 'text') {
      delete definition.format;
    }
  });
});


export default profiles;
