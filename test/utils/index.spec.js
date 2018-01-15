/* global it, describe, context */

const fs = require('fs');
const { expect } = require('chai');
const sinon = require('sinon');
const utils = require('../../src/utils');

describe('loadPackageJson', () => {
  context('success', () => {
    it('returns a string representation of package.json', () => {
      const packageJson = 'package.json contents';
      sinon.stub(utils, 'loadPackageJson').callsFake(() => packageJson);
      expect(utils.loadPackageJson()).to.eql('package.json contents');
      utils.loadPackageJson.restore();
    });
  });

  context('failure', () => {
    it('returns an empty object representation', () => {
      sinon.stub(fs, 'readFileSync').throws();
      expect(utils.loadPackageJson()).to.eql('{}');
      fs.readFileSync.restore();
    });
  });
});

describe('escapeTeamCityString', () => {
  it('returns empty strings', () => {
    expect(utils.escapeTeamCityString(null)).to.eql('');
  });

  it('replaces TeamCity special characters', () => {
    expect(utils.escapeTeamCityString("'\n\r\u0085\u2028\u2029|[]")).to.eql("|'|n|r|x|l|p|||[|]");
  });
});
