const { IgnorePlugin } = require('webpack');

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    path: __dirname + '/lib',
    library: 'decentr-js',
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
  ],
}
