'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const connectDB = require('./config/db')
const Product = require('./models/Product')
const Provider = require('./models/Provider')
const Customer = require('./models/Customer')


// Connect to database
connectDB()

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  // Load products
  ipcMain.on('products:load', sendProducts)

  // Send products items
  async function sendProducts() {
    try {
      const products = await Product.find().sort({ created: 1 })
      win.webContents.send('products:get', JSON.stringify(products))
    } catch (err) {
      console.log(err)
    }
  }

  // Add products
  ipcMain.on('products:add', async (e, item) => {
    try {
      await Product.create(item)
      sendProducts()
    } catch (error) {
      console.log(error)
    }
  })

  // Load prviders
  ipcMain.on('providers:load', sendProviders)

  // Send providers items
  async function sendProviders() {
    try {
      const providers = await Provider.find().sort({ created: 1 })
      win.webContents.send('providers:get', JSON.stringify(providers))
    } catch (err) {
      console.log(err)
    }
  }

  // Add providers
  ipcMain.on('providers:add', async (e, item) => {
    try {
      await Provider.create(item)
      sendProviders()
    } catch (error) {
      console.log(error)
    }
  })

  // Load customers
  ipcMain.on('customers:load', sendCustomers)

  // Send customers items
  async function sendCustomers() {
    try {
      const customers = await Customer.find().sort({ created: 1 })
      win.webContents.send('customers:get', JSON.stringify(customers))
    } catch (err) {
      console.log(err)
    }
  }

  // Add customers
  ipcMain.on('customers:add', async (e, item) => {
    try {
      await Customer.create(item)
      sendCustomers()
    } catch (error) {
      console.log(error)
    }
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
