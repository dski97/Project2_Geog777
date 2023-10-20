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
    "esri/widgets/BasemapGallery"
], function (esriConfig, Map, MapView, 
    FeatureLayer, GroupLayer, LayerList, Expand, Legend, PopupTemplate, BasemapGallery) {
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

// Create the Legend
var legend = new Legend({
    view: view,
    style: "classic",
    container: document.createElement("div")  // Create a new div for the Legend so we can toggle its visibility
});

// Create a custom button to toggle the Legend visibility
var legendButton = document.createElement("button");
legendButton.className = "toggleLegend";  // A new class for CSS styling
legendButton.innerHTML = "Toggle Legend";
legendButton.onclick = function() {
    // Toggle the visibility of the Legend's container
    if (legend.container.style.display === "none") {
        legend.container.style.display = "block";
    } else {
        legend.container.style.display = "none";
    }
};

// Initially, let's hide the Legend
legend.container.style.display = "none";

// Add the custom button and the Legend to the bottom-left corner
view.ui.add(legendButton, "bottom-left");
view.ui.add(legend.container, "bottom-left");

    var basemapGallery = new BasemapGallery({
        view: view,  // The view that provides access to the map's basemap(s)
        source: {
            portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true  // Load vector tile basemap group
            }
        }
    });
    
    var bgExpand = new Expand({
        view: view,
        content: basemapGallery
    });
    
    view.ui.add(bgExpand, "top-left");  // Adds the BasemapGallery widget to the top-left corner of the view

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
    var rangerStationsPopupTemplate = new PopupTemplate({
        title: "{Name}",  // Display the Name field value as the popup title
        content: [
            {
                type: "text",
                text: "Location: {Location}<br>"
                      + "Use/Purpose: {Use_Purpose}<br>"
            }
        ]
    });

    var rangerStationsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Ranger_Stations/FeatureServer",
        title: "Ranger Stations",
        popupTemplate: rangerStationsPopupTemplate  // Assign the popup template to this layer
    });

    var informationCentersPopupTemplate = new PopupTemplate({
        title: "{NAME}"  // Display the Name field value as the popup title
    });

    var informationCentersLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Information_Centers/FeatureServer",
        title: "Information Centers",
        popupTemplate: informationCentersPopupTemplate  // Assign the popup template to this layer
    });


    var campgroundsPopupTemplate = new PopupTemplate({
        title: "{Campground}",  // Display the Campground field value as the popup title
        content: [
            {
                type: "text",
                text: "Number of Sites: {Sites}<br>"
            }
        ]
    });

    var campgroundsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Campgrounds/FeatureServer",
        title: "Campgrounds",
        popupTemplate: campgroundsPopupTemplate  // Assign the popup template to this layer
    });

    // Create a GroupLayer to hold the new FeatureLayers
    var parkInformationGroupLayer = new GroupLayer({
        title: "Park Information",
        layers: [informationCentersLayer, campgroundsLayer, rangerStationsLayer],
        visible: false,
        visibilityMode: "independent"
    });

    // Create individual FeatureLayers
    var roadsPopupTemplate = new PopupTemplate({
        title: "{RoadName}",  // Display the Road Name field value as the popup title
        content: [
            {
                type: "text",
                text: "Surface: {RoadSurface}<br>"
                      + "Road Class: {RoadClass}<br>"
            }
        ]
    });

    var roadsLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Roads_in_the_Park/FeatureServer",
        title: "Roads",
        popupTemplate: roadsPopupTemplate  // Assign the popup template to this layer
    });

    var bridgesPopupTemplate = new PopupTemplate({
        title: "{LOCATION}"  // Display the Location field value as the popup title
    });

    var bridgesLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Bridges/FeatureServer",
        title: "Bridges",
        popupTemplate: bridgesPopupTemplate  // Assign the popup template to this layer
    });

    var overlooksPopupTemplate = new PopupTemplate({
        title: "{Name}"  // Display the Name field value as the popup title
    });

    var overlooksLayer = new FeatureLayer({
        url: "https://services.arcgis.com/HRPe58bUyBqyyiCt/arcgis/rest/services/Overlooks/FeatureServer",
        title: "Overlooks",
        popupTemplate: overlooksPopupTemplate  // Assign the popup template to this layer
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



// Continue from your code
var layerList = new LayerList({
    view: view,
    container: document.createElement("div") // Create a new div for the LayerList so we can toggle its visibility
});

// Create a custom button to toggle LayerList
var layerListButton = document.createElement("button");
layerListButton.className = "toggleLayers";
layerListButton.innerHTML = "Toggle Layers";
layerListButton.onclick = function() {
    // Toggle the visibility of the LayerList's container
    if (layerList.container.style.display === "none") {
        layerList.container.style.display = "block";
    } else {
        layerList.container.style.display = "none";
    }
};

// Initially, let's hide the LayerList
layerList.container.style.display = "none";

// Add the LayerList and the toggle button to the bottom-right corner
view.ui.add(layerListButton, "bottom-right");
view.ui.add(layerList.container, "bottom-right");

// Create the main "Wildlife" button
var wildlifeButton = document.createElement("button");
wildlifeButton.className = "wildlifeMain";
wildlifeButton.innerHTML = "Wildlife";

// Create the "View Wildlife of the Parks" button
var viewWildlifeButton = document.createElement("button");
viewWildlifeButton.className = "wildlifeSide";
viewWildlifeButton.innerHTML = "View Wildlife of the Parks";

// Create the "Submit a Wildlife Sighting" button
var submitWildlifeButton = document.createElement("button");
submitWildlifeButton.className = "wildlifeSide";
submitWildlifeButton.innerHTML = "Submit a Wildlife Sighting";

// Add event listener for click on main button (wildlifeButton)
wildlifeButton.addEventListener('click', function(event) {
    if (wildlifeButton.classList.contains('expanded')) {
        wildlifeButton.classList.remove('expanded');
    } else {
        wildlifeButton.classList.add('expanded');
    }
    event.stopPropagation(); // to prevent the document click from immediately hiding
});

// Add event listener for click outside of button area
document.addEventListener('click', function(event) {
    if (!wildlifeButton.contains(event.target) && !event.target.classList.contains('wildlifeSide')) {
        wildlifeButton.classList.remove('expanded');
    }
});

// Add event listener for click on "Submit a Wildlife Sighting" button
submitWildlifeButton.addEventListener('click', function() {
    window.open("https://arcg.is/185H04", "_blank");
});

var modal = document.getElementById("wildlifeModal");
var closeBtn = document.getElementById("closeBtn");

viewWildlifeButton.addEventListener('click', function() {
    modal.style.display = "block";
});

closeBtn.addEventListener('click', function() {
    modal.style.display = "none";
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Add the buttons to the view
var wildlifeContainer = document.createElement("div");
wildlifeContainer.className = "wildlifeContainer";
wildlifeContainer.appendChild(wildlifeButton);
wildlifeContainer.appendChild(viewWildlifeButton);
wildlifeContainer.appendChild(submitWildlifeButton);



view.ui.add(wildlifeContainer, "top-right");

});