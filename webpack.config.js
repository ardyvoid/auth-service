var path = require('path');
var nodeExternals = require('webpack-node-externals');
require('dotenv').config();

module.exports = {
    entry: './src/index',
    target: 'node',
    mode: process.env.NODE_ENV,
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'auth.bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.mjs', '.gql', '.graphql']
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          use: ["source-map-loader"],
          enforce: "pre"
        }
      ],
    }
};
