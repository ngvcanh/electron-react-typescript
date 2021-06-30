import { contextBridge } from 'electron';
import { Preload } from '@kensoni/core';

contextBridge.exposeInMainWorld('KenSoni', Preload);