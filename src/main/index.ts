import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createWindow, mainWindow } from './mainWindow'
import { aboutWindow, createAboutWindow, createLicenseWindow, licenseWindow } from './aboutWindow'
import microsoftLogin, { getMinecraftProfileWithRefreshToken } from './microsoftLogin'
import ElectronStore from 'electron-store'

const appData = app.getPath('appData')
const realUserData = `${appData}/Koi Launcher`
app.setPath('userData', `${app.getPath('temp')}/Koi Launcher`)

// const exePath = app.getAppPath().slice(0, app.getAppPath().length - 8)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const loadStore = async (): Promise<ElectronStore<Record<string, any>>> => {
  const { default: Store } = await import('electron-store')
  const store = new Store({
    name: 'KoiLConfig',
    cwd: realUserData
  })

  return new Promise((resolve) => {
    resolve(store)
  })
}

loadStore().then((store) => {
  // 定义ipcRenderer监听事件
  ipcMain.on('store:setItem', (_, key, value) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.set(key, value)
  })

  ipcMain.on('store:getItem', (_, key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = store.get(key)
    _.returnValue = value || null
  })

  ipcMain.on('store:removeItem', (_, key) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    store.delete(key)
  })
})

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('net.miourasaki.koil')

  // 创建主窗口，加载应用程序的其他部分，等等...
  app.whenReady().then(() => {
    createWindow()
  })

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('oauth:ms-in', microsoftLogin)
  ipcMain.on('auth:ms-in', getMinecraftProfileWithRefreshToken)

  ipcMain.on('window:close', () => app.quit())
  ipcMain.on('window:maximize', () => {
    if (mainWindow.isMinimized()) mainWindow.unmaximize()
    else mainWindow.maximize()
  })
  ipcMain.on('window:minimize', () => mainWindow.minimize())

  ipcMain.on('window:openAbout', () => {
    if (!aboutWindow) createAboutWindow()
    else {
      try {
        aboutWindow.isClosable()
      } catch (e) {
        createAboutWindow()
      }
    }
  })
  ipcMain.on('window:closeAbout', () => aboutWindow.close())
  ipcMain.on('window:openLicense', () => {
    if (!licenseWindow) createLicenseWindow()
    else {
      try {
        licenseWindow.isClosable()
      } catch (e) {
        createLicenseWindow()
      }
    }
  })
  ipcMain.on('window:closeLicense', () => licenseWindow.close())
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

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
