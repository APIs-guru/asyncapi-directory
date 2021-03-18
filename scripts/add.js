'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

const list = yaml.safeLoad(fs.readFileSync('./docs/_data/metadata.yaml'),'utf8');

const provider = process.argv[2];
const service = process.argv[3];
const url = process.argv[4];

if (!list[provider]) list[provider] = {};
list[provider][service] = { origin: url, stub: false };

if (url) {
  fs.writeFileSync('./docs/_data/metadata.yaml',yaml.safeDump(list),'utf8');
}
