const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'messenger.bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.hbs', '.pcss', '.html']
  },
  module: {
    rules: [
        {
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.hbs/,
            use: [
                {
                    loader: 'handlebars-template-loader',
                },
            ],
        }, 
        {
            test: /\.?css$/i,
            use: [
                "style-loader",
                "css-loader",
                {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: {
                            plugins: [
                                ['postcss-nested', 'postcss-simple-vars', 'postcss-icon-blender']
                            ],
                        },
                    },
                },
            ]
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    port: 3000
  }
}; 
