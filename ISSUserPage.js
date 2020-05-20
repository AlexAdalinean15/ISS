var email = "";

document.addEventListener('DOMContentLoaded', function() 
{
    email = localStorage.getItem("email");
    GetUserInformationFromServer();
    GetHistoryInformationFromServer();
    CreateUserListItem("Alex Adalinean", "alexadalinean42@gmail.com")
    CreateUserListItem("Lobont Terec Andrei Lucian", "lobont@gmail.com")
}, false);

function CreateUserListItem(name, emailAdress)
{
    var li = document.getElementById("Content-User");
    var ul1 = document.createElement("ul");
    var li1 = document.createElement("li");
    li1.appendChild(document.createTextNode("Name"));
    li1.setAttribute("class","inner-header");
    var li2 = document.createElement("li");
    var i1 = document.createElement("i");
    i1.setAttribute("id","icon");
    i1.setAttribute("class", "fa fa-user");
    li2.appendChild(i1);
    li2.appendChild(document.createTextNode(name));
    li2.setAttribute("class","user-body");
    var li3 = document.createElement("li");
    li3.appendChild(document.createTextNode("Email adress"));
    li3.setAttribute("class","inner-header");
    var li4 = document.createElement("li");
    var i2 = document.createElement("i");
    i2.setAttribute("id","icon");
    i2.setAttribute("class", "fa fa-paper-plane");
    li4.appendChild(i2);
    li4.appendChild(document.createTextNode(emailAdress));
    li4.setAttribute("class","user-body");
    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);
    ul1.appendChild(li4);
    li.appendChild(ul1);
}

function CreateHistoryListItem(date, carModel, numberOfSeats, price)
{
    var li = document.getElementById("Content-History");
    var ul1 = document.createElement("ul");
    var li1 = document.createElement("li");
    li1.appendChild(document.createTextNode("Date"));
    li1.setAttribute("class","inner-header");
    var li2 = document.createElement("li");
    var i1 = document.createElement("i");
    i1.setAttribute("id","icon");
    i1.setAttribute("class", "fa fa-calendar");
    li2.appendChild(i1);
    li2.appendChild(document.createTextNode(date));
    li2.setAttribute("class","history-body");
    var li3 = document.createElement("li");
    li3.appendChild(document.createTextNode("Car Model"));
    li3.setAttribute("class","inner-header");
    var li4 = document.createElement("li");
    var i2 = document.createElement("i");
    i2.setAttribute("id","icon");
    i2.setAttribute("class", "fa fa-paper-car");
    li4.appendChild(i2);
    li4.appendChild(document.createTextNode(carModel));
    li4.setAttribute("class","history-body");
    var li5 = document.createElement("li");
    li5.appendChild(document.createTextNode("Number of seats"));
    li5.setAttribute("class","inner-header");
    var li6 = document.createElement("li");
    var i3 = document.createElement("i");
    i3.setAttribute("id","icon");
    i3.setAttribute("class", "fa fa-paper-chair");
    li6.appendChild(i3);
    li6.appendChild(document.createTextNode(numberOfSeats));
    li6.setAttribute("class","history-body");
    var li7 = document.createElement("li");
    li7.appendChild(document.createTextNode("Price"));
    li7.setAttribute("class","inner-header");
    var li8 = document.createElement("li");
    var i4 = document.createElement("i");
    i4.setAttribute("id","icon");
    i4.setAttribute("class", "fa fa-paper-eur");
    li8.appendChild(i4);
    li8.appendChild(document.createTextNode(price));
    li8.setAttribute("class","history-body");
    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);
    ul1.appendChild(li4);
    ul1.appendChild(li5);
    ul1.appendChild(li6);
    ul1.appendChild(li7);
    ul1.appendChild(li8);
    li.appendChild(ul1);
}

function GetUserInformationFromServer()
{
    var request = new XMLHttpRequest();
    request.open('GET', "");
    request.send();

    request.onload = function()
    {
        if (request.readyState == 4 && request.status == 200) 
        {
            var userInformation = JSON.parse(request.responseText);
            CreateUserListItem(userInformation.name, email);
        }
        else
        {
            alert("Request failed");
        }
    }
}

function GetHistoryInformationFromServer()
{
    var request = new XMLHttpRequest();
    request.open('GET', "http://localhost/Laboratory7/GetCategories.php");
    request.send();

    request.onload = function()
    {
        if (request.readyState == 4 && request.status == 200) 
        {
            var historyList = JSON.parse(request.responseText);

            for(var i = 0; i < historyList.length; i++)
            {
                CreateHistoryListItem(historyList[i].date, historyList[i].carModel, historyList[i].numberOfSeats, historyList[i].price);
            }
        }
        else
        {
            alert("Request failed");
        }
    }
}