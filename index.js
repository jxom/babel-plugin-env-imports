const path = require('path');
const fs = require('fs');
const glob = require('glob');

const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

module.exports = function () {
  return {
    pre(state) {
      this.extensions = state.opts.extensions || DEFAULT_EXTENSIONS;
    },
    visitor: {
      ImportDeclaration(p, state) {
        const extensionMap = state.opts.extensionMap || {};
        const env = (extensionMap[state.opts.env] || state.opts.env).toLowerCase();
      
        const pathnameArray = state.file.opts.filename.split('/');
        pathnameArray.pop();
        const directory = pathnameArray.join('/');
        const originalFilename = p.node.source.value;
        
        const extensionMatches = originalFilename.match(new RegExp(`\.(${DEFAULT_EXTENSIONS.join('|').replace(/\./g, '')})$`));
        let originalExtension = '';
        if (extensionMatches) {
          originalExtension = originalFilename.slice((extensionMatches || {}).index);
        }
        const originalModule = originalFilename.slice(0, (extensionMatches || {}).index);
        
        const targetModuleName = `${originalModule}.${env}`;
        const targetModulePath = path.join(directory, targetModuleName);
        if (doesFileExist(targetModulePath, { extensions: this.extensions })) {
          p.node.source.value = `${targetModuleName}${originalExtension}`;
        }
      }
    }
  };
}

function doesFileExist(targetModulePath, { extensions }) {
  return extensions.some(extension => fs.existsSync(`${targetModulePath}${extension}`));
}