const fs = require('fs')
const config = require('./src/config')
fs.writeFileSync('./public/config.js','window.config='+JSON.stringify(config,null,2),{'flag':'w'})

module.exports = {
  lintOnSave: undefined,
  productionSourceMap: process.env.NODE_ENV==='development',
  publicPath: process.env.VUE_APP_BASE_URL
}
