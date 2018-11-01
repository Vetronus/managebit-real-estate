let cusName, cusMobile, cusAddress, plotSite, plotBlock, plot, plotSize, plotRegistry, plotDakhilkari, plotKabza, salePayment; let saveSaleBtn, clearSaleBtn;


document.addEventListener("DOMContentLoaded", function () 
{
    cusName = document.getElementById('sale-name-input');
    cusMobile = document.getElementById('sale-mobile-input');
    cusAddress = document.getElementById('sale-address-input');
    plotSite = document.getElementById('sale-site-select');
    plotBlock = document.getElementById('sale-block-select');
    plot = document.getElementById('sale-plot-select');
    plotSize = document.getElementById('sale-plot-size-input');
    plotRegistry = document.getElementById('plot-registry-input');
    plotDakhilkari = document.getElementById('plot-dakhilkari-input');
    plotKabza = document.getElementById('plot-kabza-input');
    salePayment = document.getElementById('sale-payment-input');
    
    saveSaleBtn = document.getElementById('save-sale-btn');
    clearSaleBtn = document.getElementById('clear-sale-btn');

    plotSite.addEventListener('change', function()
    {
        plot.options.length = 1;
        plotBlock.options.length = 1;
        for(let i=0; i<siteData[plotSite.value].block.length; i++)
        {
            let z = document.createElement('option');
            z.text = siteData[plotSite.value].block[i].id;
            z.value = i;
            plotBlock.add(z);
        }
    });

    plotBlock.addEventListener('change', function()
    {
        plot.options.length = 1;
        for(let i=0; i<siteData[plotSite.value].block[plotBlock.value].plot.length; i++)
        {
            if(siteData[plotSite.value].block[plotBlock.value].plot[i])
            {
                let z = document.createElement('option');
                z.text = siteData[plotSite.value].block[plotBlock.value].id +" "+ siteData[plotSite.value].block[plotBlock.value].plotid[i];
                z.value = i;
                plot.add(z);
            }
        }
    });


    saveSaleBtn.addEventListener('click', saveSale);
    clearSaleBtn.addEventListener('click', clearSaleFields);
});

function setupSiteDropdown()
{
    plotSite.options.length = 1;
    plotBlock.options.length = 1;
    plot.options.length = 1;

    for(let i=0; i<siteData.length; i++)
    {
        let z = document.createElement('option');
        z.text = siteData[i].siteName;
        z.value = i;
        plotSite.add(z);
    }
}


function saveSale()
{
    // if(plot)
    // {
        let newSale = {};
        newSale.cusName = cusName.value;
        newSale.cusMobile = cusMobile.value;
        newSale.cusAddress = cusAddress.value;
        newSale.plotSite = plotSite.value;
        newSale.plotBlock = plotBlock.value;
        newSale.plot = plot.value;
        newSale.plotSize = plotSize.value;
        newSale.plotRegistry = plotRegistry.checked;
        newSale.plotDakhilkari = plotDakhilkari.checked;
        newSale.plotKabza = plotKabza.checked;
        newSale.salePayment = salePayment.value;

        if(newSale.plot)
        {
            siteData[newSale.plotSite].block[newSale.plotBlock].sale.push(newSale);
            siteData[newSale.plotSite].block[newSale.plotBlock].plot[newSale.plot] = false;
            siteData[newSale.plotSite].availPlots--;
            siteData[newSale.plotSite].block[newSale.plotBlock].sale.sort(function(a, b){return parseInt(a.plot)-parseInt(b.plot)});
            saveData();
            clearSaleFields();
            alert("Sale data created.");
        }
        else
        {
            alert("ERROR|Select the plot!")
        }
    // }
}

function clearSaleFields()
{
    cusName.value = "";
    cusMobile.value = "";
    cusAddress.value = "";
    plotSize.value = "";
    plotRegistry.checked = "";
    plotDakhilkari.checked = "";
    plotKabza.checked = "";
    salePayment.value = "";

    setupSiteDropdown();
}
