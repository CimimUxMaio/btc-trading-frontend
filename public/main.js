const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { PythonShell } = require("python-shell");
const config = require("../config.json");

function runBackendServer() {
    const options = {
        mode: "text",
        pythonPath: config.backend_python_path
    }

    PythonShell.run(config.backend_server_main_path, options, (err, results) => {
        if (err) throw err;
        console.log('response: ', results);
    });
}


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    });
    
    const URL = url.format({
        pathname: path.join(__dirname, './index.html'),
        hash: "",
        protocol: 'file',
        slashes: true
    });

    win.loadURL(URL);
}

app.on("ready", () => {
    runBackendServer();
    createWindow();
});
