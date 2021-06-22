import * as webpack from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';

export enum EMode{
  DEV = 'development',
  PRO = 'production',
  NON = 'none'
}

export enum EBuilder{
  LAUNCH = 'electron',
  APP = 'react',
  SERVER = 'server'
}

export interface Configuration extends webpack.Configuration{
  devServer?: WebpackDevServerConfiguration;
}

export interface Output {
	chunkFilename?: string;
	clean?: boolean;
	filename?: string;
	path?: string;
	publicPath?: string;
}

export interface HTMLVariables{
  [x: string]: any;
}