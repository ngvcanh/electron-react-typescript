import { BrowserWindow, app, nativeImage } from 'electron';
import path from 'path';
import fs from 'fs';
import { isProd, isDev, APP_DIST, PORT, PUBLIC_URL } from '../shared/Env';

const { LAUNCH_DIST_PATH, APP_OUTPUT_DIR_IMG = '' } = process.env;

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {

  const iconPath = path.resolve(__dirname, '..', APP_DIST, APP_OUTPUT_DIR_IMG, 'logo.png');
  const icon = nativeImage.createFromPath(iconPath);

  if (!mainWindow){
  
    mainWindow = new BrowserWindow({
      show: true,
      frame: false,
      icon,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: false
      }
    });
  }

  if (isProd){
    const outputApp = path.resolve(__dirname, '..', APP_DIST, 'index.html');
    mainWindow.loadFile(outputApp);
  }
  else{
    const urlApp = 'http://localhost:' + PORT + PUBLIC_URL;
    mainWindow.loadURL(urlApp);
  }

  //mainWindow.setOverlayIcon(icon, 'Description for overlay')

  mainWindow.setMenuBarVisibility(false);
  isDev && mainWindow.webContents.openDevTools();

}

app.whenReady().then(createWindow);
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
app.on("window-all-closed", () => process.platform === "darwin" || app.quit());
app.on('quit', () => mainWindow = null);