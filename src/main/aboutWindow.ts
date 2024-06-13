import { BrowserWindow, shell } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { mainWindow } from "./mainWindow";

export let aboutWindow: BrowserWindow
export let licenseWindow: BrowserWindow

export function createAboutWindow(): void {
  const size = [400, 250]

  // Create the browser window.
  aboutWindow = new BrowserWindow({
    width: size[0],
    height: size[1],
    minWidth: size[0],
    minHeight: size[1],
    maxWidth: size[0],
    maxHeight: size[1],
    parent: mainWindow,
    resizable: false,
    maximizable: false,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      sandbox: false
    }
  })

  aboutWindow.on('ready-to-show', () => {
    aboutWindow.show()
  })

  aboutWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then(() => {})
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    aboutWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/about`).then(() => {})
  } else {
    aboutWindow.loadFile(join(__dirname, '../renderer/about.html')).then(() => {})
  }
}
export function createLicenseWindow(): void {
  const size = [400, 550]

  // Create the browser window.
  licenseWindow = new BrowserWindow({
    width: size[0],
    height: size[1],
    minWidth: size[0],
    minHeight: size[1],
    parent: mainWindow,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      sandbox: false
    }
  })

  licenseWindow.on('ready-to-show', () => {
    licenseWindow.show()
  })

  licenseWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url).then(() => {})
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    licenseWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}#/license`).then(() => {})
  } else {
    licenseWindow.loadFile(join(__dirname, '../renderer/license.html')).then(() => {})
  }
}
