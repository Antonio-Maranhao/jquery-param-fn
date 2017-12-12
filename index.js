"use strict";

function queryParams(obj) {
  if (Array.isArray(obj)) {
    //JQuery expects array elements to be {name: <name>, value: <value>}
    //so we convert the array into an object so the rest of the logic
    //remains the same
    obj = obj.reduce(function (acc, elem) {
      if (elem && elem.name) {
        if (typeof elem.value === 'object') {
          //JQuery uses the result of toString() (e.g. '[object Object]') when value is an object
          acc[elem.name] = elem.value.toString();
        } else {
          acc[elem.name] = elem.value;
        }
      }
      return acc;
    }, {});
  } else if (typeof obj === 'string') {
    //JQuery treats a string as an array of chars, so
    //we map it to an object where fields are the array
    //indexes
    obj = obj.split('').reduce((acc, el, idx) => {
      acc[idx] = el; return acc;
    }, {});
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    return '';
  }

  // Converts an object or array into an a list of query params
  const objectToListOfParams = function(obj, prefix) {
    return Object.keys(obj).map((key) => {
      let value = obj[key];
      if (prefix) {
        //Properties of inner objects are surrounded with []
        key = encodeURIComponent('[' + key + ']');
      }
      if (value === undefined || value === null) {
        return prefix + key + '=';
      } else if (Array.isArray(value)) {
        const newPrefix = prefix + key;
        const innerParams = value.map((innerElem, idx) => {
          const asObj = {};
          if (typeof innerElem === 'object' || Array.isArray(innerElem)) {
            asObj[idx] = innerElem;
          } else {
            // If it's a basic value (string, number, etc) use empty key
            asObj[''] = innerElem;
          }
          const elemParams = objectToListOfParams(asObj, newPrefix);

          return elemParams.join('&');
        });
        return innerParams.join('&');
      } else if (typeof value === 'object') {
        const newPrefix = prefix + key;
        const innerObjParams = objectToListOfParams(value, newPrefix);
        return innerObjParams.join('&');
      } else {
        value = encodeURIComponent(value);
        return prefix + key + '=' + value;
      }
    });
  };
  return objectToListOfParams(obj, '').join('&');
}

module.exports = queryParams;