# Contributing Back

## Adding a library

The general idea is that a ["Stripe inspired"][stripe] login form will be created with various CSS in JS libraries. It's a simple example that demonstrates the stylistic differences between the different libraries effectively. Take a look at any of the other [examples][snippets], e.g. [styled-components][styled-components], for an example of the expected output and code style.

### Creating the library folder

In general, the process will look something like this:

- Create the folder `src/snippets/your-library`
- Create the file `src/index.js`
  - This file can import other files in this directory (e.g. `form.js`, `header.js`, etc.), as specified
- Each file must contain a `default` export that is a valid React component (stateless functional components work, as well)

### Creating the dynamic imports + import statement

Each libraries' code is loaded, on demand, via dynamic imports + Webpack. This occurs in [libraries.ts][libraries.ts].

To add your library, simply edit this file with the dynamic import. You will use the `matches` function, which uses a regular expression to detect the import statement in the code.

Consider the following example:

```javascript
const matches = matchesExpression.bind(undefined, code[defaultModule]);

if (matches('styled-components')) {
  return import('styled-components').then(({ default: styled, ...rest }) => ({
    styled,
    ...rest
  }));
}
```

All properties on the returned object will be made available to any file in `src/snippets/your-library`. If your library is distributed as ES2015 (e.g. with `export default`), you will want to make the default export available as the primary name of the library, e.g. in the above example we've made the default export of styled-components available as the property `styled`.

Additionally, you will want to add an import statement (as string) in [libraries.ts][libraries.ts]. This statement will be injected (as string) into any additional files created in the web app.

### Functional Requirements

- The code must run, without errors
- The form must contain an "email" and a "password" field
- The "submit" button must display an "active" state when the form is valid (i.e. both fields are non-empty)
- ES2015 is supported, however only features in the official specification (i.e. no state-0, stage-1, etc. presets are supported)
- Validate that no unit tests are failing (`yarn test` or `npm test`) after your changes

### Wrapping up

Once the code has been validated to run locally, you'll want to just create a PR against the [repo][repo], and it'll be reviewed/added as quickly as possible!

## Any other contributions

Other contributions (e.g. adding functionality, fixing any bugs, etc.) are more than welcome! Simply open a PR explaining what you're trying to do or fix, and it'll be reviewed as quickly as possible!

[stripe]: https://stripe.com/connect
[snippets]: ./src/snippets
[styled-components]: ./src/snippets/styled-components/index.js
[libraries.ts]: ./src/utils/libraries.ts
[repo]: https://github.com/dschau/css-in-js-playground
