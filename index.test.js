'use strict';

const api = require('./index');
const { strictEqual } = require('assert');

describe('v8 natives api', () => {
  it('exposes natives methods', () => {
    /* eslint-disable-next-line no-sparse-arrays */
    strictEqual(api.HasHoleyElements([1, 2, ,, 3]), true);
    strictEqual(api.HasHoleyElements([1, 2, 3]), false);
  });
});