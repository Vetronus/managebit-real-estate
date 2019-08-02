let block = [], sellerName, vilName, siteName, totalArea, usableArea, landuse, registry, payment;

var createSiteBtn, clearSiteBtn;
let tempAllPlots = 0;

document.addEventListener("DOMContentLoaded", function ()
{
    sellerName = document.getElementById('seller-name-input');
    vilName = document.getElementById('vil-name-input');
    siteName = document.getElementById('site-name-input');
    totalArea = document.getElementById('total-area-input');
    usableArea = document.getElementById('usable-area-input');
    landuse = document.getElementById('landuse-input');
    registry = document.getElementById('site-registry-input');
    payment = document.getElementById('site-payment-input');
    
    createSiteBtn = document.getElementById('create-site-btn');
    clearSiteBtn = document.getElementById('clear-site-btn');
    
    createSiteBtn.addEventListener('click', createSite);
    clearSiteBtn.addEventListener('click', clearSiteFields);
});

function createSite()
{
    let newSite = {};
    newSite.sellerName = sellerName.value;
    newSite.vilName = vilName.value;
    newSite.siteName = siteName.value;
    newSite.totalArea = totalArea.value;
    newSite.usableArea = usableArea.value;
    newSite.landuse = landuse.value;
    newSite.registry = registry.value;
    newSite.payment = payment.value;
    newSite.block = setupBlock();
    newSite.k = [];
    newSite.allPlots = tempAllPlots;
    newSite.availPlots = tempAllPlots;
    siteData.push(newSite);
    saveData();
    clearSiteFields();
    setupSiteDropdown();
    setupSiteExplorer();
    alert("Site data created.");
}

function setupBlock()
{
    let tempBlock = [];
    tempAllPlots = 0;
    if(document.getElementById('site-block-a-input').value)
    {
        tempBlock.push({});
        // tempBlock[0].id = 'A';
        // if(document.getElementById("division-type-select").value == 2) tempBlock[0].id = '1S ';
        tempBlock[0].id = document.getElementById("division-type-select-0").value
        tempBlock[0].total = document.getElementById('site-block-a-input').value;
        tempBlock[0].free = 0;
        tempBlock[0].sale = [];
        tempBlock[0].plot = [];
        tempBlock[0].tplot = [];
        tempBlock[0].plotid = [];
        tempBlock[0].transferData = [];
        tempBlock[0].refund = [];

        tempBlock[0].plot.push(false);
        tempBlock[0].tplot.push(0);
        tempBlock[0].plotid.push(-1);
        for(let i=1; i<= tempBlock[0].total; i++)
        {
            tempBlock[0].plot.push(true);
            tempBlock[0].tplot.push(1);
            tempBlock[0].plotid.push(i);
        }

        tempAllPlots +=  parseInt(tempBlock[0].total);
    }
    if(document.getElementById('site-block-b-input').value)
    {
        tempBlock.push({});
        // tempBlock[1].id = 'B'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[1].id = '2S ';
        tempBlock[1].id = document.getElementById("division-type-select-1").value
        tempBlock[1].total = document.getElementById('site-block-b-input').value;
        tempBlock[1].free = 0;
        tempBlock[1].sale = [];
        tempBlock[1].plot = [];
        tempBlock[1].tplot = [];
        tempBlock[1].plotid = [];
        tempBlock[1].transferData = [];
        tempBlock[1].refund = [];

        tempBlock[1].plot.push(false);
        tempBlock[1].tplot.push(0);
        tempBlock[1].plotid.push(-1);
        for(let i=1; i<= tempBlock[1].total; i++)
        {
            tempBlock[1].plot.push(true);
            tempBlock[1].tplot.push(1);
            tempBlock[1].plotid.push(i);
        }

        tempAllPlots +=  parseInt(tempBlock[1].total);        
    }
    if(document.getElementById('site-block-c-input').value)
    {
        tempBlock.push({});
        // tempBlock[2].id = 'C'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[2].id = '3S ';
        tempBlock[2].id = document.getElementById("division-type-select-2").value
        tempBlock[2].total = document.getElementById('site-block-c-input').value;
        tempBlock[2].free = 0;
        tempBlock[2].sale = [];
        tempBlock[2].plot = [];
        tempBlock[2].tplot = [];
        tempBlock[2].plotid = [];
        tempBlock[2].transferData = [];
        tempBlock[2].refund = [];

        tempBlock[2].plot.push(false);
        tempBlock[2].tplot.push(0);
        tempBlock[2].plotid.push(-1);
        tempAllPlots +=  parseInt(tempBlock[2].total);
        for(let i=1; i<= tempBlock[2].total; i++)
        {
            tempBlock[2].plot.push(true);
            tempBlock[2].tplot.push(1);
            tempBlock[2].plotid.push(i);
        }
    }
    if(document.getElementById('site-block-d-input').value)
    {
        tempBlock.push({});
        // tempBlock[3].id = 'D'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[3].id = '4S ';
        tempBlock[3].id = document.getElementById("division-type-select-3").value
        tempBlock[3].total = document.getElementById('site-block-d-input').value;
        tempBlock[3].free = 0;
        tempBlock[3].sale = [];
        tempBlock[3].plot = [];
        tempBlock[3].tplot = [];
        tempBlock[3].plotid = [];
        tempBlock[3].transferData = [];
        tempBlock[3].refund = [];

        tempBlock[3].plot.push(false);
        tempBlock[3].tplot.push(0);
        tempBlock[3].plotid.push(-1);
        tempAllPlots +=  parseInt(tempBlock[3].total);
        for(let i=1; i<= tempBlock[3].total; i++)
        {
            tempBlock[3].plot.push(true);
            tempBlock[3].tplot.push(1);
            tempBlock[3].plotid.push(i);
        }
    }
    if(document.getElementById('site-block-e-input').value)
    {
        tempBlock.push({});
        // tempBlock[4].id = 'E'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[4].id = '5S ';
        tempBlock[4].id = document.getElementById("division-type-select-4").value
        tempBlock[4].total = document.getElementById('site-block-e-input').value;
        tempBlock[4].free = 0;
        tempBlock[4].sale = [];
        tempBlock[4].plot = [];
        tempBlock[4].tplot = [];
        tempBlock[4].plotid = [];
        tempBlock[4].transferData = [];
        tempBlock[4].refund = [];

        tempBlock[4].plot.push(false);
        tempBlock[4].tplot.push(0);
        tempBlock[4].plotid.push(-1);
        tempAllPlots +=  parseInt(tempBlock[4].total);

        for(let i=1; i<= tempBlock[4].total; i++)
        {
            tempBlock[4].plot.push(true);
            tempBlock[4].tplot.push(1);
            tempBlock[4].plotid.push(i);
        }
    }
    if(document.getElementById('site-block-f-input').value)
    {
        tempBlock.push({});
        // tempBlock[5].id = 'F'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[5].id = '6S ';
        tempBlock[5].id = document.getElementById("division-type-select-5").value
        tempBlock[5].total = document.getElementById('site-block-f-input').value;
        tempBlock[5].free = 0;
        tempBlock[5].sale = [];
        tempBlock[5].plot = [];
        tempBlock[5].tplot = [];
        tempBlock[5].plotid = [];
        tempBlock[5].transferData = [];
        tempBlock[5].refund = [];

        tempBlock[5].plot.push(false);
        tempBlock[5].tplot.push(0);
        tempBlock[5].plotid.push(-1);
        tempAllPlots +=  parseInt(tempBlock[5].total);
        for(let i=1; i<= tempBlock[5].total; i++)
        {
            tempBlock[5].plot.push(true);
            tempBlock[5].tplot.push(1);
            tempBlock[5].plotid.push(i);
        }
    }
    if(document.getElementById('site-block-g-input').value)
    {
        tempBlock.push({});
        // tempBlock[6].id = 'G'
        // if(document.getElementById("division-type-select").value == 2) tempBlock[6].id = '7S ';
        tempBlock[6].id = document.getElementById("division-type-select-6").value
        tempBlock[6].total = document.getElementById('site-block-g-input').value;
        tempBlock[6].free = 0;
        tempBlock[6].sale = [];
        tempBlock[6].plot = [];
        tempBlock[6].tplot = [];
        tempBlock[6].plotid = [];
        tempBlock[6].transferData = [];
        tempBlock[6].refund = [];

        tempBlock[6].plot.push(false);
        tempBlock[6].tplot.push(0);
        tempBlock[6].plotid.push(-1);
        tempAllPlots +=  parseInt(tempBlock[6].total);
        for(let i=1; i<= tempBlock[6].total; i++)
        {
            tempBlock[6].plot.push(true);
            tempBlock[6].tplot.push(1);
            tempBlock[6].plotid.push(i);
        }
    }

    return tempBlock;
}

function clearSiteFields()
{
    sellerName.value = "";
    vilName.value = "";
    siteName.value = "";
    totalArea.value = "";
    usableArea.value = "";
    landuse.value = "";
    registry.value = "";
    payment.value = "";
    document.getElementById('site-block-a-input').value = "";
    document.getElementById('site-block-b-input').value = "";
    document.getElementById('site-block-c-input').value = "";
    document.getElementById('site-block-d-input').value = "";
    document.getElementById('site-block-e-input').value = "";
    document.getElementById('site-block-f-input').value = "";
    document.getElementById('site-block-g-input').value = "";
}