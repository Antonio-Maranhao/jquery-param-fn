# jquery-param-fn
No dependencies alternative to the `jQuery.param()` function.

Creates a URL query string from an object or array. 

## Install

```shell
$ npm install jquery-param-fn --save
```

## Usage
```javascript
const param = require('jquery-param-fn');
const formData = { name: 'John Doe', age: 38 }; 
const queryString = param(formData); // name=John%20Doe&age=38

fetch('http://example.com?' + queryString).then(function(res) {
  ...
});
```

## Test

```shell
$ npm test
```
to check test coverage:
```shell
$ npm run test-coverage
```

## License
MIT