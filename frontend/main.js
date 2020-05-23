const { app, BrowserWindow, shell } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: './img/icon.ico',
    autoHideMenuBar: true,
    title: 'Sisvep - sistema para gerenciamento de vendas',
    minHeight: 840,
    minWidth: 1300,
  })

  mainWindow.loadFile('index.html')
  mainWindow.maximize()

  mainWindow.on('closed', function () {
    mainWindow = null,
      shell.openItem("C://sisvep-x64//executaveis_modulos//close.vbs")
  })
}

shell.openItem("C://sisvep-x64//executaveis_modulos//startMongo.vbs")
shell.openItem("C://sisvep-x64//executaveis_modulos//startNode.vbs")

var data = new Date();

if (data.getDate() == 5 || data.getDate() == 15 || data.getDate() == 25) {
  shell.openItem("C://sisvep-x64//executaveis_modulos//startBackup.vbs")
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
