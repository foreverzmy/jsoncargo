const { execSync } = require('node:child_process');
const ghpages = require('gh-pages');

execSync('cd docs && npm run build');
console.log('build docs success.');

ghpages.publish('docs/doc_build', { cname: 'jsoncargo.foreverz.cn' }, (err) => {
  if (err) {
    throw err;
  }
  console.log('publish success.');
});
