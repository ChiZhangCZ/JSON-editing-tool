import { JSONEditor } from './node_modules/vanilla-jsoneditor/index.js'
// create the editor
const editor = new JSONEditor({
  target: document.getElementById('jsonEditor')
})

const saveButton = document.querySelector('#btnSaveFile');
saveButton.disabled=true


function setJson(filePath) {
    electron.fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err){
          alert("An error occurred reading the file: " + err.message);
          return;
        }
        const parsedJson = JSON.parse(data);
        const content = {
            text: undefined,
            json: parsedJson
          }
        
        editor.set(content)
        saveButton.disabled = false
    });
  }

function openFile() {
    const dialogConfig = {
        filters: [{ name: 'json', extensions: ['json'] }]
    };
    electron.openDialog('showOpenDialog', dialogConfig)
        .then(selected => setJson(selected.filePaths[0]));
}

function writeFile(fileName, data){
    electron.fs.writeFile(fileName, data, function (err) {
      if(err){
        alert("An error occurred creating the file " + err.message);
      }
    });
  }

function saveFile(){
    const jsonToSave = editor.get()
    const stringifiedJson = JSON.stringify(jsonToSave.json)
    const dialogConfig = {
        filters: [{ name: 'json', extensions: ['json'] }]
    };
    electron.openDialog('showSaveDialog', dialogConfig)
        .then(selected => writeFile(selected.filePath, stringifiedJson));

}

document.getElementById('btnOpenFile').addEventListener('click', openFile);
document.getElementById('btnSaveFile').addEventListener('click', saveFile)
