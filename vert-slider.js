let vertMin;
let vertMax;

let vertTip = {
  decimals: 1,
  suffix: "K",
  encoder: function( value ){
            return value / 1000;
           },
  decoder: function( value ){
           return value * 1000;
          }
        }

var vert_slider = document.getElementById('vert-slider');
noUiSlider.create(vert_slider, {
    connect: true,
    step: 100,
    tooltips: [wNumb(vertTip),wNumb(vertTip)],
    start: [ 100, 6000 ],

    range: {
        min: 100,
        max: 6000
    }
});

vert_slider.noUiSlider.on('update', function( values, handle ) {
    //handle = 0 if min-slider is moved and handle = 1 if max slider is moved
    if (handle==0){
        document.getElementById('vert-min').value = values[0];
    } else {
        document.getElementById('vert-max').value =  values[1];
    }
//we will definitely do more here...wait

vertMin = document.getElementById('vert-min').value;
vertMax = document.getElementById('vert-max').value;

//first let's clear the layer:
resortsFeatureGroup.clearLayers();
//and repopulate it
 createMarkers  = new L.geoJson(resorts,{
    onEachFeature: resortPopups,
        filter:
            function(feature, layer) {
                 return (feature.properties.ticket <= rangeMax) &&
                    (feature.properties.ticket >= rangeMin) &&
                    (feature.properties.vertical <= vertMax) &&
                    (feature.properties.vertical >= vertMin);
            },
    pointToLayer: resortsLayer
})
//and back again into the cluster group
resortsFeatureGroup.addLayer( createMarkers );

})
