/*Données pour instanciation des sources et layers
Ajouter nom,url, nom de la couche et type de couche (OSM ou WMS)*/
var data = [
	{"name":"Osm2plan",'url':"https://geoserver.maps.science/geoserver/OSM/wms?request=GetMap&service=WMS&version1.1.1", "layer":"plan_osm_uk","type":"WMS"},
	{"name":"Osm",'url':"", "layer":"","type":"OSM"}
];

/*ajout des noms dans les menus déroulant */
jQuery(document).ready(function(){
	for (var i in data){
		$("#dropdownMap1").append("<option>"+data[i]["name"]+"</option>");
		$("#dropdownMap2").append("<option>"+data[i]["name"]+"</option>");
	}
});

/*instanciation des sources et des layers*/
let sources = {};
let layers = {};

for (let i in data){
	if (data[i]["type"] == "OSM"){
		let osm = new ol.source.OSM();
		sources[data[i]["name"]]=(osm);
	}if(data[i]["type"] == "WMS"){
		let wms = new ol.source.TileWMS({
			url:data[i]["url"],
			params:{"LAYERS":data[i]["layer"]}
		});
		sources[data[i]["name"]]=(wms);
	};
};

for (var id in sources){
	let layer = new ol.layer.Tile({
		source:sources[id]
	});
	layers[id] = layer;
};

/*instanciation de la vue*/
let view = new ol.View({
	projection:'EPSG:4326',
	center:[6.032179,47.280694],
	zoom:8
	});

/*carte par default*/
let currentLayer1 = layers[data[0]["name"]];
let currentLayer2 = layers[data[1]["name"]];

/*instaciation des cartes*/
let map1 = new ol.Map({
	target:'map1',
	layers:[currentLayer1],
	view:view,
});

let map2 = new ol.Map({
	target:'map2',
	layers:[currentLayer2],
	view:view,
});

/*événements modification cartes*/
let selected1 = "";
$('#dropdownMap1').on("change",function(){
	selected1 = $('#dropdownMap1 option:selected').text();
	if (selected1 != ""){
		newLayer1 = layers[selected1];
		map1.removeLayer(currentLayer1);
		map1.addLayer(layers[selected1]);
	}
});	

let selected2 = "";
$('#dropdownMap2').on("change",function(){
	selected2 = $('#dropdownMap2 option:selected').text();
	if (selected1 != ""){
		newLayer2 = layers[selected2];
		map2.removeLayer(currentLayer2);
		map2.addLayer(layers[selected2]);
	}
});	





/*selection de la carte à afficher*/


/*let ignPlan = new ol.source.WMTS({
	url:"https://wxs.ign.fr/pratique/geoportail/wmts",
	layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS",
	matrixSet:"PM",
	format:"image/jpeg",
	style:"normal",
    attribution: "&copy; IGN"
});*/

/*let ignPlanLayer = new ol.layer.Tile({
	source:ignPlan
});*/