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
    var username = document.getElementById("inputText").value;
    request.open('GET', "http://5.13.107.110:3286/api/login?mail=" + username + "&password=" + document.getElementById("password-fieldLogin").value)

    request.onload = function() 
    {
        alert(request.response);
        window.open("file:///D:/Projects/ISS/ISSMainPage.html","_self")
    }
    
   request.send()
}