const electron = require('electron');
const path = require('path');
const fs = require('fs');

var database = {};
var fileName = '/database1x.json';
var filePath = (electron.app || electron.remote.app).getPath('userData') + fileName;

console.log(filePath);

var load = function(callback)
{
    // Try to read the database file
    fs.readFile(filePath, (err, data) => 
    {
        // if the file doesn't exists
        if (err && err.code == 'ENOENT')
        {
            // Create the default database obj
            database.vDate = Date.now().toString();
            // Create the database file
            fs.writeFile(filePath, JSON.stringify(database), (err)=>
            {
                if(err) throw err;
                console.log("file created sucessfully!");
                callback(database, null);
            });
        }
        else //data loaded from the file
        {
            database = JSON.parse(data);
            console.log("data loaded!");
            callback(database, null);
        }
    });
}

var save = function(newDatabase, callback)
{
    database = newDatabase;
    fs.writeFile(filePath, JSON.stringify(database), (err)=>
    {
        if(err) throw err;
        console.log("file updated sucessfully!");
        callback(null);
    });
}

module.exports.load = load;
module.exports.save = save;