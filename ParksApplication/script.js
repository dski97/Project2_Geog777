require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView"
], function (esriConfig, Map, MapView) {
    esriConfig.apiKey = "AAPK0401ef0eec41482c8aa0f4e7b5b118c24q7q7NIv8wbHpLPAB-Gvij3hfV_lpqWtqNzqcjDlMqJCmQc5meuAETYsSI2KOgu_";  // Replace with your API key

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
