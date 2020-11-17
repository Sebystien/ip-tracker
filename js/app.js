//Here we will be selecting all the elements in the details box
let lat, long;
const elementIp = document.getElementById('details--ip');
const elementLocation = document.getElementById('details--location');
const elementTime = document.getElementById('details--timezone');
const elementIsp = document.getElementById('details--isp');
const form = document.querySelector('form');
/* const alert = document.querySelector('.alert'); */



async function mapData(l, lg) {
    const mymap = L.map('mapid').setView([l, lg], 15);
const icon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const marker = L.marker([l, lg], {
    icon: icon
}).addTo(mymap);

const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVhbnNlZWJhIiwiYSI6ImNrZnkzOWgzZjA1Y2syc3BqNnp2MmJodnkifQ.OokIBnLSKezjZh0PlPfFxQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    /* accessToken: 'your.mapbox.access.token' */
}).addTo(mymap);


}


const api_url=`https://geo.ipify.org/api/v1?apiKey=at_Cqu9czC5E5ye08JOgLrT8lPirvxJQ&ipAddress=`;



//Forms handler
form.addEventListener('submit', e => {
    e.preventDefault();

async function formHandler() {
    
    const input = document.querySelector('.search__input').value;
    const response_api = api_url + input;
    const fetchIt = await fetch(response_api);
    const data_two = await fetchIt.json();

    if(input  === "" || fetchIt.status !== 200){
         alert.classList.add('visible')
    }else{
        alert.classList.remove('visible');
    } 

    console.log(data_two);
  };
   
  formHandler();
   
});



async function callApi(xx) {
    const api = await fetch(api_url);
    const response = await api.json()


    //Render the data in the webpage
    const{city, country, lat, lng, postalCode, region, timezone} = response.location;
    const{ip, isp} = response;
    elementIp.textContent = ip;
    elementLocation.innerHTML=`${city}, ${region} ${postalCode} `;
    elementTime.innerHTML=`UTC${timezone}`;
    elementIsp.textContent = isp; 
    
    mapData(lat, lng);
}
callApi();











