import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import axios from "axios";

export let mainWindow: BrowserWindow

export function createWindow(): void {
  let useDevTools: boolean = false
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) useDevTools = true
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    resizable: false,
    maximizable: false,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      sandbox: false,
      devTools: useDevTools
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })


  ipcMain.on('mojangApi:deleteCape', (_, token) => {
    axios.delete('https://api.mojang.com/minecraft/profile/capes/active', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      _.returnValue = true
    })
      .catch(() => {
        _.returnValue = false
      })
  })
  ipcMain.on('mojangApi:putCape', (_, token,uuid) => {
    axios.put('https://api.mojang.com/minecraft/profile/capes/active', {
      capeId: uuid
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(() => {
      _.returnValue = true
    })
      .catch(() => {
        _.returnValue = false
      })
  })



  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window:maximizeChange', true)
  })
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window:maximizeChange', false)
  })

  ipcMain.on('window:close', () => app.quit())
  ipcMain.on('window:maximize', () => {
    mainWindow.maximize()
  })
  ipcMain.on('window:unmaximize', (_) => {
    mainWindow.unmaximize()
  })
  ipcMain.on('window:isMaximized', (_) => {
    _.returnValue = mainWindow.isMaximized()
  })
  ipcMain.on('window:minimize', () => mainWindow.minimize())

  ipcMain.on('window:openResizable', () => {
    mainWindow.setResizable(true)
    mainWindow.setMaximizable(true)
  })
  ipcMain.on('window:closeResizable', () => {
    mainWindow.setResizable(false)
    mainWindow.setMaximizable(false)
  })
  ipcMain.on('window:setSize', (_event, args) => {
    mainWindow.setSize(args[0], args[1])
    mainWindow.setMinimumSize(900, 600)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then(() => {})
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => {})
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html')).then(() => {})
  }
}
