var forecastBox;
var map;

map = L.map('map', {
    zoomControl:true, maxZoom:19
}).setView([45,-100], 4)


navigator.geolocation.getCurrentPosition((position) => {
  console.log(position)
 if(position) {
  map.setView(new L.LatLng(position.coords.latitude,position.coords.longitude),6);
}
});


var clouds = L.tileLayer('http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
	apiKey: '5606fe6c8b895127844f35d6c3698fad',
	opacity: 0.5
}).addTo(map);

var wind = L.tileLayer('http://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apiKey}', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
	apiKey: '5606fe6c8b895127844f35d6c3698fad',
	opacity: 1
});

var precip = L.tileLayer('http://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}', {
	maxZoom: 19,
	attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
	apiKey: '5606fe6c8b895127844f35d6c3698fad',
	opacity: .5
});

// Import base map
var basemap_0 = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

var Esri_WorldStreetMap = new L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

var HikeBike = L.tileLayer('http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var basemaps ={"Esri World Topo Map": basemap_0,
                "Esri World Street Map": Esri_WorldStreetMap,
              "Open Street Map Hike/Bike": HikeBike}




// Add basemap to map object
basemap_0.addTo(map);



// Create Popups
function resortPopups(feature, layer) {
    if(feature.properties.ticket){
      price="Adult Ticket: $" + feature.properties.ticket;
    }
    if(feature.properties.lifts) {
      lifts = feature.properties.lifts + " Lifts";
    }

    if(feature.properties.acres) {
      acres = feature.properties.acres + ' Skiable Acres';
    }
    if(feature.properties.vertical){
      vert=feature.properties.vertical + " Vertical Ft.";
    }
    var popupContent = `<strong><a href='${feature.properties.url}' target='_blank'>${feature.properties.name}</a></strong>
    <br/> ${vert}<br/> ${acres}<br/> ${lifts} <br/>  <br/> <strong>${price}</strong>`;
    //'name: ' + String(feature.properties['name']) + '<br>pop_max: ' + String(feature.properties['vertical']);
    layer.bindPopup(popupContent);
}
function resortsLayer(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 8.0,
        fillColor: '#3C8DBC',
        color: '#000000',
        weight: 1,
        opacity: 1.0,
        fillOpacity: 0.8
    })
}
var createMarkers  = new L.geoJson(resorts,{
    onEachFeature: resortPopups,
    pointToLayer: resortsLayer,
    popupAnchor: [0,0]
});
var resortsFeatureGroup= new L.featureGroup();
resortsFeatureGroup.addLayer(createMarkers);
resortsFeatureGroup.addTo(map);



var weatherMaps = {"Cloud Coverage": clouds,
                   "Wind Overlay": wind,
                   "Precipitation": precip};

controler = L.control.layers(basemaps,weatherMaps,{collapsed:true}).addTo(map);
