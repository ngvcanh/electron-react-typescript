import Electron from 'electron';

export type ResponseListener = (event: Electron.IpcRendererEvent, ...args: any[]) => void;

export enum EChannel{
  WINDOW_CLOSE = 'KenSoni.Window.Close'
}

export interface IKenSoni{
  Channel: typeof EChannel;
  closeWindow(): void;
  maximize(): void;
  minimize(): void;
  openExternalLink(link: string): void;
  request(channel: EChannel, ...args: any[]): Promise<any>;
  response(channel: EChannel, listener: ResponseListener): void;
}