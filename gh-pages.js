const ghpages = require('gh-pages');

ghpages.publish('docs/doc_build', { cname: 'jsoncargo.foreverz.cn' }, console.error);
