var kSite = -1, kIndex = -1;

function setupKSiteExplorer()
{
    let kSiteExplorer = document.getElementById('k-site-explorer-div');
    kSiteExplorer.innerHTML = "";
    for(let i=0; i<siteData.length; i++)
    {
        if(!siteData[i].k) siteData[i].k = [];
        
        kSiteExplorer.innerHTML += "<a class='k-site-explorer-btn past box column margin-2 is-5'><p class='has-text-primary is-size-3'>"+siteData[i].siteName+"</p><p>Total Blocks: " + siteData[i].block.length + "</p><p>Total Plots: "+ siteData[i].allPlots +"</p><p>Total Khasra: "+ siteData[i].k.length +"</p></a>"
    }

    kSiteExplorer.innerHTML += "<a class='hideit past box column margin-2 is-5'><p class='has-text-primary is-size-3'>Jupiters Farm</p></a>"

    if(siteData.length == 0)
    {
        kSiteExplorer.innerHTML = "No Site Data to Show! Create A Site First.";
    }
    else
    {
        let kSiteExplorerBtns=document.getElementsByClassName('k-site-explorer-btn');
        for(let i=0; i<kSiteExplorerBtns.length; i++)
        {
            kSiteExplorerBtns[i].addEventListener('click', function()
            {
                document.getElementById('k-site-explorer-hider').classList.add('hideit');
                document.getElementById('k-explorer').classList.remove('hideit');
                // setupBlockExplorer(i);
                kSite = i;
                setupKData();
            });
        }
    }

    
}


document.addEventListener("DOMContentLoaded", function()
{
    // Create new khasra
    document.getElementById('k-create-btn').addEventListener('click', function()
    {
        let kObj = {};
        kObj.number = document.getElementById('k-number-input').value;
        kObj.name = document.getElementById('k-name-input').value;
        kObj.payment = document.getElementById('k-payment-input').value;
        kObj.area = document.getElementById('k-area-input').value;
        kObj.block = document.getElementById('k-block-input').value;
        kObj.fromPlot = document.getElementById('k-from-plot-input').value;
        kObj.toPlot = document.getElementById('k-to-plot-input').value;
        kObj.purchaser = document.getElementById('k-purchaser-input').value;
        kObj.legalFee = document.getElementById('k-stamp-input').value;
        kObj.registryDate = document.getElementById('k-registry-date-input').value;
        kObj.dakhil = document.getElementById('k-dakhil-input').checked;
        kObj.housing = document.getElementById('k-housing-input').checked;
        kObj.map = document.getElementById('k-map-input').checked;
        if(kObj.number)
        {
            siteData[kSite].k.push(kObj);
            console.log(siteData[kSite].k);
            saveData();
            clearKCreateDiv();
            setupKData();
            alert("Khasra Created Successfuly.");
        }
        else
        {
            alert("ERROR|Khasra number is required!");
        }
    });

    // Update old khasra
    document.getElementById('k-update-btn').addEventListener('click', function()
    {
        let kObj = {};
        kObj.number = document.getElementById('k-number-input').value;
        kObj.name = document.getElementById('k-name-input').value;
        kObj.payment = document.getElementById('k-payment-input').value;
        kObj.area = document.getElementById('k-area-input').value;
        kObj.block = document.getElementById('k-block-input').value;
        kObj.fromPlot = document.getElementById('k-from-plot-input').value;
        kObj.toPlot = document.getElementById('k-to-plot-input').value;
        kObj.purchaser = document.getElementById('k-purchaser-input').value;
        kObj.legalFee = document.getElementById('k-stamp-input').value;
        kObj.registryDate = document.getElementById('k-registry-date-input').value;
        kObj.dakhil = document.getElementById('k-dakhil-input').checked;
        kObj.housing = document.getElementById('k-housing-input').checked;
        kObj.map = document.getElementById('k-map-input').checked;

        if(kObj.number == siteData[kSite].k[kIndex].number)
        {
            siteData[kSite].k[kIndex] = kObj;
            saveData();
            clearKCreateDiv();
            setupKData();
            alert("Khasra Updates Successfuly.");
        }
        else
        {
            alert("ERROR|Wrong Khasra Number!");
        }
    });

    // Delete
    document.getElementById('k-delete-btn').addEventListener('click', function()
    {
        if(kIndex > -1 && kIndex < siteData[kSite].k.length)
        {
            siteData[kSite].k.splice(kIndex, 1);
            saveData();
            setupKData();
            clearKCreateDiv();
            alert("Khasra Deleted!");
        }
        else
        {
            alert("ERROR|No data found!");
        }
    });

    // search
    document.getElementById('k-search-btn').addEventListener('click', function()
    {
        let kStr = document.getElementById('k-search-input').value;
        if(kStr == "")
        {
            setupKData();
            return;
        }

        document.getElementById("k-result").innerHTML = "";
        for(let i=0; i<siteData[kSite].k.length; i++)
        {
            if(siteData[kSite].k[i].number == kStr)
                printK(kSite, i);

            else if(siteData[kSite].k[i].name.indexOf(kStr) != -1)
                printK(kSite, i);
        }


        let kBtns2 = document.getElementsByClassName('k-list')
        for(let i=0; i<kBtns2.length; i++)
        {
            kBtns2[i].addEventListener('click', function()
            {
                let ii = parseInt(kBtns2[i].getAttribute('data-k'));
                kIndex = ii;
                let kObj = siteData[kSite].k[kIndex];

                document.getElementById('k-number-input').value = kObj.number;
                document.getElementById('k-name-input').value = kObj.name;
                document.getElementById('k-payment-input').value = kObj.payment;
                document.getElementById('k-area-input').value = kObj.area;
                document.getElementById('k-block-input').value = kObj.block;
                document.getElementById('k-from-plot-input').value = kObj.fromPlot;
                document.getElementById('k-to-plot-input').value = kObj.toPlot;
                document.getElementById('k-purchaser-input').value = kObj.purchaser;
                document.getElementById('k-stamp-input').value = kObj.legalFee;
                document.getElementById('k-registry-date-input').value = kObj.registryDate;
                document.getElementById('k-dakhil-input').checked = kObj.dakhil;
                document.getElementById('k-housing-input').checked = kObj.housing;
                document.getElementById('k-map-input').checked = kObj.map;
            });
        }
    });
});



function setupKData()
{
    document.getElementById("k-result").innerHTML = "";
    for(let i=0; i<siteData[kSite].k.length; i++)
    {
        printK(kSite, i);
    }

    let kBtns = document.getElementsByClassName('k-list')
    for(let i=0; i<kBtns.length; i++)
    {
        kBtns[i].addEventListener('click', function()
        {
            kIndex = i;
            let kObj = siteData[kSite].k[i];

            document.getElementById('k-number-input').value = kObj.number;
            document.getElementById('k-name-input').value = kObj.name;
            document.getElementById('k-payment-input').value = kObj.payment;
            document.getElementById('k-area-input').value = kObj.area;
            document.getElementById('k-block-input').value = kObj.block;
            document.getElementById('k-from-plot-input').value = kObj.fromPlot;
            document.getElementById('k-to-plot-input').value = kObj.toPlot;
            document.getElementById('k-purchaser-input').value = kObj.purchaser;
            document.getElementById('k-stamp-input').value = kObj.legalFee;
            document.getElementById('k-registry-date-input').value = kObj.registryDate;
            document.getElementById('k-dakhil-input').checked = kObj.dakhil;
            document.getElementById('k-housing-input').checked = kObj.housing;
            document.getElementById('k-map-input').checked = kObj.map;
        });
    }
}

function clearKCreateDiv()
{
    document.getElementById('k-number-input').value = "";
    document.getElementById('k-name-input').value = "";
    document.getElementById('k-payment-input').value = "";
    document.getElementById('k-area-input').value = "";
    document.getElementById('k-block-input').value = "";
    document.getElementById('k-from-plot-input').value = "";
    document.getElementById('k-to-plot-input').value = "";
    document.getElementById('k-purchaser-input').value = "";
    document.getElementById('k-stamp-input').value = "";
    document.getElementById('k-registry-date-input').value = "";
    document.getElementById('k-dakhil-input').checked = "";
    document.getElementById('k-housing-input').checked = "";
    document.getElementById('k-map-input').checked = "";

    kIndex = -1;
}

function printK(kx, ky)
{
    let kxy = siteData[kx].k[ky];
    document.getElementById("k-result").innerHTML += "<a class='k-list box' href='#k-explorer' data-k='"+ky+"'><p>Khasra Number: "+kxy.number+"</p><p>Farmers: "+kxy.name+"</p></a>";
}