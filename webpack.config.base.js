const { IgnorePlugin } = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
    library: 'decentr',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),

    new CopyPlugin({
      patterns: [
        {
          from: './src/index.js',
        },
      ],
    }),
  ],
}
