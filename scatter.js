let getInBound = function() {
let bounds = map.getBounds()


let inBounds = resorts.features.filter(x => {
  return x.geometry.coordinates[0] <= bounds._northEast.lng &
    x.geometry.coordinates[0] >= bounds._southWest.lng &
    x.geometry.coordinates[1] <= bounds._northEast.lat &
    x.geometry.coordinates[1] >= bounds._southWest.lat &
    x.properties.ticket <= rangeMax &
    x.properties.ticket >= rangeMin &
    x.properties.vertical <= vertMax &
    x.properties.vertical >= vertMin;

//  x.geometry.coordinates[0] >= bounds._southWest.lng;

//  x.geometry.coordinates[1] <= bounds._northEast.lat;
//  x.geometry.coordinates[1] >= bounds._southWest.lat;
})

return inBounds;
}

let drawScatterPlot = function(){
  let data = getInBound();

  let trace1 = {
    y: [],
    x: [],
    z: [],
    text: [],
    mode: 'markers',
    marker: {
      size: 10,
      color: []
    },
    colorscale: 'YIOrRd'
  };

  data.forEach(resort => {
    trace1.y.push(resort.properties.vertical)
    trace1.x.push(resort.properties.acres)
    trace1.z.push(resort.properties.ticket)
    trace1.marker.color.push(resort.properties.ticket)
    trace1.text.push(resort.properties.name)
    //histData.push(resort.properties.acres)
  })


  data = [trace1];

  let layout = {
    title: 'Scatter Plot with a Color Dimension',
    hovermode: 'closest',
    showLegend: true
  };

  Plotly.newPlot('scatter', data, layout, {responsive: true});

}

let drawHistogram = function(){
  let data = getInBound();

  let trace = {
    x: [],
    type: 'histogram',
    xbins: {size: 10}
  };

  data.forEach(resort => {
    trace.x.push(resort.properties.ticket)
  })

  let layout = {
    title: 'Scatter Plot with a Color Dimension',
    showLegend: true
  };

  data = [trace];
  Plotly.newPlot('histogram', data, layout, {responsive: true});
}

let drawGraphs = function(){
drawHistogram()
drawScatterPlot()
}
drawGraphs()

map.on('mouseup zoomend resize', drawGraphs)
//map.on('zoomend', drawScatterPlot)

vert_slider.noUiSlider.on('end', drawGraphs)
price_slider.noUiSlider.on('end', drawGraphs)
