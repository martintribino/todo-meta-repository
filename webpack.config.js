const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.tsx',
  entry: {
    app: {
      import: './src/index.tsx',
    }
  },
  cache: false,
  mode: "development",
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
  },
  output: {
    publicPath: "auto",
  },
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|json)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '/public/[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules|\.d\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              noEmit: false,
            },
          },
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "todo-meta-repository",
      filename: 'remoteEntry.js',
      remotes: {
        todoApp: "todoApp@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        react: {
          requiredVersion: false,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: false,
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
