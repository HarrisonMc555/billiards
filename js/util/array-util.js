const someTruthy = (arr) => arr.some(x => x);

const ArrayUtil = Object.freeze({
  someTruthy: someTruthy,
});

module.exports = ArrayUtil;
