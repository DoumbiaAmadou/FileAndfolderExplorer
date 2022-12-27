const { app, BrowserWindow } = require("electron");
require('@electron/remote/main').initialize()
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  require('@electron/remote/main').enable(win.webContents)
  win.loadURL('http://localhost:3000');
}

//avoid app.on see Official Docs?
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
})