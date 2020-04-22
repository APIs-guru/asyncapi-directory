#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const fetch = require('node-fetch');
const liquid = require('liquid-node');
const yaml = require('js-yaml');
const recurse = require('reftools/lib/recurse').recurse;
const jptr = require('reftools/lib/jptr').jptr;
const engine = new liquid.Engine();
const docs = require('asyncapi-docgen');
const Generator = require('@asyncapi/generator');
const doc2 = new Generator('@asyncapi/html-template', path.resolve(__dirname, 'docs', 'html'), {
  output: 'fs',
  forceWrite: true,
  templateParams: {
    sidebarOrganization: 'byTags'
  }
});

const metadata = yaml.safeLoad(fs.readFileSync('./docs/_data/metadata.yaml','utf8'),{json:true});
const templateStr = fs.readFileSync('./templates/api.liquid.md','utf8');

engine.registerFilters({
  "url_encode": function(input) {
    return encodeURIComponent(input);
  }
});

function fixStr(str) {
    str = str.split('\r\n').join('\n').split('\r').join('').split('---').join('###');
    return str;
}

function fixApi(api) {
    if (api.version && !api.asyncapi) {
        api.asyncapi = api.version;
        delete api.version;
    }
    if (api.info.version === '1.2.0') api.info.version = '1.0.0';
    recurse(api,{},function(obj,key,state){
        if (key === 'asyncapi_servers_variables') {
            obj.variables = obj[key];
            delete obj[key];
        }
        else if (key === '$ref') {
            if (obj[key].startsWith('#/components/')) {
                const found = jptr(api,obj[key]);
                if (found === false) {
                    console.warn('Not found',obj[key]);
                    jptr(api,obj[key],{});
                }
            }
        }
    });
    return api;
}

async function main() {
    return new Promise(async function(resolve,reject){
        for (let api in metadata) {
            console.log(api);
            for (let service in metadata[api]) {
                console.log('  ',service,metadata[api][service].origin);
		        try {
		            const res = await fetch(metadata[api][service].origin);
                    let str = await res.text();
                    str = fixStr(str);
                    let obj = yaml.safeLoad(str,{json:true});
                    obj = fixApi(obj);
                    str = yaml.safeDump(obj);
                    let info;
                    if (obj && obj.asyncapi && obj.info && obj.info.version) {
                        info = obj.info;
                        console.log('   @v'+info.version,info.title);
                        const filename = api + (service === 'default' ? '' : '+'+service) + '@v' + info.version;

                        fs.writeFile('./docs/APIs/'+filename+'.yaml',yaml.safeDump(obj),'utf8',function(err){ if (err) console.warn(err.message) });

                        const header = { slug: filename, name: info.title, service: service, alpha: filename[0], layout: 'default', origin: metadata[api][service].origin, info: info, termsOfService: obj.termsOfService||'', externalDocs: obj.externalDocs||{}, stub: metadata[api][service].stub || false };
                        const markdown = await engine.parseAndRender(templateStr, header);
                        const output = '---\n'+yaml.dump(header)+'\n---\n'+markdown;
                        fs.writeFile('./docs/_APIs/'+filename+'.md',output,'utf8',function(err){ if (err) console.warn(err.message) });

                        try {
                            let html;
                            if (obj.asyncapi.startsWith('1.')) {
                                html = await docs.generateFullHTML(str);
                                html = html.replace('main.css','main1.css');
                                fs.writeFile('./docs/html/'+filename+'.html',html,'utf8',function(err){ if (err) console.warn(err.message) });
                            }
                            else if (obj.asyncapi.startsWith('2.')) {
                                await doc2.generateFromString(str);
                                fs.renameFileSync('./docs/html/index.html','./docs/html/'+filename+'.html');
                            }
                        }
                        catch (ex) {
                            console.warn('docs',ex.message||ex);
                        }
                    }
                    else console.warn(util.inspect(obj));
                }
                catch (ex) {
                    console.warn(ex);
                }
            }
        }
	    resolve(metadata);
    });
}

console.log('Starting...');
console.log('Entries in metadata.yaml:',Object.keys(metadata).length);
main().then(function(){
  console.log('Finishing...');
});
