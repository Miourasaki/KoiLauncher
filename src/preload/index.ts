import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { version } from '../../package.json'

// Custom APIs for renderer
const api = {
  // onDeeplinkPush: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
  //   ipcRenderer.on('deeplink:push', callback),
  mainStorage: {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    setItem: (key: string, value: any) => {
      ipcRenderer.send('store:setItem', key, value)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getItem(key: string) {
      return ipcRenderer.sendSync('store:getItem', key)
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    removeItem(key: string) {
      return ipcRenderer.sendSync('store:removeItem', key)
    }
  }
}
contextBridge.exposeInMainWorld('versions', {
  main: version
  // 除函数之外，我们也可以暴露变量
})
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('mainStorage', api.mainStorage)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.mainStorage = api.mainStorage
  // @ts-ignore (define in dts)
}
