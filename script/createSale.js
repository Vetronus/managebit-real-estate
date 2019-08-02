var namex, mobile, address, site, block, plotx, ploty, size, payment, devCharges, plotRegistry, plotKabza, createSaleBtn, clearBtn;

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

    createSaleBtn = document.getElementById('create-sale-btn');
    clearBtn = document.getElementById('clear-sale-btn');

    site.options.length = 1;
    for(let i=0; i<data.length; i++)
    {
        let temp = document.createElement('option');
        temp.text = data[i].name;
        temp.value = i;
        site.add(temp);
    }

    site.addEventListener('change', function()
    {
        block.options.length = 1;
        for(let i=0; i<data[site.value].block.length; i++)
        {
            let temp = document.createElement('option');
            temp.text = data[site.value].block[i].type + " " + data[site.value].block[i].id;
            temp.value = i;
            block.add(temp);
        }
    });

    createSaleBtn.addEventListener('click', function()
    {
        createSaleBtn.classList.add('is-loading');

        let newSale = {};
        newSale.name = namex.value;
        newSale.mobile = mobile.value;
        newSale.address = address.value;
        newSale.site = site.value;
        newSale.block = block.value;
        newSale.plotx = plotx.value;
        newSale.ploty = ploty.value;
        newSale.size = size.value;
        newSale.payment = payment.value;

        newSale.devCharges = devCharges.checked;
        newSale.plotRegistry = plotRegistry.checked;
        newSale.plotKabza = plotKabza.checked;

        if(!newSale.ploty) newSale.ploty = 0;
        if(site.value && block.value)
        {
            data[site.value].block[block.value].sale.push(newSale);
            save();
        }

        createSaleBtn.classList.remove('is-loading');
    });

    clearBtn.addEventListener('click', clearFields);

}

function clearFields()
{
    namex.value = "";
    mobile.value = "";
    address.value = "";
    site.value = "";
    block.value = "";
    plotx.value = "";
    ploty.value = "";
    size.value = "";
    payment.value = "";
    devCharges.checked = false;
    plotRegistry.checked = false;
    plotKabza.checked = false;
}