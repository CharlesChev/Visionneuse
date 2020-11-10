/*Données pour instanciation des layers*/

var data = [
	{'url':"https://geoserver.maps.science/geoserver/OSM/wms?request=GetMap&service=WMS&version1.1.1", "layer":"plan_osm_uk","type":"WMS"},
	{'url':"", "layer":"","type":"OSM"}
];

let sources = [];
let layers = [];

for (i in data){
	if (data[i]["type"] == "OSM"){
		let osm = new ol.source.OSM();
		sources.push(osm);
	};
}

console.log(sources);
/*instanciation de sources pour les layer*/
/*let osm = new ol.source.OSM();*/
let osm2plan = new ol.source.TileWMS({
	url:"https://geoserver.maps.science/geoserver/OSM/wms?request=GetMap&service=WMS&version1.1.1",
	params:{"LAYERS":"plan_osm_uk"}
});
/*let ignPlan = new ol.source.WMTS({
	url:"https://wxs.ign.fr/pratique/geoportail/wmts",
	layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS",
	matrixSet:"PM",
	format:"image/jpeg",
	style:"normal",
    attribution: "&copy; IGN"
});*/


/*instanciation des layers */
let osmLayer = new ol.layer.Tile({
	source:osm
	});
let osm2planLayer = new ol.layer.Tile({
	source:osm2plan
	});
/*let ignPlanLayer = new ol.layer.Tile({
	source:ignPlan
});*/


/*instanciation de la vue*/
let view = new ol.View({
	projection:'EPSG:4326',
	center:[6.032179,47.280694],
	zoom:8
	});

/*instaciation des cartes*/

let currentLayer1 = [osmLayer];
let currentLayer2 = [osm2planLayer];

let map1 = new ol.Map({
	target:'map1',
	layers:currentLayer1,
	view:view,
});

let map2 = new ol.Map({
	target:'map2',
	layers:currentLayer2,
	view:view,
});


