var blockDiv, createBlockBtn, selectBtns, editBtns, delBtns;
var type, id, total;

function boot()
{
    blockDiv = document.getElementById("block-explorer-div");
    setupBlockDiv();
}


function setupBlockDiv()
{
    blockDiv.innerHTML = "<div class='box blockBox column is-narrow'><p class='has-text-info is-size-3'>New Block/Sec</p><div style='margin-top: 12px;'><div class='select'><select id='block-type' class=' is-primary' style='width: 200px;'><option value='Block'>This is a Block</option><option value='Sector'>This is a Sector</option></select></div><div class='field has-addons' style='width: 237px;padding-left: 37px; margin-top: 12px;'><div class='control'><input id='block-id' class='input is-info' type='text' placeholder='Block/Sec'></div><div class='control'><input id='block-total' class='input is-info' type='text' placeholder='Total Plots'></div></div><button id='create-block' class='button is-info is-rounded' style='width:200px;'>Create</button></div></div>";

    for(let i=0; i<data[point.x].block.length; i++)
    {
        console.log(data[point.x].block[i]);
        blockDiv.innerHTML += "<div class='box blockBox column is-narrow'><p class='has-text-primary is-size-3'>"+ data[point.x].block[i].type + " " + data[point.x].block[i].id +"</p><div class='boxInfo'><p>Total Plots: "+ data[point.x].block[i].total +"</p><p>Sales: "+ data[point.x].block[i].sale.length +"</p><p>Available: "+ (data[point.x].block[i].total-data[point.x].block[i].sale.length) +"</p></div><div class='boxBtns'><button class='select-btn button is-primary'>Select</button><button class='edit-btn button is-info is-outlined'>Edit</button><button class='del-btn button is-danger is-outlined is-marginless'>Delete</button></div></div>"
    }

    createBlockBtn = document.getElementById("create-block");
    type = document.getElementById('block-type');
    id = document.getElementById('block-id');
    total = document.getElementById('block-total');

    selectBtns = document.getElementsByClassName('select-btn');
    editBtns = document.getElementsByClassName('edit-btn');
    delBtns = document.getElementsByClassName('del-btn');

    createBlockBtn.addEventListener('click', createBlock);
    actionManager();
}


function createBlock()
{
    var newBlock = {};
    newBlock.type = type.value;
    newBlock.id = id.value;
    newBlock.total = total.value;
    newBlock.sale = [];
    newBlock.transfer = [];
    newBlock.refund = [];

    if(newBlock.id && newBlock.type && newBlock.total)
    {
        data[point.x].block.push(newBlock);
        save();
        setupBlockDiv();
    }
}


function actionManager()
{
    for(let i=0; i<selectBtns.length; i++)
    {
        selectBtns[i].addEventListener('click', function()
        {
            point.y = i;
            sync();
            window.location = "../view/saleExplorer.html"
        });

        editBtns[i].addEventListener('click', function()
        {
            type.value = data[point.x].block[i].type;
            total.value = data[point.x].block[i].total;
            id.value = data[point.x].block[i].id;

            createBlockBtn.removeEventListener('click', createBlock);
            createBlockBtn.innerHTML = "Update";
            createBlockBtn.addEventListener('click', function()
            {
                data[point.x].block[i].type = type.value;
                data[point.x].block[i].total = total.value;
                data[point.x].block[i].id = id.value;
                save();
                setupBlockDiv();
            });

        });
        
        delBtns[i].addEventListener('click', function()
        {
            data[point.x].block.splice(i, 1);
            save();
            setupBlockDiv();
        });
    }
}