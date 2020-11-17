//Here we will be selecting all the elements in the details box
let lat, long;
const elementIp = document.getElementById('details--ip');
const elementLocation = document.getElementById('details--location');
const elementTime = document.getElementById('details--timezone');
const elementIsp = document.getElementById('details--isp');
const form = document.querySelector('form');
/* const alert = document.querySelector('.alert'); */





//Map initialization

async function justTheMap(lat, long){

const mymap = L.map('mapid').setView([lat,long], 14);
const tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVhbnNlZWJhIiwiYSI6ImNrZnkzOWgzZjA1Y2syc3BqNnp2MmJodnkifQ.OokIBnLSKezjZh0PlPfFxQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    /* accessToken: 'your.mapbox.access.token' */
}).addTo(mymap);
  const icon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [46, 56], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const  marker = L.marker([lat, long]).addTo(mymap);

};



const api_url=`https://geo.ipify.org/api/v1?apiKey=at_Cqu9czC5E5ye08JOgLrT8lPirvxJQ&ipAddress=`;

//We call the api here when the page loads
async function callApi() {
    const api_call = await fetch(api_url);
    const api_response = await api_call.json();
    console.log(api_response);
    details(api_response);
    justTheMap(api_response.location.lat, api_response.location.lng);
};



//let's get the form input value
async function formDetails (){
   const searchBox = document.querySelector('.search__input').value; 
   const user_searched_ip = await fetch(`${api_url}${searchBox}`);
   const user_response =  await user_searched_ip.json();
   details(user_response);
   justTheMap(user_response.location.lat, user_response.location.lng);
   console.log(user_response);
};



//Render the data in the webpage
 async function details(data) {
    const{city, country, postalCode, region, timezone} =data.location;
    const{ip, isp} =data;
    elementIp.textContent = ip;
    elementLocation.innerHTML=`${city}, ${region} ${postalCode} `;
    elementTime.innerHTML=`UTC${timezone}`;
    elementIsp.textContent = isp; 
};

form.addEventListener('submit', e=>{
    e.preventDefault();
    
    formDetails();
});
callApi();