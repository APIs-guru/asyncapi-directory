'use strict';

const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');
const readfiles = require('node-readfiles');
let metadata;

async function main() {
    metadata = yaml.safeLoad(fs.readFileSync('docs/_data/metadata.yaml',{json:true}));
    const options = { filter: '**/*async.md', readContents: false };
    const files = await readfiles('../streamdata/_listings',options);
    console.log(files.length);
    for (let file of files) {
        const dir = path.dirname(file);
        const base = path.basename(file);
        const title = base.replace(dir+'-','').replace('-async.md','').replace('-stream','').replace('-api','');
        console.log(dir,base,title);
        const url = 'https://raw.githubusercontent.com/streamdata-gallery-master/asyncapi/master/_listings/'+file;
        if (!metadata[dir]) metadata[dir] = {};
        metadata[dir][title] = { origin: url };
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
