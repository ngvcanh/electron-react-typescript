import path from 'path';
import { WebpackPluginInstance, RuleSetRule, IgnorePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin';
import WebpackShellPluginNext from 'webpack-shell-plugin-next';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { Configuration, EBuilder, EMode, HTMLVariables, Output } from './src/shared/types';
import { isProd, MODE, devServer, APP_DIST, LAUNCH_DIST } from './src/shared/Env';

const BUILDER = process.env.ENV_BUILDER as EBuilder;

const {
  APP_OUTPUT_DIR_IMG = '/',
  APP_OUTPUT_DIR_FONT = '/',
  APP_OUTPUT_DIR_CSS = '/',
  APP_HTML_FILE
} = process.env;

const rules: (RuleSetRule | "...")[] = [
  { 
    test: /\.tsx?$/i, 
    use: [ 
      'babel-loader',
      {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.' + BUILDER + '.json'
        }
      }
    ]
  }
];

const plugins: WebpackPluginInstance[] = [];
const outputCustom: Output = {};
const customConfig: Configuration = {};

let entryExtension = '';
let sourceDir = '';
let outputHashName = '';
let target = 'none';

if (BUILDER === EBuilder.APP){
  customConfig.devServer = devServer;
  sourceDir = APP_DIST;
  entryExtension = 'tsx';
  outputHashName = '.[contenthash:6]';
  target = 'web';

  outputCustom.chunkFilename = '[id].[chunkhash].js';

  const CSSRule = { test: /\.css$/, use: [ MiniCssExtractPlugin.loader, 'css-loader' ] };
  
  const ImageRule = {
    test: /\.(png|jpg|gif|svg|webp)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: APP_OUTPUT_DIR_IMG + '[name].[contenthash:6].[ext]'
        }
      }
    ]
  };

  const FontRule = {
    test: /\.(eot|ttf|woff|woff2)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: APP_OUTPUT_DIR_FONT + '[name].[contenthash:6].[ext]'
        }
      }
    ]
  }

  rules.push(CSSRule, ImageRule, FontRule);

  const HTMLGlobalVariables: HTMLVariables = {}

  Object.keys(process.env).filter(key => key.match(/^APP_VAR_/))
  .map(key => HTMLGlobalVariables[key.replace(/^APP_VAR_/, '')] = process.env[key]);

  plugins.push(
    new HtmlWebpackPlugin({
      template: APP_HTML_FILE,
      templateParameters: HTMLGlobalVariables
    }),

    new MiniCssExtractPlugin({
      filename: APP_OUTPUT_DIR_CSS + '[name].[contenthash:6].css',
      chunkFilename: APP_OUTPUT_DIR_CSS + '[id].[name].css'
    }),

    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [ 'npm run electron:' + (isProd ? 'build' : 'start') ],
        blocking: false,
        parallel: true
      }
    }),

    new CopyWebpackPlugin({
      patterns: [
        { 
          from: './src/' + APP_DIST + APP_OUTPUT_DIR_IMG + '*', 
          to: './' + APP_OUTPUT_DIR_IMG + '[name][ext]' 
        },
      ],
      options: {
        concurrency: 100,
      }
    })
  );

  customConfig.optimization = {
    minimizer: [
      new CssMinimizerWebpackPlugin(),
    ],
    minimize: true,
    splitChunks: {
      chunks: 'all',
    }
  }
}

if (BUILDER === EBuilder.LAUNCH){

  sourceDir = LAUNCH_DIST;
  entryExtension = 'ts';
  target = 'electron-main';

  const ImageRule = {
    test: /\.(png|jpg|gif|svg|webp)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: APP_OUTPUT_DIR_IMG + '[name].[contenthash:6].[ext]'
        }
      }
    ]
  };

  rules.push(ImageRule);

  const WebpackElectronReload = require('webpack-electron-reload');
  const ElectronReload = WebpackElectronReload({
    path: path.resolve(__dirname, 'dist', LAUNCH_DIST, 'main.js')
  }) ;

  plugins.push(

    // new WebpackShellPluginNext({
    //   onBuildEnd: {
    //     scripts: [ 'npm run electron:launch' ],
    //     blocking: false,
    //     parallel: true
    //   }
    // }),

    ElectronReload()
  )

  process.platform === 'darwin' || plugins.push(
    new IgnorePlugin({
      resourceRegExp: /^fsevents/i
    })
  )

}

const output = {
  ...outputCustom,
  path: path.resolve(__dirname, 'dist/' + sourceDir),
  filename: '[name]' + outputHashName + '.js'
};

const configs: Configuration = { ...customConfig };

configs.mode = MODE as EMode;

configs.resolve = { extensions: [ '.ts', '.tsx', '.js', '.jsx' ] }

configs.target = target;

configs.entry = path.resolve(__dirname, 'src', sourceDir, 'index.' + entryExtension);

configs.output = { ...output };

configs.module = { rules: [ ...rules ] };

configs.plugins = [ ...plugins ];

export default configs;