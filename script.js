let map = L.map('map', {worldCopyJump: true}).setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 7,
    attribution: '© <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> contributors'
}).addTo(map);

map.setView([30, 0], 0);

let selected;
fetch("./data/countries.geojson")
.then(res => res.json())
.then(data => {
    L.geoJSON(data, {
        style: {
            "color": "gray",
            "weight": 2,
            "opacity": 0.65
        },
        onEachFeature: onEachFeature,
    }).on('click', function (e) {
        if (selected) {
          e.target.resetStyle(selected);
        }
        selected = e.layer;
        selected.bringToFront();
        selected.setStyle({
          'color': '#ff7800',
          'weight': 4
        })
      }).addTo(map);
});

function onEachFeature(feature, layer) {
    if (feature.properties.ADMIN) {
        layer.bindPopup(feature.properties.ADMIN);
    }
}




