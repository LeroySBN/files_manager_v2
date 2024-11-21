const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    static: './dist',
    compress: true,
    host: '0.0.0.0',
    port: 8564,
    // open: true,
    hot: true,
    liveReload: true,
    watchFiles: [
      'src/*.js',
      'src/*.jsx',
      'src/*.css',
      'src/**/*.js',
      'src/**/*.jsx',
      'src/**/*.css',
    ],
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const port = devServer.server.address().port;
      console.log('Listening on port:', port);
    },
  },
  performance: {
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      { 
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        // type: 'asset/resource',
        use: [
          "file-loader",
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true,
              bypassOnDebug: true,
            }
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [
      'node_modules',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: 'index.html',
      template: './dist/index.html',
      title: 'Dashboard',
      inject: false,
    }),
    // new CleanWebpackPlugin(),
  ],
};
