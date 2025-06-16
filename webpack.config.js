const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // cleans the dist folder before each build (optional but useful)
  },

  module: {
    rules: [
      {
        test: /\.css$/i,      
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,     
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  mode: 'development',
};