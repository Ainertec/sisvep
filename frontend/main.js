const { app, BrowserWindow, shell } = require('electron')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    icon: '../executaveis_modulos/icon.ico',
    frame: false,
    transparent: true,
    resizable: true,
    alwaysOnTop: false,
    backgroundColor: '#000',
    width: 1280,
    height: 720,
    title: 'Sisvep',
    autoHideMenuBar: true
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    shell.openItem("C://sisvep-x64//executaveis_modulos//close.vbs"),
    mainWindow = null
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