var namex, mobile, address, site, block, plotx, ploty, size, payment, devCharges, plotRegistry, plotKabza, createSaleBtn, clearBtn, tsite, tblock, tempSale;

function boot()
{
    namex = document.getElementById('name-input');
    mobile = document.getElementById('mobile-input');
    address = document.getElementById('address-input');
    site = document.getElementById('site-select');
    block = document.getElementById('block-select');
    plotx = document.getElementById('plotx-input');
    ploty = document.getElementById('ploty-input');
    size = document.getElementById('size-input');
    payment = document.getElementById('payment-input');
    devCharges = document.getElementById('dev-charges-input');
    plotRegistry = document.getElementById('plot-registry-input');
    plotKabza = document.getElementById('plot-kabza-input');

    tsite=document.getElementById('transfer-site-select');
    tblock=document.getElementById('transfer-block-select');

    createSaleBtn = document.getElementById('create-sale-btn');
    clearBtn = document.getElementById('clear-sale-btn');

    tempSale = data[point.x].block[point.y].sale[point.z];

    namex.value = tempSale.name;
    mobile.value = tempSale.mobile;
    address.value = tempSale.address;
    site.innerText = data[point.x].name;
    block.innerText = data[point.x].block[point.y].type + " " + data[point.x].block[point.y].id;
    plotx.value = tempSale.plotx;
    ploty.value = tempSale.ploty;
    size.value = tempSale.size;
    payment.value = tempSale.payment;
    devCharges.checked = tempSale.devCharges;
    plotRegistry.checked = tempSale.plotRegistry;
    plotKabza.checked = tempSale.plotKabza;

    tsite.options.length = 1;
    for(let i=0; i<data.length; i++)
    {
        let temp = document.createElement('option');
        temp.text = data[i].name;
        temp.value = i;
        tsite.add(temp);
    }

    tsite.addEventListener('change', function()
    {
        tblock.options.length = 1;
        for(let i=0; i<data[tsite.value].block.length; i++)
        {
            let temp = document.createElement('option');
            temp.text = data[tsite.value].block[i].type + " " + data[tsite.value].block[i].id;
            temp.value = i;
            tblock.add(temp);
        }
    });

    createSaleBtn.addEventListener('click', function()
    {
        createSaleBtn.classList.add('is-loading');

        let newSale = {};
        data[point.x].block[point.y].sale[point.z].name = namex.value;
        data[point.x].block[point.y].sale[point.z].mobile = mobile.value;
        data[point.x].block[point.y].sale[point.z].address = address.value;
        data[point.x].block[point.y].sale[point.z].size = size.value;
        data[point.x].block[point.y].sale[point.z].payment = payment.value;
        data[point.x].block[point.y].sale[point.z].devCharges = devCharges.checked;
        data[point.x].block[point.y].sale[point.z].plotRegistry = plotRegistry.checked;
        data[point.x].block[point.y].sale[point.z].plotKabza = plotKabza.checked;

        save();
        cancelToSaleExplorer();
    });

    clearBtn.addEventListener('click', cancelToSaleExplorer);


    document.getElementById('transfer-name-btn').addEventListener('click', function()
    {
        let newName = document.getElementById('transfer-name-input').value;
        if(newName)
        {
            let newTransfer = {};
            newTransfer.type = "Name Transfer";
            newTransfer.old = data[point.x].block[point.y].sale[point.z].name;
            newTransfer.new = newName;
            newTransfer.plot = data[point.x].block[point.y].sale[point.z].plotx + "/" + data[point.x].block[point.y].sale[point.z].ploty;

            data[point.x].block[point.y].sale[point.z].name = newName;
            data[point.x].block[point.y].transfer.push(newTransfer);
            save();
        }
    });


    document.getElementById('transfer-plot-btn').addEventListener('click', function()
    {
        // 
    });

}

function cancelToSaleExplorer()
{
    window.location = "../view/saleExplorer.html";
}