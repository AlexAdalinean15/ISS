var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var username, password;

function register()
{
    x.style.left = "-400px";
    y.style.left = "50px";
    y.style.top = "150px";
    z.style.left = "110px";
}

function login()
{
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";
}

function loginJson()
{
    var request = new XMLHttpRequest()
    var emailAdress = document.getElementById("inputText").value;
    

    request.open('GET', "http://188.24.33.93:3286/api/login?Mail=" + emailAdress + "&Password=" + document.getElementById("password-fieldLogin").value)

    request.onload = function() 
    {        
        if(request.response != "FAIL")
        {
            var client = JSON.parse(request.responseText);

            localStorage.setItem("id", client.Id);
            localStorage.setItem("username", client.Name);
            localStorage.setItem("email", client.Mail);
            localStorage.setItem("numberOfPastRentals", client.NumberOfPastRentals);
            window.open("ISSMainPage.html","_self")
        }

        else
        {
            alert("Invalid username or password!");
        }
    }
    
   request.send()
}

function registerJson()
{
    var request = new XMLHttpRequest()
    request.open('POST', "http://188.24.33.93:3286/api/clients");
    request.setRequestHeader('Access-Control-Allow-Origin', "application/json");

    request.onload = function() 
    {        
        if(request.response != "Invalid client!")
        {
            var client = request.responseText;

            localStorage.setItem("id", client);
            localStorage.setItem("username", document.getElementById("nameRegister").value);
            localStorage.setItem("email", document.getElementById("emailRegister").value);
            window.open("ISSMainPage.html","_self")
        }

        else
        {
            alert("Registration failed! Invalid data!");
        }
    }

    if(document.getElementById("password-field").value != document.getElementById("password-fieldConfirm").value)
    {
        alert("Please confirm password!");
        return;
    }
    
    var data = JSON.stringify({"name": document.getElementById("nameRegister").value, "mail": document.getElementById("emailRegister").value, "password":document.getElementById("password-field").value});
    request.send(data);
}