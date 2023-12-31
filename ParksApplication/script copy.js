require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/GroupLayer",
    "esri/widgets/LayerList",
    "esri/widgets/Expand",
    "esri/widgets/Legend",
    "esri/PopupTemplate",
    "esri/widgets/BasemapGallery",
    "esri/core/reactiveUtils"
], function(esriConfig, Map, MapView,
    FeatureLayer, GroupLayer, LayerList, Expand, Legend, PopupTemplate, BasemapGallery, reactiveUtils) {
    esriConfig.apiKey = "AAPK0401ef0eec41482c8aa0f4e7b5b118c24q7q7NIv8wbHpLPAB-Gvij3hfV_lpqWtqNzqcjDlMqJCmQc5meuAETYsSI2KOgu_"; // Replace with your API key

    var map = new Map({
        basemap: "arcgis-topographic" // ArcGIS Online basemap
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 10, // Adjusted zoom level to be one level closer
        center: [-118.5750, 36.75] // longitude, latitude to Kings Canyon and Sequoia National Park
    });

    const bgExpand = new Expand({
        view,
        content: new BasemapGallery({ view }),
        expandIcon: "basemap"
    });
    view.ui.add(bgExpand, "bottom-left");

    const uniqueValueRenderer = {
        type: "unique-value",
        field: "wildlife_animal_observed",
        uniqueValueInfos: [{
                value: "Black Bear",
                symbol: {
                    type: "picture-marker",
                    url: "icons/bear.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Mule Deer",
                symbol: {
                    type: "picture-marker",
                    url: "icons/deer.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Gray Squirrel/Chipmunk",
                symbol: {
                    type: "picture-marker",
                    url: "icons/chipmunk.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Birds of Prey (hawks, eagles, owls)",
                symbol: {
                    type: "picture-marker",
                    url: "icons/bird.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Amphibians (frogs, salamanders)",
                symbol: {
                    type: "picture-marker",
                    url: "icons/frog.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Raccoon/Marten",
                symbol: {
                    type: "picture-marker",
                    url: "icons/racoon.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Songbirds (robins, finches, etc.)",
                symbol: {
                    type: "picture-marker",
                    url: "icons/bird.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Bats",
                symbol: {
                    type: "picture-marker",
                    url: "icons/bats.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Reptiles (lizards, snakes)",
                symbol: {
                    type: "picture-marker",
                    url: "icons/reptile.png",
                    width: "24px",
                    height: "24px"
                }
            },
            {
                value: "Other",
                symbol: {
                    type: "picture-marker",
                    url: "icons/other.png",
                    width: "24px",
                    height: "24px"
                }
            }
        ]
    };

    var wildlifeSpottedLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/ArcGIS/rest/services/survey123_1a41216f9d2c4a3585d369fdd0a3d4f1_results/FeatureServer",
        title: "Wildlife Spotted",
        renderer: uniqueValueRenderer, // Set the renderer
        popupTemplate: {
            title: "Wildlife Sighting Details",
            content: [{
                type: "fields",
                fieldInfos: [{
                        fieldName: "wildlife_animal_observed",
                        label: "Wildlife Animal Observed",
                        visible: true
                    },
                    {
                        fieldName: "wild_other",
                        label: "Other - Wildlife Animal Observed",
                        visible: true
                    },
                    {
                        fieldName: "date_and_time_of_sighting",
                        label: "Date and Time of Sighting",
                        visible: true,
                        format: {
                            dateFormat: "short-date-short-time"
                        }
                    },
                    {
                        fieldName: "weather_conditions",
                        label: "Weather Conditions",
                        visible: true
                    },
                    {
                        fieldName: "observed_behaviour",
                        label: "Observed Behaviour",
                        visible: true
                    },
                    {
                        fieldName: "habitat_type",
                        label: "Habitat Type",
                        visible: true
                    },
                    {
                        fieldName: "notes",
                        label: "Notes",
                        visible: true
                    },
                    {
                        fieldName: "Photos And Files",
                        label: "Photos and Files",
                        visible: true
                    }
                ]
            }]
        }
    });


    var wildlifeSpottedLayerGroup = new GroupLayer({
        title: "Wildlife Spotted",
        layers: [wildlifeSpottedLayer],
        visible: false,
    });

    var parkBoundaryPopupTemplate = new PopupTemplate({
        title: "<span style='color: red;'>{FullName}</span>",
        content: [{
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
        title: "Park Boundaries", // Updated title to 'Park Boundaries'
        popupTemplate: parkBoundaryPopupTemplate
    });

    var wildernessTravelZonesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Wilderness_Travel_Zones/FeatureServer",
        title: "Wilderness Travel Zones", // Set title to identify in LayerList
        visible: false // Set initial visibility to off
    });

    var boundariesGroupLayer = new GroupLayer({
        title: "Boundaries", // Set title for the group layer
        layers: [parkBoundaryLayer, wildernessTravelZonesLayer], // Include both feature layers in the group
        visibility: true, // Set initial visibility for the group layer
        visibilityMode: "independent" // Layers can be toggled independently
    });

    var rangerStationsPopupTemplate = new PopupTemplate({
        title: "{Name}", // Display the Name field value as the popup title
        content: [{
            type: "text",
            text: "Location: {Location}<br>" +
                "Use/Purpose: {Use_Purpose}<br>"
        }]
    });

    var rangerStationsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ranger_Stations/FeatureServer",
        title: "Ranger Stations",
        popupTemplate: rangerStationsPopupTemplate // Assign the popup template to this layer
    });

    var informationCentersPopupTemplate = new PopupTemplate({
        title: "{NAME}" // Display the Name field value as the popup title
    });

    var informationCentersLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Information_Centers/FeatureServer",
        title: "Information Centers",
        popupTemplate: informationCentersPopupTemplate // Assign the popup template to this layer
    });


    var campgroundsPopupTemplate = new PopupTemplate({
        title: "{Campground}", // Display the Campground field value as the popup title
        content: [{
            type: "text",
            text: "Number of Sites: {Sites}<br>"
        }]
    });

    var campgroundsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Campgrounds/FeatureServer",
        title: "Campgrounds",
        popupTemplate: campgroundsPopupTemplate // Assign the popup template to this layer
    });

    var parkInformationGroupLayer = new GroupLayer({
        title: "Park Information",
        layers: [informationCentersLayer, campgroundsLayer, rangerStationsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    var roadsPopupTemplate = new PopupTemplate({
        title: "{RoadName}", // Display the Road Name field value as the popup title
        content: [{
            type: "text",
            text: "Surface: {RoadSurface}<br>" +
                "Road Class: {RoadClass}<br>"
        }]
    });

    var roadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Roads_in_the_Park/FeatureServer",
        title: "Roads",
        popupTemplate: roadsPopupTemplate // Assign the popup template to this layer
    });

    var bridgesPopupTemplate = new PopupTemplate({
        title: "{LOCATION}" // Display the Location field value as the popup title
    });

    var bridgesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Bridges/FeatureServer",
        title: "Bridges",
        popupTemplate: bridgesPopupTemplate // Assign the popup template to this layer
    });

    var overlooksPopupTemplate = new PopupTemplate({
        title: "{Name}" // Display the Name field value as the popup title
    });

    var overlooksLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Overlooks/FeatureServer",
        title: "Overlooks",
        popupTemplate: overlooksPopupTemplate // Assign the popup template to this layer
    });

    var infrastructureGroupLayer = new GroupLayer({
        title: "Infrastructure",
        layers: [overlooksLayer, bridgesLayer, roadsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    var trailsPopupTemplate = new PopupTemplate({
        title: "{MAPLABEL}", // Display the Trail Name field value as the popup title
        content: [{
            type: "text",
            text: "From Junction: {From_Junc}<br>" +
                "To Junction: {To_Junc}<br>" +
                "Trail Class: {TRLCLASS}<br>" +
                "Length: {LengthMiles} miles<br>"
        }]
    });

    var trailsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Trails_for_Parks/FeatureServer",
        title: "Trails",
        popupTemplate: trailsPopupTemplate // Assign the popup template to this layer
    });

    var trailPopupTemplate = new PopupTemplate({
        title: "{TrailName}",
        content: [{
            type: "text",
            text: "Alternative Names: {AltNames}<br>" +
                "From Junction: {From_Junc}<br>" +
                "To Junction: {To_Junc}<br>" +
                "Length: {Length_Miles} miles<br>"
        }]
    });

    var trailPopupTemplate = new PopupTemplate({
        title: "{TrailName}",
        content: [{
            type: "text",
            text: "Alternative Names: {AltNames}<br>" +
                "From Junction: {From_Junc}<br>" +
                "To Junction: {To_Junc}<br>" +
                "Length: {Length_Miles} miles<br>"
        }]
    });

    var pacificCrestTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/PacificCrestTrail/FeatureServer",
        title: "Pacific Crest Trail",
        popupTemplate: trailPopupTemplate // Assign the popup template to this layer
    });

    var johnMuirTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/John_Muir_Trail/FeatureServer",
        title: "John Muir Trail",
        popupTemplate: trailPopupTemplate // Assign the popup template to this layer
    });

    var highSierraTrailLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/High_Sierra_Trail/FeatureServer",
        title: "High Sierra Trail",
        popupTemplate: trailPopupTemplate // Assign the popup template to this layer
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

    var trailsGroupLayer = new GroupLayer({
        title: "Trails",
        layers: [trailsLayer, pacificCrestTrailLayer, johnMuirTrailLayer, highSierraTrailLayer, raeLakesLoopLayer, trailheadsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    var ecoZonesPopupTemplate = new PopupTemplate({
        title: "{Ecozone}", // Display the Ecozone field value as the popup title
        content: "The {Ecozone} covers an area of {Acres} acres." // Content displaying the Ecozone name and acreage
    });

    var ecologicalZonesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ecological_Zones/FeatureServer",
        title: "Ecological Zones",
        popupTemplate: ecoZonesPopupTemplate // Assign the popup template to this layer
    });

    var riversPopupTemplate = new PopupTemplate({
        title: "{NAME}", // Display the river name as the popup title
    });

    var majorRiversLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Major_Rivers/FeatureServer",
        title: "Major Rivers",
        popupTemplate: riversPopupTemplate // Assign the popup template to this layer
    });


    var sequoiaPopupTemplate = new PopupTemplate({
        title: "{Grove_Name}", // Display the grove name as the popup title
        content: "The {Grove_Name} covers an area of {Acres} acres." // Content displaying the grove name and acreage
    });

    var giantSequoiaGrovesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Giant_Sequoia_Groves/FeatureServer",
        title: "Giant Sequoia Groves",
        popupTemplate: sequoiaPopupTemplate // Assign the popup template to this layer
    });

    var namedSequoiaTreesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Named_Sequoia_Trees/FeatureServer",
        title: "Named Sequoia Trees"
    });

    var naturalFeaturesGroupLayer = new GroupLayer({
        title: "Natural Features",
        layers: [ecologicalZonesLayer, majorRiversLayer, giantSequoiaGrovesLayer, namedSequoiaTreesLayer],
        visible: false,
        visibilityMode: "independent"
    });

    map.add(boundariesGroupLayer);
    map.add(naturalFeaturesGroupLayer);
    map.add(trailsGroupLayer)
    map.add(infrastructureGroupLayer);
    map.add(parkInformationGroupLayer)
    map.add(wildlifeSpottedLayerGroup)
});