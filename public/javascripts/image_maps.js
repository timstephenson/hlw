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
    { 
      scales: [190000000, 150000000, 110000000, 70000000, 30000000, 5000000],
      numZoomLevels:6, 
      maxResolution:.625
    }
  );
  
  var summary_2 = new OpenLayers.Layer.Image(
    ' Details', 
    '/img/summary_details.png',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {
      scales: [190000000, 150000000, 110000000, 70000000, 30000000, 5000000],
      isBaseLayer:false,
      numZoomLevels:6, 
      maxResolution:.625,
      opacity: 1.0,
      displayInLayerSwitcher: false,
      minScale:70000000
    }
  );
  
  var summary_labels = new OpenLayers.Layer.Image(
    ' Details', 
    '/img/summary_labels.png',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {
      scales: [190000000, 150000000, 110000000, 70000000, 30000000, 5000000],
      isBaseLayer:false,
      numZoomLevels:6, 
      maxResolution:.625,
      opacity: 1.0,
      displayInLayerSwitcher: false,
      maxScale:70000000
    }
  );
  
  var summary_3 = new OpenLayers.Layer.Image(
    ' Annotations', 
    '/img/summary_annotations.png',
    new OpenLayers.Bounds(-293.4, -180, 293.4, 180),
    new OpenLayers.Size(5397, 3296),
    {
      numZoomLevels:6, 
      maxResolution:.625,
      isBaseLayer:false,
      visibility: false,
      opacity: 0.8
    }
  );
  
  
  map.addLayers([summary_1, summary_labels, summary_3, summary_2]);
  
  map.addControl(new OpenLayers.Control.LayerSwitcher({}));
  
  if(!map.getCenter()){
    map.zoomToMaxExtent();
  }
}