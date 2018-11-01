const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
 }
const electron = require('electron');
const url = require('url');
const path = require('path');
const storage = require('./import/storage.js');

const {app, BrowserWindow} = electron;

let mainWindow;


// listen for the app to be ready
app.on('ready', function()
{
    // create main browser window
    mainWindow = new BrowserWindow({webPreferences: {webSecurity: false}});
    
    // load html page into the window
    mainWindow.loadURL(url.format
    ({
        pathname: path.join(__dirname, '/spa.html'),
        protocol: 'file:',
        slashes: true
    }));

    // storage.load(function(temp){console.log(temp);});

    // filePath = (electron.app || electron.remote.app).getPath('userData') + '/dataxyz123.json';
    // fs.readFile(filePath, (err, data) => {
    //     if (err);// throw err;
    //     console.log(err.code);
    // });
});