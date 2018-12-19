var ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = (config, { webpack }) => {
  if(process.env.API_ENV){
    config.plugins = [].concat(config.plugins.filter((item, index) => {
      if (item.constructor.name === 'ExtractTextPlugin') {
        item.filename = 'static/css/[name].[contenthash:8].css';
        item.options = { 
          allChunks: true,
        }
      }
      return item;
    }));
  

    config.module.rules = [].concat(config.module.rules.map((item) => {
      if (item.exclude && item.exclude[2]) {
          item.options = {
            name: 'static/images/[name].[hash:8].[ext]',
            limit: 100
          }
      }
      if (item.test && item.test.toString().includes('sass')) {
        item.use = ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1,modules: true } },
              'sass-loader'],
            fallback: 'style-loader',
            publicPath: '../../'
        })
      }
      return item
    }))
  
    config.output.filename = 'static/js/[name].[chunkhash].js';
    config.output.chunkFilename = 'static/js/[id].[chunkhash].js';
  }
  
  return config;
};