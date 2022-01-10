var path = require("path")

const config = {
  entry: './src/ts/index.ts',
  devtool: 'source-map',
  target: 'web',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, "dist"),
    globalObject: "this"
  }
};

module.exports = config