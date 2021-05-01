
/*Layers sélectionnées au chargement*/
const defaultLayerName1 = data[1].name;
const defaultLayerName2 = data[2].name;

/*ajout des noms dans les menus déroulant avec les deux première valeur par default*/
jQuery(document).ready(function(){
	$("#dropdownMap1").append("<option>"+defaultLayerName1+"</option>");
	$("#dropdownMap2").append("<option>"+defaultLayerName2+"</option>");
	for (let i in data){ 
		if(data[i].name != defaultLayerName1 && data[i].name != defaultLayerName2){
			$("#dropdownMap1").append("<option>"+data[i].name+"</option>");
		}
		if (data[i].name != defaultLayerName2 && data[i].name != defaultLayerName1){
			$("#dropdownMap2").append("<option>"+data[i].name+"</option>");
		}
	}
});

/*instanciation des sources et des layers*/
let sources = {};
let layers = {};

for (let i in data){
	if (data[i].type == "OSM"){
		let osm = new ol.source.OSM();
		sources[data[i].name]=(osm);
	}else if(data[i].type == "WMS"){
		let wms = new ol.source.TileWMS({
			url:data[i].url,
			params:{"LAYERS":data[i].layer}
		});
		sources[data[i].name]=(wms);
	}else if (data[i].type == "WMTS"){
		let wmts = new ol.source.WMTS({
            url: data[i].url,
            layer: data[i].layer,
            matrixSet: data[i].matrixSet,
            format: data[i].format,
            projection:data[i].projection,
            style: data[i].style,
            tileGrid : new ol.tilegrid.WMTS({
                origin: data[i].origin, 
                resolutions: data[i].resolutions, 
                matrixIds: data[i].matrixIds
            })
    	});
    	sources[data[i].name]=(wmts);
    }
};

for (let id in sources){
	let layer = new ol.layer.Tile({
		source:sources[id]
	});
	layers[id] = layer;
};

/*instanciation de la vue*/
let view = new ol.View({
	projection:'EPSG:3857',
	center:[76895.650455,6007186.052932],
	zoom:15,
	minZoom:13,
	maxZoom:18
	});

/*carte par default*/
let currentLayer1 = layers[defaultLayerName1];
let currentLayer2 = layers[defaultLayerName2];

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
let collec = "";
let selected1 = defaultLayerName1;
$('#dropdownMap1').on("change",function(){
	selected1 = $('#dropdownMap1 option:selected').text();
	if (layers[selected1]["ol_uid"]!= layers[selected2]["ol_uid"]){
		collec = map1.getLayers();
		currentLayer1 = collec["array_"][0];
		map1.removeLayer(currentLayer1);
		map1.addLayer(layers[selected1]);
		/*modification des menus déroulant en fonction des nouvelles map selectionnées*/
		$("#dropdownMap1").empty();
		$("#dropdownMap2").empty();
		$("#dropdownMap1").append("<option>"+selected1+"</option>");
		$("#dropdownMap2").append("<option>"+selected2+"</option>");
		for (let i in data){ 
			if(data[i].name != selected1 && data[i].name != selected2){
				$("#dropdownMap1").append("<option>"+data[i].name+"</option>");
			}
			if (data[i].name != selected2 && data[i].name != selected1){
				$("#dropdownMap2").append("<option>"+data[i].name+"</option>");
			}
		}
	}
});	

let selected2 = defaultLayerName2;
$('#dropdownMap2').on("change",function(){
	selected2 = $('#dropdownMap2 option:selected').text();
	if (layers[selected2]["ol_uid"]!= layers[selected1]["ol_uid"]){
		collec = map2.getLayers();
		currentLayer2 = collec["array_"][0];
		map2.removeLayer(currentLayer2);
		map2.addLayer(layers[selected2]);
		/*modification des menus déroulant en fonction des nouvelles map selectionnées*/
		$("#dropdownMap1").empty();
		$("#dropdownMap2").empty();
		$("#dropdownMap1").append("<option>"+selected1+"</option>");
		$("#dropdownMap2").append("<option>"+selected2+"</option>");
		for (var i in data){ 
			if(data[i].name != selected1 && data[i].name != selected2){
				$("#dropdownMap1").append("<option>"+data[i].name+"</option>");
			}
			if (data[i].name != selected2 && data[i].name != selected1){
				$("#dropdownMap2").append("<option>"+data[i].name+"</option>");
			}
		}
	}
});	





