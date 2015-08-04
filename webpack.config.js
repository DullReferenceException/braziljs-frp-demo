module.exports = {
  entry: './src/admin/client/index.jsx',
  output: {
    filename: './src/admin/client/static/js/app.js'
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
  }
};
