const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { PythonShell } = require("python-shell");
const config = require("../config.json");


let mainWindow = null;
let pyshell = null;

function runBackendServer() {
    const options = {
        mode: "text",
        pythonPath: config.backend_python_path
    }

    pyshell = new PythonShell(config.backend_server_main_path, options);

    pyshell.on("pythonError", err => {
        throw err;
    });

    pyshell.on("error", err => { throw err; });
}


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    
    const URL = url.format({
        pathname: path.join(__dirname, './index.html'),
        hash: "",
        protocol: 'file',
        slashes: true
    });

    mainWindow.loadURL(URL);
}

app.on("ready", () => {
    runBackendServer();
    createWindow();
});

app.on("closed", () => {
    mainWindow = null;
});

app.on("window-all-closed", () => {
    pyshell.kill();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) createWindow();
});
