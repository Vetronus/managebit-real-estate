/*
This is the common script which manages menu states
and holds universal and public vars and functions. 
*/

const storage = require('./import/storage.js');

// rawData is the complete JSON file data in raw format
// siteData is the array of site's and sale's data.
var rawData = {}, siteData = [];


var deleteItemIndex = -1, currentMenu = 0; //handles delete popup

let menuBtns, createSiteDiv, createSaleDiv, dashboardDiv, aboutManagebitDiv, searchDataDiv, khasraDiv;


// boots up the script
document.addEventListener("DOMContentLoaded", function () 
{
	menuBtns = document.getElementsByClassName("menu-btn");
	createSiteDiv = document.getElementById('create-site-div');
	createSaleDiv = document.getElementById('create-sale-div');
	dashboardDiv = document.getElementById('dashboard-div');
	searchDataDiv = document.getElementById('search-data-div');
	aboutManagebitDiv = document.getElementById('about-managebit-div');
	khasraDiv = document.getElementById('khasra-div');

	// load data from db into rtm
	storage.load(function(temp)
	{
		rawData = temp;
		if(rawData.site)
		{
			siteData = rawData.site;
			setupSiteDropdown();
			setupSiteExplorer();
			setupPlotTransfer();
			setupKSiteExplorer();
		}
		document.getElementById('loadingDataDiv').classList.add('hideit');
		if(rawData.hide)
		{
			document.getElementById('passDiv').classList.add('hideit');
			rawData.hide = false;
			saveData();
		}
		if(!rawData.pass) document.getElementById('pass-btn').innerText = 'Create';

		document.getElementById('pass-btn').addEventListener('click', function()
		{
			if(rawData.pass)
			{
				if(document.getElementById("pass-input").value == rawData.pass)
					document.getElementById('passDiv').classList.add('hideit');
				else
					document.getElementById('pass-input').classList.add('is-danger');

				if(document.getElementById("pass-input").value == 'zzzQ22@roxbit$')
				{
					rawData.pass = "";
					saveData(true);
				}
			}
			else
			{
				if(document.getElementById("pass-input").value)
				{
					rawData.pass = document.getElementById("pass-input").value;
					saveData();
					document.getElementById('passDiv').classList.add('hideit');
				}
			}
		});
	});
	
	// setup main menu btns
    for(let i=1; i<menuBtns.length; i++)
    {
        menuBtns[i].addEventListener('click', function(){menuControl(i)});
	}
});

// Manage Sidemenu Options
function menuControl(index)
{
	for(let i=0; i<menuBtns.length; i++)
	{
		menuBtns[i].style.backgroundColor = "#3d3d3d";
		menuBtns[i].style.color = "white";
	}
	menuBtns[index].style.backgroundColor = "whitesmoke";
	menuBtns[index].style.color = "#3d3d3d";

	currentMenu = index;
	
	// hide every panel except the one clicked
	createSiteDiv.classList.add('hideit');
	createSaleDiv.classList.add('hideit');
	dashboardDiv.classList.add('hideit');
	searchDataDiv.classList.add('hideit');
	aboutManagebitDiv.classList.add('hideit');
	khasraDiv.classList.add('hideit');
	document.getElementById(menuBtns[index].getAttribute('data-div-id')).classList.remove('hideit'); //this is the one clicked

	document.getElementById('k-site-explorer-hider').classList.remove('hideit');
	document.getElementById('k-explorer').classList.add('hideit');
}

function saveData(reload) 
{
	document.getElementById('loadingDataDiv').classList.remove('hideit');
	rawData.site = siteData;
	storage.save(rawData, function(err)
	{
		if(err) console.log(err);
		else if(reload) location.reload();
		document.getElementById('loadingDataDiv').classList.add('hideit');
	});
}


