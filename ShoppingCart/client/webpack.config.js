// client/webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [ new HtmlWebpackPlugin({ template: './public/index.html' }) ],
  devServer: {
    port: 3000,
    proxy: [{ context: ['/api'], target: 'http://127.0.0.1:9000', changeOrigin: true }],
    historyApiFallback: true,
    // ✅ 用数组写法
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        secure: false
      }
    ]
  }
};
