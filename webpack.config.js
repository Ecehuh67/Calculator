const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./src/index.tsx`,
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`, `.jsx`]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: `react`,
      ReactDOM: 'react-dom',
      // PropTypes: `prop-types`
    })
  ],
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    historyApiFallback: true,
    open: true,
    port: 1337
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`,
};
