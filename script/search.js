document.addEventListener("DOMContentLoaded", function () 
{
    document.getElementById('search-list-div').innerHTML = "";    
    document.getElementById('search-btn').addEventListener('click', function()
    {
        document.getElementById('search-list-div').innerHTML = "";
        let num = document.getElementById('search-input').value;
        for(let i=0; i<siteData.length; i++)
        {
            for(let j=0; j<siteData[i].block.length; j++)
            {
                for(let k=0; k<siteData[i].block[j].sale.length; k++)
                {
                    if(siteData[i].block[j].sale[k].cusMobile == num)
                        setupSearchDiv(i, j, k);

                    else if(siteData[i].block[j].sale[k].cusName.indexOf(num) != -1)
                        setupSearchDiv(i, j, k);
                }
            }
        }

        // document.getElementById('search-list-div').innerHTML += "<p style='width:100%; text-align:centre;'>Refunded Plots</p>"

        // for(let i=0; i<siteData.length; i++)
        // {
        //     for(let j=0; j<siteData[i].refund.length; j++)
        //     {
        //         createRefundData(siteData[i].refund[j]);
        //     }
        // }

        // document.getElementById('search-list-div').innerHTML = "";
    });
});

function setupSearchDiv(i, j, k)
{
    document.getElementById('search-list-div').innerHTML += "<a class='box column margin-2 is-narrow search-boxes'><p class='font-size-3'>"+ siteData[i].block[j].id + siteData[i].block[j].plotid[siteData[i].block[j].sale[k].plot] +"</p><p class='super-p'>"+ siteData[i].siteName +"</p><p>Name: "+ siteData[i].block[j].sale[k].cusName +"</p><p>Phone: "+ siteData[i].block[j].sale[k].cusMobile +"</p></a>";
}

function createRefundData(lol)
{
    console.log(lol);
    document.getElementById('search-list-div').innerHTML += "<a class='box column margin-2 search-boxes is-narrow'><p class='font-size-4 is-danger'>"+ siteData[lol.plotSite].block[lol.plotBlock].id + lol.plot +"</p><p class='super-p'>"+ siteData[lol.plotSite].siteName +"</p><p>Name: "+ lol.cusName +"</p><p>Phone: "+ lol.cusMobile +"</p>" + "<textarea class='input is-primary' style='width:330px; font-size:16px; resize: none; height: 80px';>"+ lol.salePayment +"</textarea></a>";
}
