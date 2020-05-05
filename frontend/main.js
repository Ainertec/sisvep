const { app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    icon: './img/icon.ico',
    autoHideMenuBar: true,
    title: 'Sisvep - sistema para gerenciamento de vendas',
    minHeight:840,
    minWidth: 1300
  })

  mainWindow.loadFile('index.html')
  mainWindow.maximize()

  mainWindow.on('closed', function () {
    mainWindow = null
  })

}


app.on('ready', createWindow)


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})