const moscu = [4195042.357258534, 7512054.249784908]
const egipto = [3483953.6173894457, 3515240.182346711];
//declaración mapa
const map = new ol.Map({
  target: 'mapa',
  })
//declaración vista
const view= new ol.View({
  center: [303304.1574060509, 4812979.610285938],
  zoom: 5,
  maxZoom: 20,
  minZoom: 3,
  rotation: 0 /*en radianes*/
})
//declaración layer (Tile)
const mapTilerSatelite =  new ol.layer.Tile({
  source: new ol.source.OSM(),
   visible: true,
   title: 'Estándar'
})
//adjunto al mapa la vista y el layer
map.setView(view);
map.addLayer(mapTilerSatelite);
map.on('click', (e)=>{
  console.log(e.coordinate);
})
//botón Egipto, animo centro, duración y zoom
document.getElementById('egipto').addEventListener('click', ()=>{
 view.animate({
    center: egipto,
    duration: 4000,
    zoom: 7  });
});
//botón Moscú, llamo a función vuelahasta
document.getElementById('moscu').addEventListener('click', ()=>{
  vuelahasta(moscu, function () {});
});


function vuelahasta(destino, hecho) {
  var duration = 2000;
  var zoom = view.getZoom();
  var parts = 2;
  var called = false;
  function pepe(acabado) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !acabado) {
      called = true;
      hecho(acabado);
      acabado = true;
    }
  }
  view.animate(
    {
      center: destino,
      duration: duration,
    },
    pepe
  );
  view.animate(
    {
      zoom: zoom - 2,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    },
    pepe
  ); 
}