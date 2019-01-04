'use strict';

const someTruthy = (arr) => arr.some(x => x);

const empty = (arr) => arr.length === 0;

const count = (arr) => {
  let source = arr.slice();
  let result = [];
  while (!empty(source)) {
    let elem = source.pop();
    let count = 1;
    let index = 0;
    while (index < source.length) {
      if (source[index] == elem) {
        count += 1;
        source.splice(index, 1);
      } else {
        index += 1;
      }
    }
    result.push([elem, count]);
  }
  return result;
};

const sum = (arr) => {
  return arr.reduce((e, s) => e + s, 0);
};

const ArrayUtil = Object.freeze({
  someTruthy: someTruthy,
  empty: empty,
  count: count,
  sum: sum,
});

module.exports = ArrayUtil;
