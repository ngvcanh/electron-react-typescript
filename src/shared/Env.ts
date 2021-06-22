import path from 'path';
import { config } from 'dotenv';
import { Configuration } from 'webpack-dev-server';
import { EMode } from './types';

config({ path: './.env' });



const {
  MODE = 'none',
  APP_VAR_PUBLIC_URL = '',
  APP_DEVELOP_PORT = 3000,
  APP_DIST = '',
  LAUNCH_DIST = ''
} = process.env;

export {
  MODE,
  APP_DIST,
  LAUNCH_DIST
}

export const isDev = MODE === EMode.DEV;

export const isProd = MODE === EMode.PRO;

export const PUBLIC_URL = isDev ? '/' : APP_VAR_PUBLIC_URL;

export const PORT: number = +APP_DEVELOP_PORT;

export const devServer: Configuration = {
  
  contentBase: path.resolve(__dirname, '..' + APP_DIST.replace(/\/$/, '')),
  port: PORT,
  hot: true,
  watchContentBase: true,
  historyApiFallback: true,
  open: false,
  compress: true,
  contentBasePublicPath: PUBLIC_URL + '/index.html',
  before: app => app.get('/', (_req, res, next) => {
    PUBLIC_URL !== '/' && PUBLIC_URL !== '' ? 
    res.redirect('/' + PUBLIC_URL.replace(/^\/+/, '')) : next();
  })
};