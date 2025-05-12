const { app, BrowserWindow } = require('electron');

process.env.NODE_ENV = 'development';

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: "ImageShrink",
        width: 500,
        height: 600,
        icon: `${__dirname}/assets/icons/Icon_256x256.png`
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
    mainWindow.loadFile(`./app/index.html`);
}

app.on('ready', createMainWindow); 