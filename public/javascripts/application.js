var centreLat=0.0;
var centreLon=0.0;
var initialZoom=2;
var imageWraps=true; //SET THIS TO false TO PREVENT THE IMAGE WRAPPING AROUND

var map; //the GMap3 itself
var gmicMapType;

function GMICMapType() {
    this.Cache = Array();
    this.opacity = 1.0;
}

GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
GMICMapType.prototype.maxZoom = 19;

GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var c = Math.pow(2, zoom);
    var tilex=coord.x,tiley=coord.y;
    if (imageWraps) {
      if (tilex<0) tilex=c+tilex%c;
    	if (tilex>=c) tilex=tilex%c;
    	if (tiley<0) tiley=c+tiley%c;
    	if (tiley>=c) tiley=tiley%c;
    } else {
      if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c)) {
	      var blank = ownerDocument.createElement('DIV');
	      blank.style.width = this.tileSize.width + 'px';
	      blank.style.height = this.tileSize.height + 'px';
	      return blank;
      }
    }
    var img = ownerDocument.createElement('IMG');
    var d = tilex;
    var e = tiley;
    var f = "t";
    for (var g = 0; g < zoom; g++) {
        c /= 2;
        if (e < c) {
            if (d < c) { f += "q" }
            else { f += "r"; d -= c }
        } else {
            if (d < c) { f += "t"; e -= c }
            else { f += "s"; d -= c; e -= c }
        }
    }
    img.id = "t_" + f;
    img.style.width = this.tileSize.width + 'px';
    img.style.height = this.tileSize.height + 'px';        
    img.src = "https://s3-us-west-1.amazonaws.com//hlw-tiles/set_2/level_" + get_level(zoom) + "/" + f + ".jpg";
    this.Cache.push(img);
    return img;
}
    
GMICMapType.prototype.realeaseTile = function(tile) {
    var idx = this.Cache.indexOf(tile);
    if(idx!=-1) this.Cache.splice(idx, 1);
    tile=null;
}

GMICMapType.prototype.name = "How Life Works";
GMICMapType.prototype.alt = "Visual Summary of How Life Works";
GMICMapType.prototype.setOpacity = function(newOpacity) {
    this.opacity = newOpacity;
    for (var i = 0; i < this.Cache.length; i++) {
        this.Cache[i].style.opacity = newOpacity; //mozilla
        this.Cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
    }
}

function getWindowHeight() {
    if (window.self&&self.innerHeight) {
        return self.innerHeight;
    }
    if (document.documentElement&&document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    return 0;
}
    
function get_level(zoom) {
  var level = 0;
  switch (zoom) {
    case 2:
      level = 3;
      break;
    case 3:
      level = 4;
      break;
    case 4:
      level = 4;
      break;
    case 5:
      level = 5;
      break;
    default:
      level = 3;
  }
  return level;
}

function resizeMapDiv() {
    //Resize the height of the div containing the map.

    //Do not call any map methods here as the resize is called before the map is created.
    var d=document.getElementById("map");

    var offsetTop=0;
    for (var elem=d; elem!=null; elem=elem.offsetParent) {
        offsetTop+=elem.offsetTop;

    }
    var height=getWindowHeight()-offsetTop-16;

    if (height>=0) {
        d.style.height=height+"px";
    }
}

function load() {
    resizeMapDiv();
    var latlng = new google.maps.LatLng(centreLat, centreLon);
    var myOptions = {
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 5,
        center: latlng,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: true,
        mapTypeControlOptions: { mapTypeIds: ["ImageCutter"] },
        mapTypeId: "ImageCutter"
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);
    gmicMapType = new GMICMapType();
    map.mapTypes.set("ImageCutter", gmicMapType);

    /////////////////////////////////////////////////////////////////////////////////////
    // Setup info window
    infowindow = new google.maps.InfoWindow();
    //Add marker for video clip a
    var marker1 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(-35,-96),
         title: "Transcription Video"
     }); 

    google.maps.event.addListener(marker1, 'click', function() {
        infowindow.setContent(video_player("clip-a"));
        infowindow.open(map, marker1);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker1"), "click", function(e) {
      map.setZoom(3);
      map.panTo(marker1.getPosition());
    });
    
    //Add marker for video clip b
    var marker2 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(50,80),
         title: "Encoding RNA Video"
     }); 

    google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(video_player("clip-b"));
        infowindow.open(map, marker2);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker2"), "click", function(e) {
      map.setZoom(2);
      map.panTo(marker2.getPosition());
    });
    
    //Add marker for video clip c
    var marker3 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(-50,-120),
         title: "Encoding RNA Video"
     }); 

    google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(video_player("clip-c"));
        infowindow.open(map, marker3);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker3"), "click", function(e) {
      map.setZoom(5);
      map.panTo(marker3.getPosition());
    });
    
    //  google.maps.event.addListener(map, 'click', function(event) {
    //    placeMarker(event.latLng);
    //  });
    //
    /////////////////////////////////////////////////////////////////////////////////////

}

function video_player(video) {
  var player = "<video width='480' height='270' controls='' poster='https://s3-us-west-1.amazonaws.com//hlw-tiles/video/" + video + ".jpg'>"
  player += "<source src='https://s3-us-west-1.amazonaws.com//hlw-tiles/video/" + video + ".m4v' />"
  player +=  "Your browser does not support the video tag."
  player += "</video>"
  return player
}

var infowindow;
function placeMarker(location) {
  var marker = new google.maps.Marker({
      position: location,
      map: map
  });

  map.setCenter(location);
  
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent("Some information about the marker.");
      infowindow.open(map, marker);
  });
}
    
    
$(document).ready(function(){
   load();
   $(window).resize(function() {
      resizeMapDiv();
   });
});