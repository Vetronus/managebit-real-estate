// Save and Load Data

var data = new Array();
var point = {};

function save()
{
    console.log("Saving data...");
    localStorage.data = JSON.stringify(data);
    console.log("Data saved!");
}

function sync()
{
    sessionStorage.point = JSON.stringify(point);
}

function load()
{
    console.log("Laoding data...");
    if(localStorage.data)
    {
        data = JSON.parse(localStorage.data);
        if(sessionStorage.point) point = JSON.parse(sessionStorage.point);
        console.log("Data loaded!");
    }
    else
    {
        console.log("No data exists.");
    }

    boot();
}


document.addEventListener("DOMContentLoaded", function()
{
    load();
})



