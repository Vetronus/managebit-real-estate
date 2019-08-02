var messageNode, loadingNode, statusNode;

document.addEventListener("DOMContentLoaded", function()
{
    messageNode = document.getElementById('_status-message');
    loadingNode = document.getElementById('_status-loading');
    statusNode = document.getElementById("_status"); 
})

function Anim(xValue) 
{
    if(xValue > 0)
    {
        var pos = -56;
        var tPos = 0;
    }
    else 
    {
        var pos = 0;
        var tPos = -56;
    }

    var id = setInterval(frame, 5);

    function frame() 
    {
        if (pos == tPos) 
        {
            clearInterval(id);
        }
        else 
        {
            pos = pos+xValue; 
            statusNode.style.bottom = pos + 'px'; 
        }
    }
}

function StatusOn(message, showLoading)
{
    if(showLoading) loadingNode.classList.remove('hideit');
    else loadingNode.classList.add('hideit');
    messageNode.innerText = message;
    Anim(1);
}

function StatusOff()
{
    Anim(-1);
}