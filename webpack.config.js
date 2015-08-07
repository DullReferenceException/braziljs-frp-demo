module.exports = {
  entry: {
    admin: './src/admin/client/index.jsx',
    user: './src/user/client/index.jsx'
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
  output: {
    filename: './src/[name]/client/static/js/app.js'
  }
};
