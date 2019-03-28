const webpack = require('webpack');
const path = require('path');

const appDirectory = process.cwd();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// css
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const isProd = process.env.NODE_ENV === 'production';

module.exports = function(webpackEnv) {
  // babel-loader
  // yarn add --dev babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-stage-0
  // @babel/preset-stage-0 이거 에러나는디?
  // yarn webpack --config ./config/webpack.config.js ./src/index.js

  // css-loader
  // yarn add --dev style-loader css-loader extract-text-webpack-plugin@next
  // webpack 4 => mini-css-extract-plugin

  // url-loader
  // yarn add --dev file-loader url-loader

  // html-loader
  // yarn add --dev html-webpack-plugin html-loader

  // Terser vs Uglify => css minify plugin

  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  console.log('webpackEnv > ', webpackEnv);

  return {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
      app: path.resolve(appDirectory, 'src/index.js'),
    },
    output: {
      path: path.resolve(appDirectory, 'build'),
      filename: 'static/js/[name].[chunkhash:8].js',
    },
    optimization: {
      minimize: isEnvProduction, // UglifyJsPlugin
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: shouldUseSourceMap,
        }),
        // This is only used in production mode
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser, // css 문법 오류 수정?
            map: shouldUseSourceMap
              ? {
                  // `inline: false` forces the sourcemap to be output into a
                  // separate file
                  inline: false,
                  // `annotation: true` appends the sourceMappingURL to the end of
                  // the css file, helping the browser find the sourcemap
                  annotation: true,
                }
              : false,
          },
        }),
      ],
      splitChunks: {
        // CommonsChunkPlugin
        // cacheGroups: {
        //     vendor: {
        //         chunks: "initial",
        //         name: 'vendor',
        //         enforce: true
        //     }
        // },
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: 'url-loader',
              options: {
                limit: 10000, // 보다 큰파일은 file-loader가 처리
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: { node: 'current' },
                      modules: 'false',
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
              exclude: ['/node_modules'],
            },
            {
              test: /\.css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: '../',
                  },
                },
                'css-loader',
              ],
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: 'html-loader',
                  options: { minimize: true },
                },
              ],
            },
            {
              loader: 'file-loader',
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // webpack 4 는 uglify 기본으로 된다고? => optimization>minimize
      // new webpack.DefinePlugin({
      //     'process.env.NODE_ENV': JSON.stringify('production'), // 아래 EnvironmentPlugin처럼 할 수도 있습니다.
      // }),
      new webpack.EnvironmentPlugin(['NODE_ENV']), // 이것도 동작을 안하는것같은데 ㅅㅂ
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: '/',
      }),
    ],
  };
};
