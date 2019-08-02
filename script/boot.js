
function boot()
{
    var loginBtn = document.getElementById('login-btn');
    console.log(data);
    
    var realPass = localStorage.pass;

    if(realPass)
    {
        loginBtn.addEventListener('click', function()
        {
            var pass = document.getElementById('pass-input').value;
            if(pass == realPass)
            {
                console.log('Auth success!');
                window.location = ("../view/siteExplorer.html");

            }
            else
            {
                console.log('Auth failed!');
                loginBtn.classList.add('is-danger');
                document.getElementById('pass-input').value = "";
                document.getElementById('pass-input').classList.add('is-danger');
            }
        });
    }
    else
    {
        loginBtn.innerText = 'Create'
        document.getElementById('pass-input').setAttribute('type', 'text');
        loginBtn.addEventListener('click', function()
        {
            var pass = document.getElementById('pass-input').value;
            localStorage.pass = pass;
            console.log('New pass created!');
            window.location = ("../view/siteExplorer.html");
        });
    }
    
}