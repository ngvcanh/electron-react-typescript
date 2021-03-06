import { BrowserWindow, ipcMain } from 'electron';
import { KenSoni } from '@kensoni/core';
class ProcessListener{

  private static pl: ProcessListener;

  private window!: BrowserWindow;

  private constructor(window: BrowserWindow){
    this.window = window;
    this.start();
  }

  private start(){
    this.closeWindow();
  }

  private closeWindow(){
    ipcMain.handle(KenSoni.EChannel.WINDOW_CLOSE, event => {
      event.preventDefault();
      this.window.webContents.isDevToolsOpened() && this.window.webContents.closeDevTools();
      this.window.close();
    });
  }

  public static listen(window: BrowserWindow){
    if (!this.pl) this.pl = new ProcessListener(window);
    return this.pl;
  }

}

export default ProcessListener;