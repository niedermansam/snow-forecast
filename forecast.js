let clickMarker;
getForecast = function(latlon){
let url = `https://api.weather.gov/points/${latlon}/forecast`

fetch(url)
.then(response => response.json())
.then(data =>{
              if(clickMarker){
                map.removeLayer(clickMarker);
              }
              let lat = data.geometry.geometries[0].coordinates[1]
              let lon = data.geometry.geometries[0].coordinates[0]

              let clickSpot = [lat,lon]
              clickMarker = new L.marker(clickSpot).bindPopup("Forecast Location");
              map.addLayer(clickMarker);

              for (let period of data.properties.periods){

                let icon = period.icon.replace(/medium/,"large");
              document.getElementById('forecast').innerHTML +=
                `<div class="forecast-box">
                 <p><strong>${period.name}:</strong></p>
                <img class='image' src = ${icon}>
                <p class="details">${period.detailedForecast}<p></div>`
              }


                let snowForecast = {low: [], high: []};
                let futureSnow = {}
                let pattern = /New snow accumulation(.*)/g

                function getSum(total, num) {
                    return total + num;
                }

              for (let period of data.properties.periods){

                snow = period.detailedForecast.replace('around one','of 1 to 1').match(pattern);

                if(!snow) {
                  snow = ['of 0 to 0'];
                }
                low = snow.toString().match(/of \d+/);
                if(!low) {
                  low = ['of 0'];
                }

                low = parseInt(low.toString().match(/\d+/).toString());
                snowForecast.low.push(low)

                high = snow.toString().match(/to \d+/);
                if(!high) {
                  high = ['to 0'];
                }

                high = parseInt(high.toString().match(/\d+/).toString());
                snowForecast.high.push(high)
              }


              let day = 2;
              if (data.properties.periods[0].name == "This Afternoon"){
                day = 3;
              }

              let elevation = Math.round(data.properties.elevation.value * 3.28084)

                futureSnow.l12 = snowForecast.low.slice(0,day-1).reduce(getSum, 0);
                futureSnow.h12 = snowForecast.high.slice(0,day-1).reduce(getSum, 0);

                futureSnow.l24 = snowForecast.low.slice(0,day).reduce(getSum, 0);
                futureSnow.h24 = snowForecast.high.slice(0,day).reduce(getSum, 0);

                futureSnow.l48 = snowForecast.low.slice(0,day+2).reduce(getSum, 0);
                futureSnow.h48 = snowForecast.high.slice(0,day+2).reduce(getSum, 0);

                futureSnow.l72 = snowForecast.low.slice(0,day+4).reduce(getSum, 0);
                futureSnow.h72 = snowForecast.high.slice(0,day+4).reduce(getSum, 0);

                futureSnow.lAll = snowForecast.low.reduce(getSum, 0);
                futureSnow.hAll = snowForecast.high.reduce(getSum, 0);

                forecastOut = `<h3 class='forecast-label' style="margin-bottom: 0; text-decoration: underline;">Snow Forecast:</h3>
                               <p class='forecast-label' style= "margin-top:0; margin-bottom: 8px; font-size:12px;">(${lat},${lon})<br/>Forecast Elevation: ${elevation} ft.</p>
                               <ul>
                               <li>${futureSnow.l12} - ${futureSnow.h12} inches in the next 12 hours</li>
                               <li>${futureSnow.l24} - ${futureSnow.h24} inches in the next 24 hours</li>
                               <li>${futureSnow.l48} - ${futureSnow.h48} inches in the next 48 hours</li>
                               <li>${futureSnow.l72} - ${futureSnow.h72} inches in the next 72 hours</li>
                               <li>${futureSnow.lAll} - ${futureSnow.hAll} inches in the next week</li>
                               </ul>
                               <div class='forecast-label' id='full-forecast-button'><button type="button" id='scroll' onclick="smoothScroll(document.getElementById('forecast'))">Full Forecast</button>
                               </div>
                               `;



                forecastOut = forecastOut.replace(/0 - 0/g,'0').replace(/1 - 1 inches/g,'1 inch')
                document.getElementById('snow-forecast').innerHTML = forecastOut;
             })
.catch(err => {console.log(err)
                document.getElementById('snow-forecast').innerHTML = "<p class='error'>Sorry, we don't currently provide forecasts outside the United States.</p>";
              })

}

map.on('click', function(e) {
    document.getElementById('forecast').innerHTML = "";
    document.getElementById('snow-forecast').innerHTML = "<p id='loader' class='breath-animate'><img src='snowflake.png'/></P>"
    let coords = `${e.latlng.lat},${e.latlng.lng}`;
    getForecast(coords);
});

resortsFeatureGroup.on('click', function(e) {
    document.getElementById('forecast').innerHTML = "";
    document.getElementById('snow-forecast').innerHTML = "<p id='loader' class='breath-animate'><img src='snowflake.png'/></P>"
    let coords = `${e.latlng.lat},${e.latlng.lng}`;
    getForecast(coords);
});
