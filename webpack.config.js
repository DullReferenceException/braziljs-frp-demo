var webpack = require('webpack');

module.exports = {
  entry: {
    'presentation-client': './src/presentation-client/index.jsx',
    'game-client': './src/game-client/index.jsx'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          optional: ['runtime']
        }
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
  ],
  output: {
    filename: './src/[name]/static/js/app.js'
  }
};
