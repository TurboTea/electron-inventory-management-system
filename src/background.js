'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const connectDB = require('./config/db')
const Product = require('./models/Product')
const Vendor = require('./models/Vendor')
const Customer = require('./models/Customer')
const Stock = require('./models/Stock')
const ProductPurchase = require('./models/ProductPurchase')
const ProductSale = require('./models/ProductSale')
const Sale = require('./models/Sale')
const Purchase = require('./models/Purchase')
const Tax = require('./models/Tax')


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

  // Delete product
  ipcMain.on('products:delete', async (e, id) => {
    try {
      await Product.findOneAndDelete({ _id: id })
      sendProducts()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit product
  ipcMain.on('products:edit', async (e, item) => {
    try {
      const doc = await Product.findById(item._id);
      doc.name = item.name;
      doc.designation = item.designation;
      doc.code = item.code;
      doc.price = item.price;
      doc.amount = item.amount;
      await doc.save();
      sendProducts()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete product
  // ipcMain.on('products:delete', async (e, id) => {
  //   try {
  //     await Product.findOneAndDelete({ _id: id })
  //     sendProducts()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })

  // Load vendors
  ipcMain.on('vendors:load', sendvendors)

  // Send vendors items
  async function sendvendors() {
    try {
      const vendors = await Vendor.find().sort({ created: 1 })
      win.webContents.send('vendors:get', JSON.stringify(vendors))
    } catch (err) {
      console.log(err)
    }
  }

  // Add vendors
  ipcMain.on('vendors:add', async (e, item) => {
    try {
      await Vendor.create(item)
      sendvendors()
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

  // Load stock
  ipcMain.on('stocks:load', sendStocks)

  // Send stock items
  async function sendStocks() {
    try {
      const stocks = await Stock.find().sort({ created: 1 }).populate("productId")
      win.webContents.send('stocks:get', JSON.stringify(stocks))
    } catch (err) {
      console.log(err)
    }
  }

  // Add stocks
  ipcMain.on('stocks:add', async (e, item) => {
    try {
      await Stock.create(item)
      sendStocks()
    } catch (error) {
      console.log(error)
    }
  })

  // minus stock amount
  ipcMain.on('stock:minus', async (e, item) => {
    try {
      const doc = await Stock.findOne({ productId: item.productId });
      doc.amount = doc.amount - parseInt(item.amount);
      await doc.save();
    } catch (error) {
      console.log(error)
    }
  })

  // plus stock amount
  ipcMain.on('stock:plus', async (e, item) => {
    try {
      const doc = await Stock.findOne({ productId: item.productId });
      doc.amount = doc.amount + parseInt(item.amount);
      await doc.save();
    } catch (error) {
      console.log(error)
    }
  })

  // Edit Purchase Total Price
  ipcMain.on('purchaseTotals:edit', async (e, item) => {
    try {
      const doc = await Purchase.findOne({ _id: item._id });
      doc.totalPrice = item.totalPrice;
      doc.totalUntaxedAmount = item.totalUntaxedAmount;
      doc.totalTaxes = item.totalTaxes;
      await doc.save();
    } catch (error) {
      console.log(error)
    }
  })

  // Edit Sale Total Price
  ipcMain.on('saleTotals:edit', async (e, item) => {
    try {
      const doc = await Sale.findOne({ _id: item._id });
      doc.total_price = item.total_price;
      doc.totalUntaxedAmount = item.totalUntaxedAmount;
      doc.totalTaxes = item.totalTaxes;
      await doc.save();
    } catch (error) {
      console.log(error)
    }
  })

  // Load ProductSale
  ipcMain.on('productSales:load',async (e, id) => {
    try {
      const productSales = await ProductSale.find({ saleId: id}).populate("productId").populate("taxId")
      win.webContents.send('productSales:get', JSON.stringify(productSales))
    } catch (error) {
      console.log(error)
    }
  })

  // Send productSale
  async function sendProductSales(id) {
    try {
      const productSales = await ProductSale.find({ saleId: id}).populate("productId").populate("taxId")
      win.webContents.send('productSales:get', JSON.stringify(productSales))
    } catch (err) {
      console.log(err)
    }
  }

  // Add ProductSale
  ipcMain.on('productSales:add', async (e, item) => {
    try {
      await ProductSale.create(item)
      sendProductSales(item.saleId)
    } catch (error) {
      console.log(error)
    }
  })

  // Delete ProductSale
  ipcMain.on('productSales:delete', async (e, item) => {
    try {
      await ProductSale.findOneAndDelete({ _id: item._id })
      sendProductSales(item.saleId)
    } catch (error) {
      console.log(error)
    }
  })

  // Edit ProductSale
  ipcMain.on('productSales:edit', async (e, item) => {
    try {
      const doc = await ProductSale.findById(item._id);
      doc.productId = item.productId;
      doc.price = item.price;
      doc.amount = item.amount;
      doc.subTotal = item.subTotal;
      await doc.save();
      sendProductSales(item.saleId)
    } catch (error) {
      console.log(error)
    }
  })

  // Load Sales
  ipcMain.on('sales:load', sendSales)

  // Send Sales
  async function sendSales() {
    try {
      const sales = await Sale.find().sort({ created: 1 }).populate("customerId")
      win.webContents.send('sales:get', JSON.stringify(sales))
    } catch (err) {
      console.log(err)
    }
  }

  // Add Sales
  ipcMain.on('sales:add', async (e, item) => {
    try {
      await Sale.create(item)
      sendSales()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete Sale
  ipcMain.on('sales:delete', async (e, id) => {
    try {
      await Sale.findOneAndDelete({ _id: id })
      sendSales()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit Sale
  ipcMain.on('sales:edit', async (e, item) => {
    try {
      const doc = await Sale.findById(item._id);
      doc.name = item.name;
      doc.designation = item.designation;
      doc.code = item.code;
      doc.price = item.price;
      doc.amount = item.amount;
      await doc.save();
      sendSales()
    } catch (error) {
      console.log(error)
    }
  })

  // Load Sale to get the customer
  ipcMain.on('customerSale:load',async (e, id) => {
    try {
      const customerSale = await Sale.find({ _id: id}).populate("customerId")
      win.webContents.send('customerSale:get', JSON.stringify(customerSale))
    } catch (error) {
      console.log(error)
    }
  })

  // Load Purchase Information
  ipcMain.on('purchaseInfo:load',async (e, id) => {
    try {
      const purchaseInfo = await Purchase.findOne({ _id: id}).populate("vendorId")
      win.webContents.send('purchaseInfo:get', JSON.stringify(purchaseInfo))
    } catch (error) {
      console.log(error)
    }
  })

    // Load ProductPurchase
    ipcMain.on('productPurchases:load',async (e, id) => {
      try {
        const productPurchases = await ProductPurchase.find({ purchaseId: id}).populate("productId").populate("purchaseId").populate("taxId")
        win.webContents.send('productPurchases:get', JSON.stringify(productPurchases))
      } catch (error) {
        console.log(error)
      }
    })
  
    // Send productPurchase
    async function sendProductPurchases(id) {
      try {
        const productPurchases = await ProductPurchase.find({ purchaseId: id}).populate("productId").populate("taxId")
        win.webContents.send('productPurchases:get', JSON.stringify(productPurchases))
      } catch (err) {
        console.log(err)
      }
    }
  
    // Add ProductPurchase
    ipcMain.on('productPurchases:add', async (e, item) => {
      try {
        await ProductPurchase.create(item)
        sendProductPurchases(item.purchaseId)
      } catch (error) {
        console.log(error)
      }
    })
  
    // Delete ProductPurchase
    ipcMain.on('productPurchases:delete', async (e, item) => {
      try {
        await ProductPurchase.findOneAndDelete({ _id: item._id })
        sendProductPurchases(item.purchaseId)
      } catch (error) {
        console.log(error)
      }
    })
  
    // Edit ProductPurchase
    ipcMain.on('productPurchases:edit', async (e, item) => {
      try {
        const doc = await ProductPurchase.findById(item._id);
        doc.productId = item.productId;
        doc.price = item.price;
        doc.amount = item.amount;
        doc.subTotal = item.subTotal;
        await doc.save();
        sendProductPurchases(item.purchaseId)
      } catch (error) {
        console.log(error)
      }
    })
  
    // Load Purchases
    ipcMain.on('purchases:load', sendPurchases)
  
    // Send Purchases
    async function sendPurchases() {
      try {
        const purchases = await Purchase.find().sort({ created: 1 }).populate("vendorId")
        win.webContents.send('purchases:get', JSON.stringify(purchases))
      } catch (err) {
        console.log(err)
      }
    }
  
    // Add Purchases
    ipcMain.on('purchases:add', async (e, item) => {
      try {
        await Purchase.create(item)
        sendPurchases()
      } catch (error) {
        console.log(error)
      }
    })
  
    // Delete Purchase
    ipcMain.on('purchases:delete', async (e, id) => {
      try {
        await Purchase.findOneAndDelete({ _id: id })
        sendPurchases()
      } catch (error) {
        console.log(error)
      }
    })
  
    // Edit Purchase
    ipcMain.on('purchases:edit', async (e, item) => {
      try {
        const doc = await Purchase.findById(item._id);
        doc.name = item.name;
        doc.designation = item.designation;
        doc.code = item.code;
        doc.price = item.price;
        doc.amount = item.amount;
        await doc.save();
        sendPurchases()
      } catch (error) {
        console.log(error)
      }
    })

  // Load taxes
  ipcMain.on('taxes:load', sendTaxes)

  // Send taxes
  async function sendTaxes() {
    try {
      const taxes = await Tax.find().sort({ created: 1 })
      win.webContents.send('taxes:get', JSON.stringify(taxes))
    } catch (err) {
      console.log(err)
    }
  }

  // Add taxes
  ipcMain.on('taxes:add', async (e, item) => {
    try {
      await Tax.create(item)
      sendTaxes()
    } catch (error) {
      console.log(error)
    }
  })

  // Edit tax
  ipcMain.on('taxes:edit', async (e, item) => {
    try {
      const doc = await Tax.findById(item._id);
      doc.name = item.name;
      doc.typeTax = item.typeTax;
      doc.valueTax = item.valueTax;
      await doc.save();
      sendTaxes()
    } catch (error) {
      console.log(error)
    }
  })

  // Delete tax
  ipcMain.on('taxes:delete', async (e, id) => {
    try {
      await Tax.findOneAndDelete({ _id: id })
      sendTaxes()
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
