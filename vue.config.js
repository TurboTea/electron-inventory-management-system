module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      removeElectronJunk: false,
      builderOptions: {
        
        icon: 'src/assets/icons/pallet.png',
        productName: "Inventory",
        appId: 'https://nextchallenge-dz.com/'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
