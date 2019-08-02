var saleDiv, editBtns, delBtns, selectBtns;

function boot()
{
    saleDiv = document.getElementById('sale-div');
    setupSaleDiv();
}

function setupSaleDiv()
{
    saleDiv.innerHTML = "";
    for(let i=0; i<data[point.x].block[point.y].sale.length; i++)
    {
        let temp = data[point.x].block[point.y].sale[i].plotx;
        if(data[point.x].block[point.y].sale[i].ploty > 0) temp=temp+"/"+data[point.x].block[point.y].sale[i].ploty;

        saleDiv.innerHTML += "<div class='box saleBox column is-narrow'><p class='has-text-primary is-size-3'>Plot "+ temp +"</p><div class='boxInfo'><p>"+ data[point.x].name +"</p><p>Name: "+ data[point.x].block[point.y].sale[i].name +"</p><p>Block | Sector: "+ data[point.x].block[point.y].id +"</p></div><div class='boxBtns'><button class='button is-primary select-btn'>Select</button><button class='edit-btn button is-info is-outlined'>Print</button><button class='del-btn button is-danger is-outlined is-marginless'>Delete</button></div></div>"
    }

    selectBtns = document.getElementsByClassName('select-btn');
    editBtns = document.getElementsByClassName('edit-btn');
    delBtns = document.getElementsByClassName('del-btn');
    actionManager();
}

function actionManager()
{
    for(let i=0; i<selectBtns.length; i++)
    {
        selectBtns[i].addEventListener('click', function()
        {
            point.z = i;
            sync();
            window.location = "../view/sale.html"
        });

        editBtns[i].addEventListener('click', function()
        {
            point.z = i;
            sync();
            window.location = "../view/print.html"
        });
        
        delBtns[i].addEventListener('click', function()
        {
            data[point.x].block[point.y].sale.splice(i, 1);
            save();
            setupSaleDiv();
        });
    }
}