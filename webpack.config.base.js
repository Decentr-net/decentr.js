const { IgnorePlugin, ProvidePlugin } = require('webpack');

module.exports = {
  entry: ['./src/index.ts'],
  output: {
    filename: 'index.js',
    path: __dirname + '/lib',
    library: 'decentr-js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer/'),
      crypto: false,
      path: false,
      stream: require.resolve('stream-browserify'),
      util: false,
    },
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
    new IgnorePlugin({
      resourceRegExp: /^\.\/wordlists\/(?!english)|bip39\/src$/,
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}
