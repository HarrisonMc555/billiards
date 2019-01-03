const empty = (set) => set.size === 0;

const extend = (set, iterable) => iterable.forEach(value => set.add(value));

const SetUtil = Object.freeze({
  empty: empty,
  extend: extend,
});

module.exports = SetUtil;
