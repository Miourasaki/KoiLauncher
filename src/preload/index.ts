import { IpcRendererEvent, contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { version } from '../../package.json'

// Custom APIs for renderer
const api = {
  onDeeplinkPush: (callback: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on('deeplink:push', callback)
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
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
}
