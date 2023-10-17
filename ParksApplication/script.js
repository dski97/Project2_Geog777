require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/widgets/LayerList"
], function (esriConfig, Map, MapView, FeatureLayer, GroupLayer, LayerList) {
    esriConfig.apiKey = "AAPK0401ef0eec41482c8aa0f4e7b5b118c24q7q7NIv8wbHpLPAB-Gvij3hfV_lpqWtqNzqcjDlMqJCmQc5meuAETYsSI2KOgu_";  // Replace with your API key

    var map = new Map({
        basemap: "arcgis-topographic"  // ArcGIS Online basemap
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10,  // Adjusted zoom level to be one level closer
        center: [-118.5750, 36.75]  // longitude, latitude to Kings Canyon and Sequoia National Park
    });

    var parkBoundaryLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Park_Boundary_Cali/FeatureServer",
        title: "Park Boundaries"  // Updated title to 'Park Boundaries'
    });

    var wildernessTravelZonesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Wilderness_Travel_Zones/FeatureServer",
        title: "Wilderness Travel Zones",  // Set title to identify in LayerList
        visible: false  // Set initial visibility to off
    });

    var boundariesGroupLayer = new GroupLayer({
        title: "Boundaries",  // Set title for the group layer
        layers: [parkBoundaryLayer, wildernessTravelZonesLayer],  // Include both feature layers in the group
        visibility: true,  // Set initial visibility for the group layer
        visibilityMode: "independent"  // Layers can be toggled independently
    });

    map.add(boundariesGroupLayer);  // Add the group layer to the map

    var layerList = new LayerList({
        view: view
    });

    view.ui.add(layerList, "top-right");  // Add the LayerList widget to the top-right corner of the view
});
