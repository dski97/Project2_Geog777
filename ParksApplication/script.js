require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "esri/PopupTemplate"
], function (esriConfig, Map, MapView, 
    FeatureLayer, GroupLayer, LayerList, Expand, Legend, PopupTemplate) {
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

    var legend = new Legend({
        view: view,
        style: "classic" // Set the legend to use the classic style
    });

    var legendExpand = new Expand({
        view: view,
        content: legend,
        expanded: true
    });

    view.ui.add(legendExpand, "bottom-left");  // Add the expand instance to the ui

    var parkBoundaryPopupTemplate = new PopupTemplate({
        title: "<span style='color: red;'>{FullName}</span>",
        content: [
            {
                type: "text",
                text: "This is the boundary of <span style='color: red;'>{FullName}</span>. There is a total of "
            },
            {
                type: "fields",
                fieldInfos: [{
                    fieldName: "DeedAcres",
                    label: "Total Acres",
                    format: {
                        places: 0,
                        digitSeparator: true
                    }
                }]
            },
            {
                type: "text",
                text: " acres in the park."
            }
        ]
    });

    var parkBoundaryLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Park_Boundary_Cali/FeatureServer",
        title: "Park Boundaries",  // Updated title to 'Park Boundaries'
        popupTemplate: parkBoundaryPopupTemplate
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

    // Create individual FeatureLayers
    var rangerStationsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ranger_Stations/FeatureServer",
        title: "Ranger Stations"
    });

    var informationCentersLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Information_Centers/FeatureServer",
        title: "Information Centers"
    });

    var campgroundsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Campgrounds/FeatureServer",
        title: "Campgrounds"
    });

    // Create a GroupLayer to hold the new FeatureLayers
    var parkInformationGroupLayer = new GroupLayer({
        title: "Park Information",
        layers: [informationCentersLayer, campgroundsLayer, rangerStationsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    // Create individual FeatureLayers
    var roadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Roads_in_the_Park/FeatureServer",
        title: "Roads"
    });

    var bridgesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Bridges/FeatureServer",
        title: "Bridges"
    });

    var overlooksLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Overlooks/FeatureServer",
        title: "Overlooks"
    });
        
        
    // Create a GroupLayer to hold the new FeatureLayers
    var infrastructureGroupLayer = new GroupLayer({
        title: "Infrastructure",
        layers: [overlooksLayer, bridgesLayer, roadsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    // Create individual FeatureLayers for each trail
    var trailsPopupTemplate = new PopupTemplate({
        title: "{MAPLABEL}",  // Display the Trail Name field value as the popup title
        content: [
            {
                type: "text",
                text: "From Junction: {From_Junc}<br>"
                      + "To Junction: {To_Junc}<br>"
                      + "Trail Class: {TRLCLASS}<br>"
                      + "Length: {LengthMiles} miles<br>"
            }
        ]
    });

    var trailsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Trails_for_Parks/FeatureServer",
        title: "Trails",
        popupTemplate: trailsPopupTemplate  // Assign the popup template to this layer
    });

    var trailPopupTemplate = new PopupTemplate({
        title: "{TrailName}",  
        content: [
            {
                type: "text",
                text: "Alternative Names: {AltNames}<br>"
                      + "From Junction: {From_Junc}<br>"
                      + "To Junction: {To_Junc}<br>"
                      + "Length: {Length_Miles} miles<br>"
            }
        ]
    });

    var trailPopupTemplate = new PopupTemplate({
        title: "{TrailName}",  
        content: [
            {
                type: "text",
                text: "Alternative Names: {AltNames}<br>"
                      + "From Junction: {From_Junc}<br>"
                      + "To Junction: {To_Junc}<br>"
                      + "Length: {Length_Miles} miles<br>"
            }
        ]
    });

    var pacificCrestTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/PacificCrestTrail/FeatureServer",
        title: "Pacific Crest Trail",
        popupTemplate: trailPopupTemplate  // Assign the popup template to this layer
    });

    var johnMuirTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/John_Muir_Trail/FeatureServer",
        title: "John Muir Trail",
        popupTemplate: trailPopupTemplate  // Assign the popup template to this layer
    });

    var highSierraTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/High_Sierra_Trail/FeatureServer",
        title: "High Sierra Trail",
        popupTemplate: trailPopupTemplate  // Assign the popup template to this layer
    });

    var raeLakesLoopLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Rae_Lakes_Loop/FeatureServer",
        title: "Rae Lakes Loop",
        popupTemplate: trailPopupTemplate // Assign the popup template to this layer
    });


    var trailheadsPopupTemplate = new PopupTemplate({
        title: "Trailhead: {name}",
    });

    var trailheadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Trailheads_Parks/FeatureServer",
        title: "Trailheads",
        popupTemplate: trailheadsPopupTemplate
    });

    // Create a GroupLayer to hold the trail FeatureLayers
    var trailsGroupLayer = new GroupLayer({
        title: "Trails",
        layers: [trailsLayer, pacificCrestTrailLayer, johnMuirTrailLayer, highSierraTrailLayer, raeLakesLoopLayer, trailheadsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    // Create individual FeatureLayers for each natural feature
    var ecoZonesPopupTemplate = new PopupTemplate({
        title: "{Ecozone}",  // Display the Ecozone field value as the popup title
        content: "The {Ecozone} covers an area of {Acres} acres."  // Content displaying the Ecozone name and acreage
    });

    var ecologicalZonesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ecological_Zones/FeatureServer",
        title: "Ecological Zones",
        popupTemplate: ecoZonesPopupTemplate  // Assign the popup template to this layer
    });
    
    var riversPopupTemplate = new PopupTemplate({
        title: "{NAME}",  // Display the river name as the popup title
    });

    var majorRiversLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Major_Rivers/FeatureServer",
        title: "Major Rivers",
        popupTemplate: riversPopupTemplate  // Assign the popup template to this layer
    });
    

    var sequoiaPopupTemplate = new PopupTemplate({
        title: "{Grove_Name}",  // Display the grove name as the popup title
        content: "The {Grove_Name} covers an area of {Acres} acres."  // Content displaying the grove name and acreage
    });

    var giantSequoiaGrovesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Giant_Sequoia_Groves/FeatureServer",
        title: "Giant Sequoia Groves",
        popupTemplate: sequoiaPopupTemplate  // Assign the popup template to this layer
    });
    
    var namedSequoiaTreesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Named_Sequoia_Trees/FeatureServer",
        title: "Named Sequoia Trees"
    });
    
    // Create a GroupLayer to hold the natural feature FeatureLayers
    var naturalFeaturesGroupLayer = new GroupLayer({
        title: "Natural Features",
        layers: [ecologicalZonesLayer, majorRiversLayer, giantSequoiaGrovesLayer, namedSequoiaTreesLayer],
        visible: false,
        visibilityMode: "independent"
    });

     // Add the GroupLayer to the map
    map.add(boundariesGroupLayer);
    map.add(naturalFeaturesGroupLayer);
    map.add(trailsGroupLayer)
    map.add(infrastructureGroupLayer);
    map.add(parkInformationGroupLayer)



    var layerList = new LayerList({
        view: view
    });

    view.ui.add(layerList, "top-right");  // Add the LayerList widget to the top-right corner of the view
});
