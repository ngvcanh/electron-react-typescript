import { contextBridge, ipcRenderer, remote, shell } from 'electron';
import { EChannel, IKenSoni, ResponseListener } from '../shared/preload';

const getWindow = () => remote.BrowserWindow.getFocusedWindow();

const KenSoni: IKenSoni = {

  Channel: EChannel,

  closeWindow: () => {
    KenSoni.request(EChannel.WINDOW_CLOSE);
  },

  maximize: () => {
    let win = getWindow();
    if (win === null) return;
    win?.isMaximized() ? win?.unmaximize() : win?.maximize();
  },

  minimize: () => {
    getWindow()?.minimize();
  },

  openExternalLink: (link: string) => {
    shell.openExternal(link);
  },

  request: (channel: EChannel, ...args: any[]): Promise<any> => {
    return ipcRenderer.invoke(channel, ...args);
  },

  response: (channel: EChannel, listener: ResponseListener) => {
    ipcRenderer.on(channel, listener);
  }

}

contextBridge.exposeInMainWorld('KenSoni', KenSoni);