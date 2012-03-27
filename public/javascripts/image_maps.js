$(document).ready(function(){
   map_init();
});

function map_init() {
  map = new OpenLayers.Map('map', {});
  
  var summary_1 = new OpenLayers.Layer.Image(
    ' Summary', 
    '/img/summary_1.jpg',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {numZoomLevels:7, maxResolution:.625}
  );
  
  var summary_2 = new OpenLayers.Layer.Image(
    ' Details', 
    '/img/summary_details.png',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {
      numZoomLevels:7, 
      maxResolution:.625,
      isBaseLayer:false,
      visibility: false,
      opacity: 0.8
    }
  );
  
  var summary_3 = new OpenLayers.Layer.Image(
    ' Annotations', 
    '/img/summary_annotations.png',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {
      numZoomLevels:7, 
      maxResolution:.625,
      isBaseLayer:false,
      visibility: false,
      opacity: 0.8
    }
  );
  
  
  map.addLayers([summary_1, summary_2, summary_3]);
  
  map.addControl(new OpenLayers.Control.LayerSwitcher({}));
  
  if(!map.getCenter()){
    map.zoomToMaxExtent();
  }
}