# ember-cli-fastboot-transform

This is a simple Ember-CLI transform that will wrap an import in a FastBoot check:
```
if (typeof FastBoot === 'undefined') {
  <your imported module>
}
```

This is very helpful if you want to call `app.import` for a module that has browser-only functionality.

For example, say you have a test suite that needs to use `ember-template-compiler`.  Unfortunately, this library will not work in FastBoot since it has a dependency on `document`.  However, most likely you only want it running inside the browser for the test suite, so you can use this transform:

```
const environment = EmberApp.env();
const isTest = environment === 'test';

if (isTest) {
  app.import('vendor/ember/ember-template-compiler.js', {
    using: [{ transformation: 'fastboot' }]
  });
}
```

This also could be used for imports that depend on jQuery, or any other import that you would want wrapped in a FastBoot check.
