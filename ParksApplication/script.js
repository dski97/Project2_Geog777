require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Legend"
], function (esriConfig, Map, MapView, FeatureLayer, GroupLayer, LayerList, Expand, Legend) {
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
    var trailsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Trails_for_Parks/FeatureServer",
        title: "Trails"
    });

    var pacificCrestTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/PacificCrestTrail/FeatureServer",
        title: "Pacific Crest Trail"
    });

    var johnMuirTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/John_Muir_Trail/FeatureServer",
        title: "John Muir Trail"
    });

    var highSierraTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/High_Sierra_Trail/FeatureServer",
        title: "High Sierra Trail"
    });

    var raeLakesLoopLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Rae_Lakes_Loop/FeatureServer",
        title: "Rae Lakes Loop"
    });

    // Create a GroupLayer to hold the trail FeatureLayers
    var trailsGroupLayer = new GroupLayer({
        title: "Trails",
        layers: [trailsLayer, pacificCrestTrailLayer, johnMuirTrailLayer, highSierraTrailLayer, raeLakesLoopLayer],
        visible: false,
        visibilityMode: "independent"
    });

        // Create individual FeatureLayers for each natural feature
        var ecologicalZonesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ecological_Zones/FeatureServer",
            title: "Ecological Zones"
        });
    
        var majorRiversLayer = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Major_Rivers/FeatureServer",
            title: "Major Rivers"
        });
    
        var giantSequoiaGrovesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Giant_Sequoia_Groves/FeatureServer",
            title: "Giant Sequoia Groves"
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
