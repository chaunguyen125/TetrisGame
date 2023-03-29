const path = require('path');
var webpack = require('webpack');
const dotenv = require('dotenv')
const MergeIntoSingle = require('webpack-merge-and-include-globally')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
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
    fallback: { "path": require.resolve("path-browserify") }
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.join(__dirname, 'public')
    , host: '0.0.0.0',
    port: 8000
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env": dotenv.parsed
    }),
    new MergeIntoSingle({
        files: {
            "libs.js": [
                './libs/pixi.js',
                './libs/tweenjs.min.js',
                './libs/fairygui.js',
                './libs/rawinflate.min.js',
                './libs/stats.min.js',
                './libs/pixi-particles.js',
                './libs/pixi-sound.js',
                './libs/html-text.js',
                
            ]
        },
        transform: {
            'libs.js': code => require("uglify-js").minify(code).code
        }
    }),
],
};