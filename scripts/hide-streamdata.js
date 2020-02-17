'use strict';

const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');
const readfiles = require('node-readfiles');
let metadata;

async function main() {
    metadata = yaml.safeLoad(fs.readFileSync('docs/_data/metadata.yaml',{json:true}));
    for (let dir in metadata) {
      for (let title in metadata[dir]) {
        let aa = metadata[dir][title];
        if (aa.origin && aa.origin.indexOf('streamdata')>=0) {
            console.log(aa.origin);
            aa.stub = true;
        }
      }
    }
}

main()
.then(function(options){
    fs.writeFileSync('docs/_data/metadata.yaml',yaml.safeDump(metadata),'utf8');
    process.exitCode = 0;
})
.catch(function(err){
    console.warn(err.message);
});
