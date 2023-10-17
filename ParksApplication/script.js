require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView"
], function (esriConfig, Map, MapView) {
    esriConfig.apiKey = "YOUR_API_KEY_HERE";  // Replace with your API key

    var map = new Map({
        basemap: "arcgis-topographic"  // ArcGIS Online basemap
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 4,
        center: [-96, 37]  // longitude, latitude
    });
});
