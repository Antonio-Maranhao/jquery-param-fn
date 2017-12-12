const queryParams = require("../index");
const $ = require('jquery');

function testQueryParams(inputList) {
  inputList.forEach((el) => {
    expect(queryParams(el)).toBe($.param(el));
  });
}

describe('queryParams', () => {

  it('works with empty values', () => {
    const testData = ['', {}, []];
    testQueryParams(testData);
  });

  it('works with basic types', () => {
    const testData = ['abc', 123, 456.789, true, false];
    testQueryParams(testData);
  });

  it('works with special characters', () => {
    const testData = [
      { a: 'abc def!#$%ˆ&*+-=', b: 'XYZ' }
    ];
    testQueryParams(testData);
  });

  it('works with simple arrays', () => {
    const testData = [
        [
          { name: 'prop1', value: 'value1' },
          { name: 'prop2', value: 'value!@#$%ˆ&*()-+_="\'' },
          { name: 'prop3', value: 123 },
          { name: 'prop4', value: true },
          { name: 'prop5', value: false }
        ]
    ];
    testQueryParams(testData);
  });

  it('works with arrays with objects', () => {
    const testData = [
      [
        { name: 'prop1', value: { a: 123, b: 'abc' } },
        { name: 'prop2', value: { a2: { x: 456, y: 'def' }, b2: 'abc' } }
      ],
      [
        { name: 'prop1', value: {} },
        { name: 'prop2', value: { a2: null } },
        { name: 'prop3', value: { a2: undefined } }
      ]
    ];
    testQueryParams(testData);
  });

  it.only('works with simple objects', () => {
    const testData = [
      { a: 'abc', b: 'def' },
      { a: 123, b: 'abc', c: true, d: false },
      { a: null, b: undefined },
      { a: JSON.stringify('_design/app'), b: JSON.stringify('_design/app\u9999'), c: 30 }
    ];
    testQueryParams(testData);
  });

  it('works with objects with arrays', () => {
    const testData = [
      {
        arr1: [1, 2, 3],
        arr2: ['a', 'b', 'c'],
        arr3: [true, false]
      },
      { arr1: [1, undefined, 'b'] }
    ];
    testQueryParams(testData);
  });

  it('works with nested objects', () => {
    const testData = [
      {
        obj1: { x: 'abc', y: 123, z: true, w: false },
        obj2: {
          sub_obj1: { X: 'def', Y: 456, Z: true, W: false },
          sub_obj2: { X2: 'def', Y2: 456, Z2: false, W2: true },
        }
      },
      {
        obj1: { x: [1, 2, 4], y: { a: 'abc', b: 123, c: true } },
        arr1: [
          { X: 'def', Y: 456, Z: true, W: false },
          { X2: 'def', Y2: 456, Z2: false, W2: true },
        ]
      }
    ];
    testQueryParams(testData);
  });
});
