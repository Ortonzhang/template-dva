const path = require('path');
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('package.json'))

console.log(`${packageJson.name}`)

export default {
  define: {
    "process.env": {},
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.API_ENV": process.env.API_ENV,
    "process.env.PROJECT_NAME": `${packageJson.name}`,
  },
  extraBabelPlugins: [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  proxy: {
    "/contract": {
      "target": "http://192.168.49.141:6221",
      "changeOrigin": true
    }
  },
  alias: {
    "config": path.resolve(__dirname, './src/utils/config.js'),
    "@": path.resolve(__dirname, './src'),
  },
  publicPath: process.env.API_ENV === 'production' ? `//s1.mljr.com/${packageJson.name}` : process.env.API_ENV === 'testing' ? './' : '/',
  outputPath: `./dist/${packageJson.name}`,
  html: {
    template: './src/index.ejs',
  },
  hash: true,
  env: {
    "development": {
        "extraBabelPlugins": [
            "dva-hmr"
        ]
    }
  }
}
