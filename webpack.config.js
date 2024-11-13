const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js', 
  },
  output: {
    filename: '[name].bundle.js',  // This should generate main.bundle.js
    path: path.resolve(__dirname, 'dist/js'), 
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../style/[name].css',  // CSS files will go into dist/style
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/js/service-worker.js', to: path.resolve(__dirname, 'dist/js/service-worker.js') }
      ]
    })
  ],
  mode: 'production',
};
