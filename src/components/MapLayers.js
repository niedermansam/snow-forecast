import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";

const openWeatherMapKey = "5606fe6c8b895127844f35d6c3698fad"

const MapLayers = (props) => (
  <LayersControl position="topright">
    <LayersControl.BaseLayer
      name="Stamen Terrain"
      checked={true}>
      <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}'
        subdomains = "abcd"
        minZoom = {0}
        maxZoom = {18}
        ext = "png"
        />
    </LayersControl.BaseLayer>
      <LayersControl.BaseLayer
        name="Open Topo Map">
        <TileLayer
          attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
          url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
      </LayersControl.BaseLayer>
        <LayersControl.BaseLayer
          name="Esri World Imagery">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay
        name="Open Weather Map Precipitation"
        checked = {true}
        >
          <TileLayer
          url='http://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}'
          attribution='<br/>Precipitation Map &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          apiKey = {openWeatherMapKey}
          opacity = {props.overlayOpacity || 0.5}
          />
        </LayersControl.Overlay>


        <LayersControl.Overlay
        name="Open Weather Map Clouds"
        >
          <TileLayer
          url='http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png?appid={apiKey}'
          attribution='<br/>Cloud Map &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          apiKey = {openWeatherMapKey}
          opacity = {props.overlayOpacity || 0.5}
          />
        </LayersControl.Overlay>

        <LayersControl.Overlay
        name="Open Weather Map Wind"
        >
          <TileLayer
          url = 'http://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={apiKey}'
	        maxZoom= {19}
	        attribution = '<br/>Wind Map &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
          apiKey = {openWeatherMapKey}
          opacity = {props.overlayOpacity || 0.5}
          />
        </LayersControl.Overlay>
  </LayersControl>
)

export default MapLayers;
