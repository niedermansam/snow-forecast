import React, {Component} from 'react';
import "./App.min.css";
import { Map, Marker, Popup, Tooltip, GeoJSON } from "react-leaflet"
import Resorts from "./components/assets/Resorts"
import MapLayers from "./components/MapLayers"
import RangeSlider from "./components/RangeSlider"
import FormSwitch from "./components/FormSwitch"

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      lat: 45,
      lng: -110,
      zoom: 4,
      tooltip: true,
      data: null,
      vertLimits: [],
      priceLimits: []
    }
    this.allResorts = Resorts().features
    this.vertArr = this.allResorts.map(resort => resort.properties.vertical)
    this.priceArr = this.allResorts.map(resort => resort.properties.ticket)

    function findMinMax(arr, property) {
      let min = arr[0], max = arr[0];

      for (let i = 1, len=arr.length; i < len; i++) {
        let v = arr[i];
        if(!v) continue;
        min = (v < min) ? v : min;
        max = (v > max) ? v : max;
      }

      return [min, max];
    }

    this.vertLimits = findMinMax(this.vertArr);
    this.priceLimits = findMinMax(this.priceArr)

    this.toggleTooltip = this.toggleTooltip.bind(this);
    this.handleVertSlider = this.handleVertSlider.bind(this);
    this.handlePriceSlider = this.handlePriceSlider.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.getMarkers = this.getMarkers.bind(this);
  }

  componentDidMount(){
    let data = Resorts()
    console.log(data)
    this.setState({
      json: data,
      data: data.features,
      vertLimits: this.vertLimits,
      priceLimits: this.priceLimits
    })
  }

  toggleTooltip(){
    this.setState({tooltip: !this.state.tooltip})
  }

  handleVertSlider(event, newLimits){
    this.setState({
      vertLimits: newLimits
    })
    this.handleFilter();
  }

  handlePriceSlider(event, newLimits){
    this.setState({
      priceLimits: newLimits
    })
    this.handleFilter();
  }

  handleFilter(){
    let [minVert, maxVert] = this.state.vertLimits
    let [minPrice, maxPrice] = this.state.priceLimits

    // filter data
    let newData = this.allResorts.filter(resort => {

      // Handle vertical ft. filter
      if(resort.properties.vertical < minVert ||
        resort.properties.vertical > maxVert ) return false

      // Handle ticket price filter
      else if(resort.properties.ticket < minPrice ||
        resort.properties.ticket > maxPrice ) return false

      // Return object if it passes all tests
      else return true
    })

    // Set state with new data

    //let newJson = this.state.json;

    //newJson.features = newData;

    //this.setState({json: newJson})
  }

  getMarkers(){
    let markers;

    let filter = (feature, layer) => {
      let [minVert, maxVert] = this.state.vertLimits
      let [minPrice, maxPrice] = this.state.priceLimits

      // Handle vertical ft. filter
      if(feature.properties.vertical < minVert ||
        feature.properties.vertical > maxVert ) return false

      // Handle ticket price filter
      else if(feature.properties.ticket < minPrice ||
        feature.properties.ticket > maxPrice ) return false

      // Return object if it passes all tests
      else return true


        
    }

    //console.log(this.state.json)

    function onEachFeature(feature, layer){
      if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
      }
    }

    /*
    if(this.state.data){
    for(let resort of this.state.data){

        resort.tooltip = this.state.tooltip
        let newMarker = ResortMarker(resort);
        markerArray.push(newMarker);
      }
    }
    */

    console.log(this.state)

    if(this.state.json){
      markers = <GeoJSON 
                   key={`geojson-${Math.round(Math.random(), 3)*1000}`}
                   data = {this.state.json}
                   filter = {filter}
                   onEachFeature = {onEachFeature}
                   />
    }

    return markers
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <React.Fragment>
        <RangeSlider
        name = "Vertical ft."
        min={this.vertLimits[0]}
        max={this.vertLimits[1]}
        step={1}
        value={this.state.vertLimits}
        handleChange={this.handleVertSlider}
        />
        <RangeSlider
        name = "Ticket Price"
        min={this.priceLimits[0]}
        max={this.priceLimits[1]}
        step={1}
        value={this.state.priceLimits}
        handleChange={this.handlePriceSlider}
        />

      <FormSwitch
        checked={this.state.tooltip}
        onChange={this.toggleTooltip}
        />

        <Map
          center={position}
          zoom={this.state.zoom}
          preferCanvas={true}>
          <MapLayers />
          {this.getMarkers()}
        </Map>

      </React.Fragment>
    );
  }
}

const ResortMarker = (props) => {

  const coordinates = props.geometry.coordinates
  const resort = props.properties
  const position = [coordinates[1], coordinates[0]];

  const MarkerBody = (props) => (
    <React.Fragment>
      <h3 style={{margin: 0}}>{props.name}</h3>
      <h4 style={{marginTop: 0}}>{props.state}</h4>
      <table style={{width: "100%"}} className="resort-info-table">
        <tbody>
          {props.ticket ? <tr><th>Adult Ticket</th><td>{`$${props.ticket}`}</td></tr> : null}
          {props.vertical ? <tr><th>Vertical Feet</th><td>{props.vertical}</td></tr> : null}
          {props.acres ? <tr><th>Acres</th><td>{props.acres}</td></tr> : null}
          {props.lifts ? <tr><th>Lifts</th><td>{props.lifts}</td></tr> : null}
          {props.trails ? <tr><th>Trails</th><td>{props.trails}</td></tr> : null}
        </tbody>
      </table>
    </React.Fragment>
  )

  return(
    <Marker position={position} key={`${resort.name} ${resort.state}`}>
      {props.tooltip
        ? <Tooltip className="leaflet-tooltip">{MarkerBody(resort)}</Tooltip>
        : <Popup>{MarkerBody(resort)}</Popup> }
    </Marker>
)}

export default App;
