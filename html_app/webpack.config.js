const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: './script.js',
    path: path.resolve(__dirname, 'js'),
  },
  devServer: {
    static: path.join(__dirname, "js"),
    compress: true,
    port: 4000,
  },
};