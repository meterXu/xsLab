const fs = require('fs')
const config = require('./src/config')
fs.writeFileSync('./public/config.js','window.config='+JSON.stringify(config,null,2),{'flag':'w'})

module.exports = {
  lintOnSave: undefined,
  productionSourceMap: true,
  publicPath: './',
}
