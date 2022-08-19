const { contextBridge , ipcRenderer}= require('electron')
const fs = require('fs')


contextBridge.exposeInMainWorld('electron', {
    openDialog: (method, config) => ipcRenderer.invoke('dialog', method, config),
    fs: fs
});