var sd1, sd2, sd3;
var sdx, sdy, sdz;

function setupSiteExplorer()
{
    let siteExplorer = document.getElementById('site-explorer-div');
    siteExplorer.innerHTML = "";
    for(let i=0; i<siteData.length; i++)
    {
        siteExplorer.innerHTML += "<a class='site-explorer-btn past box column margin-2 is-5'><p class='has-text-primary is-size-3'>"+siteData[i].siteName+"</p><p>Total Blocks: " + siteData[i].block.length + "</p><p>Total Plots: "+ siteData[i].allPlots +"</p><p>Available Plots: "+ siteData[i].availPlots +"</p></a>"
    }

    siteExplorer.innerHTML += "<a class='hideit past box column margin-2 is-5'><p class='has-text-primary is-size-3'>Jupiters Farm</p></a>"

    if(siteData.length == 0)
    {
        siteExplorer.innerHTML = "No Site Data to Show! Create A Site First.";
    }
    else
    {
        let siteExplorerBtns=document.getElementsByClassName('site-explorer-btn');
        for(let i=0; i<siteExplorerBtns.length; i++)
        {
            siteExplorerBtns[i].addEventListener('click', function()
            {
                document.getElementById('site-explorer-hider').classList.add('hideit');
                document.getElementById('block-explorer').classList.remove('hideit');
                setupBlockExplorer(i);
            });
        }
    }
}


function setupBlockExplorer(siteIndex)
{
    
    let setupBlockExplorerBtns = document.getElementsByClassName('block-explorer-btn');

    document.getElementById('seller-name-input-update').value = siteData[siteIndex].sellerName;
    document.getElementById('vil-name-input-update').value = siteData[siteIndex].vilName;
    document.getElementById('site-name-input-update').value = siteData[siteIndex].siteName;
    document.getElementById('total-area-input-update').value = siteData[siteIndex].totalArea;
    document.getElementById('usable-area-input-update').value = siteData[siteIndex].usableArea;
    document.getElementById('landuse-input-update').value = siteData[siteIndex].landuse;
    document.getElementById('site-registry-input-update').value = siteData[siteIndex].registry;
    document.getElementById('site-payment-input-update').value = siteData[siteIndex].payment;
    document.getElementById("block-explorer-avail-plots").innerHTML = "";

    for(let ii=0; ii<siteData[siteIndex].block.length; ii++)
    {
        for(let jj=1; jj<siteData[siteIndex].block[ii].plot.length; jj++)
        {
            if(siteData[siteIndex].block[ii].plot[jj]) document.getElementById("block-explorer-avail-plots").innerHTML += "<li>"+siteData[siteIndex].block[ii].id + "" + siteData[siteIndex].block[ii].plotid[jj]+"</li>";

        }
    }

    document.getElementById('update-site-btn').addEventListener('click', function()
    {
        siteData[siteIndex].sellerName = document.getElementById('seller-name-input-update').value;
        siteData[siteIndex].vilName = document.getElementById('vil-name-input-update').value;
        siteData[siteIndex].siteName = document.getElementById('site-name-input-update').value;
        siteData[siteIndex].totalArea = document.getElementById('total-area-input-update').value;
        siteData[siteIndex].usableArea = document.getElementById('usable-area-input-update').value;
        siteData[siteIndex].landuse = document.getElementById('landuse-input-update').value;
        siteData[siteIndex].registry = document.getElementById('site-registry-input-update').value;
        siteData[siteIndex].payment = document.getElementById('site-payment-input-update').value;
        saveData();
        alert("Site data updated.");
        // setupSiteDropdown();
        // setupSiteExplorer();
    });

    document.getElementById('reset-site-btn').addEventListener('click', function()
    {
        document.getElementById('seller-name-input-update').value = siteData[siteIndex].sellerName;
        document.getElementById('vil-name-input-update').value = siteData[siteIndex].vilName;
        document.getElementById('site-name-input-update').value = siteData[siteIndex].siteName;
        document.getElementById('total-area-input-update').value = siteData[siteIndex].totalArea;
        document.getElementById('usable-area-input-update').value = siteData[siteIndex].usableArea;
        document.getElementById('landuse-input-update').value = siteData[siteIndex].landuse;
        document.getElementById('site-registry-input-update').value = siteData[siteIndex].registry;
        document.getElementById('site-payment-input-update').value = siteData[siteIndex].payment;
        alert("Data reset completed.");
    });

    document.getElementById('delete-site-btn').addEventListener('click', function()
    {
        siteData.splice(siteIndex, 1);
        rawData.hide = true;
        saveData(true);
    });

    document.getElementById('dashboard-menu-btn').style.backgroundColor = "grey";//"#3d3d3d";
    document.getElementById('dashboard-menu-btn').style.color = "whitesmoke";

    for(let i=0; i<setupBlockExplorerBtns.length; i++)
    {
        if(i >= siteData[siteIndex].block.length) break;

        setupBlockExplorerBtns[i].classList.remove('hideit');
        setupBlockExplorerBtns[i].firstElementChild.innerText = siteData[siteIndex].block[i].id;
        setupBlockExplorerBtns[i].lastElementChild.innerText = "" + siteData[siteIndex].block[i].total + " | " + (parseInt(siteData[siteIndex].block[i].total) - siteData[siteIndex].block[i].sale.length);
        setupBlockExplorerBtns[i].addEventListener('click', function()
        {
            document.getElementById('block-explorer').classList.add('hideit');
            document.getElementById('plot-explorer').classList.remove('hideit');
            setupPlotExplorer(siteIndex, i, true);
        });
    }

    setupPlotdata(siteIndex);
}


function setupPlotExplorer(siteIndex, blockIndex, addEvent)
{
    emptySaleUpdater();
    for(let i=1; i<siteData[siteIndex].block[blockIndex].plot.length; i++)
    {
        if(siteData[siteIndex].block[blockIndex].plot[i]) document.getElementById("plot-explorer-avail-plots").innerHTML += "<li>"+siteData[siteIndex].block[blockIndex].id + "" + siteData[siteIndex].block[blockIndex].plotid[i] +"</li>";
        else document.getElementById("plot-explorer-selled-plots").innerHTML += "<li><a class='zzz-one'>"+siteData[siteIndex].block[blockIndex].id + "" + siteData[siteIndex].block[blockIndex].plotid[i] +"</a></li>";
    }

    printSaleList(siteIndex, blockIndex);
    printRefundList(siteIndex, blockIndex);

    printTransferList(siteIndex, blockIndex);

    // add eventlisteners to all edit btns to load it into editor
    let z1 = document.getElementsByClassName('zzz-one');
    for(let i=0; i<z1.length; i++)
    {
        z1[i].addEventListener("click", function(){ZZZ(siteIndex, blockIndex, i)});
        // z2[i].addEventListener("click", function(){ZZZ(siteIndex, blockIndex, i)});
    }

    // avoid event overlapping
    if(addEvent)
    {
        // sale update
        document.getElementById('update-sale-btn').addEventListener('click', function()
        {
            let sI = sd3;//parseInt(document.getElementById('sale-plot-select-update').value);

            siteData[siteIndex].block[blockIndex].sale[sI].cusName = document.getElementById('sale-name-input-update').value;
            siteData[siteIndex].block[blockIndex].sale[sI].cusMobile = document.getElementById('sale-mobile-input-update').value;
            siteData[siteIndex].block[blockIndex].sale[sI].cusAddress = document.getElementById('sale-address-input-update').value;
            siteData[siteIndex].block[blockIndex].sale[sI].plotSize = document.getElementById('sale-plot-size-input-update').value;
            siteData[siteIndex].block[blockIndex].sale[sI].plotRegistry = document.getElementById('plot-registry-input-update').checked;
            siteData[siteIndex].block[blockIndex].sale[sI].plotDakhilkari = document.getElementById('plot-dakhilkari-input-update').checked;
            siteData[siteIndex].block[blockIndex].sale[sI].plotKabza = document.getElementById('plot-kabza-input-update').checked;
            siteData[siteIndex].block[blockIndex].sale[sI].salePayment = document.getElementById('sale-payment-input-update').value;

            saveData();
            alert("Sale data updated.");
            printSaleList(siteIndex, blockIndex);

        });

        // reset sale
        document.getElementById('reset-sale-btn').addEventListener("click", function(){ZZZ(siteIndex, blockIndex, (parseInt(document.getElementById('sale-plot-select-update').value)))});

        // delete sale
        document.getElementById('delete-sale-btn').addEventListener('click', function()
        {
            let tempInd = sd3;
            let tempInd2 = siteData[siteIndex].block[blockIndex].sale[tempInd].plot;
            siteData[siteIndex].block[blockIndex].sale.splice(tempInd, 1);
            siteData[siteIndex].block[blockIndex].plot[tempInd2] = true;
            siteData[siteIndex].availPlots++;
            saveData();
            alert("Site data deleted.");
            setupPlotExplorer(siteIndex, blockIndex);
        });

        // Refund Plot
        // delete sale
        document.getElementById('refund-sale-btn').addEventListener('click', function()
        {
            let tempInd = sd3;
            let tempInd2 = siteData[siteIndex].block[blockIndex].sale[tempInd].plot;
            let tempObj = siteData[siteIndex].block[blockIndex].sale[tempInd];
            if(!siteData[siteIndex].block[blockIndex].refund) siteData[siteIndex].block[blockIndex].refund = [];
            // siteData[siteIndex].refund.push(tempObj);
            let tempNewObj = {};
            tempNewObj.cusName = tempObj.cusName;
            tempNewObj.plot = siteData[siteIndex].block[blockIndex].plotid[tempObj.plot];
            tempNewObj.salePayment = document.getElementById('sale-payment-input-update').value;

            siteData[siteIndex].block[blockIndex].refund.push(tempNewObj);
            console.log(siteData[siteIndex].block[blockIndex].refund);
            siteData[siteIndex].block[blockIndex].sale.splice(tempInd, 1);
            siteData[siteIndex].block[blockIndex].plot[tempInd2] = true;
            siteData[siteIndex].availPlots++;
            saveData();
            alert("Plot data refunded.");
            setupPlotExplorer(siteIndex, blockIndex);
        });

        // transfer name
        document.getElementById('transfer-name-btn').addEventListener('click', function()
        {
            let tempNameTransObg = {};
            tempNameTransObg.type = 'Name Transfer';
            tempNameTransObg.old = siteData[sd1].block[sd2].sale[sd3].cusName;
            tempNameTransObg.new = document.getElementById('sale-name-input-update').value;
            tempNameTransObg.plot = siteData[sd1].block[sd2].plotid[siteData[sd1].block[sd2].sale[sd3].plot];

            siteData[sd1].block[sd2].sale[sd3].cusName = document.getElementById('sale-name-input-update').value;
            if(!siteData[sd1].block[sd2].transferData) siteData[sd1].block[sd2].transferData = [];
            // siteData[sd1].block[sd2].sale[sd3].transferData.push(tempNameTransObg);
            siteData[sd1].block[sd2].transferData.push(tempNameTransObg);
            console.log(siteData[sd1].block[sd2].transferData);
            saveData();
            alert("Name transfer complete.");
            printSaleList(siteIndex, blockIndex);
        });

        // transfer plot
        document.getElementById('transfer-plot-btn').addEventListener('click', function()
        {
            let tempInd2 = siteData[siteIndex].block[blockIndex].sale[sd3].plot;
            
            // creating data
            let tempNameTransObg = {};
            tempNameTransObg.type = 'Plot Transfer';
            tempNameTransObg.old = siteData[sd1].siteName + " " + siteData[sd1].block[sd2].id + siteData[sd1].block[sd2].plotid[siteData[sd1].block[sd2].sale[sd3].plot];
            tempNameTransObg.plot = siteData[sd1].block[sd2].plotid[siteData[sd1].block[sd2].sale[sd3].plot];
            
            // creating new sale
            let newSale = siteData[sd1].block[sd2].sale[sd3];
            newSale.plotSite = sdx.value;
            newSale.plotBlock = sdy.value;
            newSale.plot = sdz.value;
            
            tempNameTransObg.new = siteData[newSale.plotSite].siteName + " " + siteData[newSale.plotSite].block[newSale.plotBlock].id + " " + siteData[newSale.plotSite].block[newSale.plotBlock].plotid[newSale.plot];

            if(!siteData[sd1].block[sd2].transferData) siteData[sd1].block[sd2].transferData = [];
            siteData[sd1].block[sd2].transferData.push(tempNameTransObg);
            console.log(siteData[sd1].block[sd2].transferData);

            siteData[newSale.plotSite].block[newSale.plotBlock].sale.push(newSale);
            siteData[newSale.plotSite].block[newSale.plotBlock].plot[newSale.plot] = false;
            siteData[newSale.plotSite].availPlots--;
            siteData[newSale.plotSite].block[newSale.plotBlock].sale.sort(function(a, b){return parseInt(a.plot)-parseInt(b.plot)});


            // deleting old sale
            siteData[siteIndex].block[blockIndex].sale.splice(sd3, 1);
            siteData[siteIndex].block[blockIndex].plot[tempInd2] = true;
            siteData[siteIndex].availPlots++;

            console.log(newSale.transferData);
            rawData.hide = true;
            saveData(true);
            alert("Plot transfer complete.");
        });

    }
}

// load sale data into input fields.
function ZZZ(siteIndex, blockIndex, saleIndex)
{
    sd1 = parseInt(siteIndex);
    sd2 = parseInt(blockIndex);
    sd3 = parseInt(saleIndex);

    document.getElementById('sale-name-input-update').value = siteData[siteIndex].block[blockIndex].sale[saleIndex].cusName;
    document.getElementById('sale-mobile-input-update').value = siteData[siteIndex].block[blockIndex].sale[saleIndex].cusMobile;
    document.getElementById('sale-address-input-update').value = siteData[siteIndex].block[blockIndex].sale[saleIndex].cusAddress;
    document.getElementById('sale-plot-size-input-update').value = siteData[siteIndex].block[blockIndex].sale[saleIndex].plotSize;
    document.getElementById('plot-registry-input-update').checked = siteData[siteIndex].block[blockIndex].sale[saleIndex].plotRegistry;
    document.getElementById('plot-dakhilkari-input-update').checked = siteData[siteIndex].block[blockIndex].sale[saleIndex].plotDakhilkari;
    document.getElementById('plot-kabza-input-update').checked = siteData[siteIndex].block[blockIndex].sale[saleIndex].plotKabza;
    document.getElementById('sale-payment-input-update').value = siteData[siteIndex].block[blockIndex].sale[saleIndex].salePayment;

    document.getElementById('sale-site-select-update').textContent = siteData[siteIndex].siteName;
    document.getElementById('sale-block-select-update').textContent = siteData[siteIndex].block[blockIndex].id;
    document.getElementById('sale-plot-select-update').textContent = siteData[siteIndex].block[blockIndex].id+" "+siteData[siteIndex].block[blockIndex].plotid[siteData[siteIndex].block[blockIndex].sale[saleIndex].plot];
    document.getElementById('sale-plot-select-update').value = saleIndex;

}

function emptySaleUpdater()
{
    document.getElementById("plot-explorer-avail-plots").innerHTML = "";
    document.getElementById("plot-explorer-selled-plots").innerHTML = "";
    

    document.getElementById('sale-name-input-update').value = "";
    document.getElementById('sale-mobile-input-update').value = "";
    document.getElementById('sale-address-input-update').value = "";
    document.getElementById('sale-plot-size-input-update').value = "";
    document.getElementById('plot-registry-input-update').checked = false;
    document.getElementById('plot-dakhilkari-input-update').checked = false;
    document.getElementById('plot-kabza-input-update').checked = false;
    document.getElementById('sale-payment-input-update').value = "";

    document.getElementById('sale-site-select-update').textContent = "Select Site";
    document.getElementById('sale-block-select-update').textContent = "Block or Sector";
    document.getElementById('sale-plot-select-update').textContent = "Plot";
    document.getElementById('sale-plot-select-update').value = "";
}

function printSaleList(siteIndex, blockIndex)
{
    document.getElementById("sale-list-div").innerHTML = "";

    for(let i=0; i<siteData[siteIndex].block[blockIndex].sale.length; i++)
    {
        document.getElementById("sale-list-div").innerHTML += "<a class='zzz-two box column margin-2 is-narrow' href='#plot-explorer'><p class='font-size-3'>"+siteData[siteIndex].block[blockIndex].id + siteData[siteIndex].block[blockIndex].plotid[siteData[siteIndex].block[blockIndex].sale[i].plot] + "</p><p>Name: "+siteData[siteIndex].block[blockIndex].sale[i].cusName+"</p><p>Phone: "+siteData[siteIndex].block[blockIndex].sale[i].cusMobile+"</p></a>";
    }

    document.getElementById("sale-list-div").innerHTML += "<a class='box column margin-2 is-narrow hideit'></a>"

    let z2 = document.getElementsByClassName('zzz-two');

    for(let i=0; i<z2.length; i++)
    {
        z2[i].addEventListener("click", function(){ZZZ(siteIndex, blockIndex, i)});
    }
}


document.addEventListener("DOMContentLoaded", function () 
{
    sdx = document.getElementById('sale-site-select-transfer');
    sdy = document.getElementById('sale-block-select-transfer');
    sdz = document.getElementById('sale-plot-select-transfer');

    sdx.options.length = 1;
    sdy.options.length = 1;
    sdz.options.length = 1;
});


function setupPlotTransfer()
{
    for(let i=0; i<siteData.length; i++)
    {
        let z = document.createElement('option');
        z.text = siteData[i].siteName;
        z.value = i;
        sdx.add(z);
    }

    sdx.addEventListener('change', function()
    {
        sdz.options.length = 1;
        sdy.options.length = 1;
        for(let i=0; i<siteData[sdx.value].block.length; i++)
        {
            let z = document.createElement('option');
            z.text = siteData[sdx.value].block[i].id;
            z.value = i;
            sdy.add(z);
        }
    });

    sdy.addEventListener('change', function()
    {
        sdz.options.length = 1;
        for(let i=0; i<siteData[sdx.value].block[sdy.value].plot.length; i++)
        {
            if(siteData[sdx.value].block[sdy.value].plot[i])
            {
                let z = document.createElement('option');
                z.text = siteData[sdx.value].block[sdy.value].id +" "+ siteData[sdx.value].block[sdy.value].plotid[i];
                z.value = i;
                sdz.add(z);
            }
        }
    });
}


function printTransferList(siteIndex, blockIndex)
{
    document.getElementById("transfer-list-div").innerHTML = "";
    document.getElementById('transfer-list-div').innerHTML += "<p style='width:100%; text-align:centre;'>Plot Transfer Data</p>"

    for(let i=0; i<siteData[siteIndex].block[blockIndex].transferData.length; i++)
    {
        document.getElementById("transfer-list-div").innerHTML += "<a class='box column margin-2 is-narrow'><p class='font-size-3'>"+siteData[siteIndex].block[blockIndex].transferData[i].plot+"</p><p> Transfer Type: "+siteData[siteIndex].block[blockIndex].transferData[i].type+"</p><p>Old Data: "+ siteData[siteIndex].block[blockIndex].transferData[i].old +"</p><p>New Data: "+ siteData[siteIndex].block[blockIndex].transferData[i].new +"</p></a>";
    }

    document.getElementById("transfer-list-div").innerHTML += "<a class='hideit box column margin-2 is-narrow' href='#plot-explorer'><p class='font-size-3'>A1</p><p>Name: Parth Sarthee</p><p>Phone: 8687452468</p></a>";
}

function printRefundList(siteIndex, blockIndex)
{
    document.getElementById("refund-list-div").innerHTML = "";
    document.getElementById('refund-list-div').innerHTML += "<p style='width:100%; text-align:centre;'>Plot Refund Data</p>"
    
    for(let i=0; i<siteData[siteIndex].block[blockIndex].refund.length; i++)
    {
        document.getElementById("refund-list-div").innerHTML += "<a class='box column margin-2 is-narrow'><p class='font-size-3'>"+siteData[siteIndex].block[blockIndex].refund[i].plot+"</p><p>Name: "+ siteData[siteIndex].block[blockIndex].refund[i].cusName +"</p><textarea class='textarea'>Details: "+ siteData[siteIndex].block[blockIndex].refund[i].salePayment +"</textarea></a>";
    }

    document.getElementById("refund-list-div").innerHTML += "<a class='hideit box column margin-2 is-narrow' href='#plot-explorer'><p class='font-size-3'>A1</p><p>Name: Parth Sarthee</p><p>Phone: 8687452468</p></a>";
}

function setupPlotdata(siteIndex)
{
    let temp=0;

    // Printing inputs
    for(let i=0; i<siteData[siteIndex].block.length; i++)
    {
        temp = Math.max(temp, siteData[siteIndex].block[i].plot.length);
    }
    document.getElementById('plot-data-div').innerHTML = "<div class='field'><div class='control columns'><div class='column is-narrow'><p class='bzd-index'>No.</p></div><div class='column bd-a'>A|S1</div><div class='column bd-b'>B|S2</div><div class='column bd-c'>C|S3</div><div class='column bd-d'>D|4</div><div class='column  bd-e'>E|5</div><div class='column bd-f'>F|6</div><div class='column bd-g'>G|7</div></div></div>"
    for(let i=1; i<temp; i++)
    {
        document.getElementById('plot-data-div').innerHTML+= "<div class='field'><div class='control columns'><div class='column is-narrow'><p class='bzd-index'>"+i+"</p></div><div class='column'><input class='hideit bd-a input is-primary' type='number' placeholder='A|1'></div><div class='column'><input class='hideit bd-b input is-primary' type='number' placeholder='B|2'></div><div class='column'><input class='hideit bd-c input is-primary' type='number' placeholder='C|3'></div><div class='column'><input class='hideit bd-d input is-primary' type='number' placeholder='D|4'></div><div class='column'><input class='hideit bd-e input is-primary' type='number' placeholder='E|5'></div><div class='column'><input class='hideit bd-f input is-primary' type='number' placeholder='F|6'></div><div class='column'><input class='hideit bd-g input is-primary' type='number' placeholder='G|7'></div></div></div>"
    }


    // getting them back
    let tb = new Array(7);
    tb[0] = document.getElementsByClassName('bd-a');
    tb[1] = document.getElementsByClassName('bd-b');
    tb[2] = document.getElementsByClassName('bd-c');
    tb[3] = document.getElementsByClassName('bd-d');
    tb[4] = document.getElementsByClassName('bd-e');
    tb[5] = document.getElementsByClassName('bd-f');
    tb[6] = document.getElementsByClassName('bd-g');

    for(let i=0; i<siteData[siteIndex].block.length; i++)
    {
        for(let j=1; j<siteData[siteIndex].block[i].plot.length; j++)
        {
            tb[i][j].classList.remove('hideit');
            tb[i][j].value = siteData[siteIndex].block[i].tplot[j];
        }
    }

    document.getElementById('plot-data-btn').addEventListener('click', function()
    {
        if(siteData[siteIndex].allPlots == siteData[siteIndex].availPlots)
        {
            for(let i=0; i<siteData[siteIndex].block.length; i++)
            {
                for(let j=1; j<siteData[siteIndex].block[i].plot.length; j++)
                {
                    siteData[siteIndex].block[i].tplot[j] = parseInt(tb[i][j].value);
                }
            }
    
            plotdataAlgo(siteIndex);
        }
        else
            alert('Plot data can not be modified after sales. Delete the all the sales data to modify plot data of this site.');
    });
}

function plotdataAlgo(siteIndex)
{
    let ttt = 0, counter = 1;
    for(let i=0; i<siteData[siteIndex].block.length; i++)
    {
        counter = 1;
        for(let j=1; j<siteData[siteIndex].block[i].plot.length; j++)
        {
            if(counter >= siteData[siteIndex].block[i].plot.length)
            {
                siteData[siteIndex].block[i].tplot[j] = 0;
            }
            else
            {
                ttt = siteData[siteIndex].block[i].tplot[j];
                if(ttt < 2)
                {
                    siteData[siteIndex].block[i].tplot[j] = 1;
                    siteData[siteIndex].block[i].plotid[counter] = j.toString(); 
                    counter++;
                }
                else
                { 
                    for(let k=1; k<=ttt; k++)
                    {
                        siteData[siteIndex].block[i].plotid[counter] = j+'/'+(k-1);
                        if(k == 1) siteData[siteIndex].block[i].plotid[counter] = j;
                        counter++;
                    }
                }
            }
        }
    }

    saveData();
}