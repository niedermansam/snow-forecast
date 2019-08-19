let rangeMin;
let rangeMax;

let priceTip ={
  decimals: 0,
  prefix: "$",
}

var price_slider = document.getElementById('price-slider');
noUiSlider.create(price_slider, {
    connect: true,
    step: 1,
    tooltips: [wNumb(priceTip),wNumb(priceTip)],
    start: [ 1, 155 ],
    range: {
        min: 1,
        max: 155
    },
});

price_slider.noUiSlider.on('update', function( values, handle ) {
    //handle = 0 if min-slider is moved and handle = 1 if max slider is moved
    if (handle==0){
        document.getElementById('ticket-min').value = values[0];
    } else {
        document.getElementById('ticket-max').value =  values[1];
    }
//we will definitely do more here...wait

rangeMin = document.getElementById('ticket-min').value;
rangeMax = document.getElementById('ticket-max').value;

//first let's clear the layer:
resortsFeatureGroup.clearLayers();
//and repopulate it
 createMarkers  = new L.geoJson(resorts,{
    onEachFeature: resortPopups,
        filter:
            function(feature, layer) {
                 return (feature.properties.ticket <= rangeMax) && (feature.properties.ticket >= rangeMin) && (feature.properties.vertical <= vertMax) && (feature.properties.vertical >= vertMin);
            },
    pointToLayer: resortsLayer
})
//and back again into the cluster group
resortsFeatureGroup.addLayer( createMarkers );

})
