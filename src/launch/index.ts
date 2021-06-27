import path from 'path';
import { BrowserWindow, app, nativeImage } from 'electron';
import { mainReloader } from 'electron-hot-reload';
import { isProd, isDev, APP_DIST, PORT, PUBLIC_URL } from '../shared/Env';

import ProcessListener from './Modules/ProcessListener';

const { APP_OUTPUT_DIR_IMG = '' } = process.env;
let mainWindow: BrowserWindow | null = null;

mainReloader(path.resolve(__dirname, '..', '..', 'src', 'app', 'assets'));

const createWindow = () => {

  const iconPath = path.resolve(__dirname, '..', APP_DIST, APP_OUTPUT_DIR_IMG, 'logo.png');
  const icon = nativeImage.createFromPath(iconPath);

  if (!mainWindow){
    mainWindow = new BrowserWindow({
      show: true,
      frame: false,
      minWidth: 500,
      minHeight: 400,
      icon,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        contextIsolation: true,
        preload: path.resolve(__dirname, 'preload.js')
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

  mainWindow.maximize();
  mainWindow.setMenuBarVisibility(false);
  isDev && mainWindow.webContents.openDevTools();

  ProcessListener.listen(mainWindow);
}

app.whenReady().then(createWindow);
app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
app.on("window-all-closed", () => process.platform === "darwin" || app.quit());
app.on('quit', () => mainWindow = null);