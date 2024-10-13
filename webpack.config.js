const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
  ],
  mode: 'production',
};
