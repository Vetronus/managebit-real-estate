var siteDiv, createSiteBtn, selectBtns, editBtns, delBtns, updateDiv;
var namex, village, area, usableArea, landuseStatus, registry, payment;
var temp;

function boot()
{
    siteDiv = document.getElementById('site-explorer-div');
    updateDiv = document.getElementById('site-update-div');

    namex = document.getElementById('update-name');
    village = document.getElementById('update-village');
    area = document.getElementById('update-area');
    usableArea = document.getElementById('update-usableArea');
    landuseStatus = document.getElementById('update-landuseStatus');
    registry = document.getElementById('update-registry');
    payment = document.getElementById('update-payment');
    
    // sets up everything
    setupSiteDiv();

    // Cancel Update Btn
    document.getElementById('cancel-update-btn').addEventListener('click', function()
    {
        updateDiv.classList.add("hideit");
        siteDiv.classList.remove("hideit");
    });

    // Save Update Btn
    document.getElementById('save-update-btn').addEventListener('click', function()
    {
        if(namex.value)
        {
            data[temp].name = namex.value;
            data[temp].village = village.value;
            data[temp].area = area.value;
            data[temp].usableArea = usableArea.value;
            data[temp].landuseStatus = landuseStatus.value;
            data[temp].registry = registry.value;
            data[temp].payment = payment.value;

            save();
            setupSiteDiv();
            updateDiv.classList.add("hideit");
            siteDiv.classList.remove("hideit");
        }
    });
    
}


function setupSiteDiv()
{
    siteDiv.innerHTML = "<div class='box siteBox column is-narrow'><p class='has-text-info is-size-3'>Create Site</p><div style='margin-top: 12px'><input id='new-site-name-input' type='text' class='input is-info' placeholder='Site's Name' style='width: 200px; margin-bottom: 10px;'>                        <input id='new-site-village-input' type='text' class='input is-info' placeholder='Village Name' style='width: 200px; margin-bottom: 10px;'>                                                   <button id='create-site-btn' class='button is-info is-rounded' style='width: 200px;'>Create New Site</button></div></div>";


    for(let i=0; i<data.length; i++)
    {
        console.log(data[i].name);

        siteDiv.innerHTML += "<div class='box siteBox column is-narrow'><p class='has-text-primary is-size-3'>"+ data[i].name +"</p><div class='boxInfo'><p>Total Blocks: "+ data[i].block.length +"</p><p>Total Plots: 40</p><p>Available Plots: 38</p></div><div class='boxBtns'><button class='select-btn button  is-primary'>Select</button><button class='edit-btn button is-info is-outlined'>Edit</button><button class='del-btn button is-danger is-outlined is-marginless'>Delete</button></div></div>"
    }


    createSiteBtn = document.getElementById('create-site-btn');
    selectBtns = document.getElementsByClassName('select-btn');
    editBtns = document.getElementsByClassName('edit-btn');
    delBtns = document.getElementsByClassName('del-btn');
    createSiteBtn.addEventListener('click', createSite);
    actionManager();

}


function createSite()
{
    let newSite = {};
    newSite.name = document.getElementById('new-site-name-input').value;
    newSite.village = document.getElementById('new-site-village-input').value;
    newSite.area = "";
    newSite.usableArea = "";
    newSite.landuseStatus = "";
    newSite.registry = "";
    newSite.payment = "";

    newSite.block = [];
    newSite.khasra = [];


    if(newSite.name && newSite.village)
    {
        data.push(newSite);
        save();
        setupSiteDiv();
    }
}


function actionManager()
{
    for(let i=0; i<selectBtns.length; i++)
    {
        selectBtns[i].addEventListener('click', function()
        {
            point.x = i;
            sync();
            window.location = "../view/blockExplorer.html"
        });

        editBtns[i].addEventListener('click', function()
        {
            siteEditor(i);
        });
        
        delBtns[i].addEventListener('click', function()
        {
            data.splice(i, 1);
            save();
            setupSiteDiv();
        });
    }
}

function siteEditor(i)
{
    siteDiv.classList.add("hideit");
    updateDiv.classList.remove("hideit");

    namex.value = data[i].name;
    village.value = data[i].village;
    area.value = data[i].area;
    usableArea.value = data[i].usableArea;
    landuseStatus.value = data[i].landuseStatus;
    registry.value = data[i].registry;
    payment.value = data[i].payment;

    temp = i;
}