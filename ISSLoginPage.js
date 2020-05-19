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
    localStorage.setItem("email", emailAdress);
    window.open("ISSMainPage.html","_self")

//     request.open('GET', "http://188.24.33.93:3286/api/login?mail=" + emailAdress + "&password=" + document.getElementById("password-fieldLogin").value)

//     request.onload = function() 
//     {        
//         if(request.response === "Login success!")
//         {
//             window.open("ISSMainPage.html","_self")
//         }

//         else
//         {
//             alert("Invalid username or password!");
//         }
//     }
    
//    request.send()
}

function registerJson()
{
    var request = new XMLHttpRequest()
    request.open('POST', "http://188.24.33.93:3286/api/clients");
    request.setRequestHeader('Access-Control-Allow-Origin', "application/json");

    request.onload = function() 
    {        
        if(request.response === "Login success!")
        {
            window.open("ISSMainPage.html","_self")
        }

        else
        {
            alert("Something went wrong!");
        }
    }

    var data = JSON.stringify({"name": document.getElementById("nameRegister"), "email": document.getElementById("emailRegister"), "password":document.getElementById("password-field")});
    request.send(data);
}