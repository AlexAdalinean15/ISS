var email = "";

document.addEventListener('DOMContentLoaded', function() 
{
    email = localStorage.getItem("email");
}, false);

function SendFunction()
{
    var request = new XMLHttpRequest()
    request.open('POST', "http://188.24.33.93:3286/api/comments");
    request.setRequestHeader('Access-Control-Allow-Origin', "application/json");

    request.onload = function() 
    {        
        if(request.response == "Invalid comment!")
        {
            alert(request.response);
        }
        else
        {
            document.getElementById("inputComment").value = "";
        }
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    var data = JSON.stringify({"Mail": email, "Content": document.getElementById("inputComment").value, "DateTime": today});
    request.send(data);
}