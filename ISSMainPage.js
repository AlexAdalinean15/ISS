
var markers = [];
var img = [];

function map()
{
    var request = new XMLHttpRequest();
    request.open('GET', "http://188.24.33.93:3286/api/cars");

    request.onload = function()
    {
        if (request.readyState == 4 && request.status == 200) 
        {
            var cars = JSON.parse(request.responseText);
            
            var mymap = L.map('mapid').setView([cars[0].coordinates.x, cars[0].coordinates.y], 13);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                            maxZoom: 18,
                            id: 'mapbox/streets-v11',
                            tileSize: 512,
                            zoomOffset: -1,
                            accessToken: 'pk.eyJ1IjoiZ29pYWl1bGlhbiIsImEiOiJjazl1eWRncTUwNjc0M2xud3c3c284MXZjIn0.qTakzEnMJRqUTmj0WC6MZg'
                        }).addTo(mymap)
            for(var j = 0; j < cars.length; j++)
                {
                    if (cars[j].state == 0)
                    {
                        markers[j] = L.marker([cars[j].coordinates.x, cars[j].coordinates.y]).addTo(mymap);
                        markers[j].bindPopup(popup(cars[j].id, cars[j].manufacturer, cars[j].model, cars[j].numberOfSeats, cars[j].price)); 
                    }
                }
            
        }
        else
        {
            alert("Request failed");
        }
    }
    request.send();
}

function popup(carId, man, model, nrSeats, price)
{
    var str = "<div class='Popup'>";
    str += getCarPhoto(carId);
    str += " <p>" + man + " "+ model + "</p> <p><b>Seats:</b> " + nrSeats + "</p> <p><b>Price:</b> " + price + " $</p>";
    str += "<button class='Rent' id='" + carId + "'onClick='rent(this.id)'>Rent</button></div>";
    return str;
}

function rent(carId)
{
    var request = new XMLHttpRequest()
    request.open('POST', "http://188.24.33.93:3286/api/rentals");
    request.setRequestHeader('Access-Control-Allow-Origin', "application/json");

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    
    today = mm + '/' + dd + '/' + yyyy;
    var data = JSON.stringify({"CarId": carId, "ClientId": localStorage.id, "DateTime": today});
    
    request.send(data);
    location.reload();
    alert("Your renting order was registered.\n You will recive an e-mail with the payment details.\n");
}

function getCarPhoto(id)
{
    var request = new XMLHttpRequest()
    var img ="";

    request.open('GET', "http://188.24.33.93:3286/api/download_photo?Id=" + id, false)
    request.send(null);

    if(request.response != null)
        {
            var photos = request.responseText;
            photos = photos.toString();
            photos = photos.replace('"','');
            photos = photos.replace('"','');
            img += "<img src='data:image/jpeg;base64," + photos + "'width='163px', height='96px'>";

            return img;
        }

        else
        {
            alert("Could not get cars!");
        }
}

map();