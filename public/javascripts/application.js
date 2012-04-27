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
    	console.log("Var tilex: " + tilex + " tiley: " + tiley);
    } else {
      if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c)) {
	      var blank = ownerDocument.createElement('DIV');
	      blank.style.width = this.tileSize.width + 'px';
	      blank.style.height = this.tileSize.height + 'px';
	      return blank;
      }
    }
    //var path = "https://s3-us-west-1.amazonaws.com//hlw-tiles/set_3/" + zoom + "/";
    var path = "http://www.dbpoc.com/zoom/" + zoom + "/";
    var name =  zoom + "-" + tilex + "-" + tiley + ".jpg";
    console.log("The name is: " + name);
    var img = ownerDocument.createElement('IMG');
    img.id = "tile_" + name ;
    img.style.width = this.tileSize.width + 'px';
    img.style.height = this.tileSize.height + 'px';            
    img.src = path + name;
    
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
    //resizeMapDiv();
    var latlng = new google.maps.LatLng(centreLat, centreLon);
    var myOptions = {
        zoom: initialZoom,
        minZoom: 2,
        maxZoom: 7,
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
         position: new google.maps.LatLng(22,-142 ),
         title: "Transcription Video"
     }); 

    google.maps.event.addListener(marker1, 'click', function() {
        infowindow.setContent(video_player("clip-a"));
        infowindow.open(map, marker1);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker1"), "click", function(e) {
      map.setZoom(6);
      map.panTo(marker1.getPosition());
    });
    
    //Add marker for video clip b
    var marker2 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(40, -47),
         title: "Encoding RNA Video"
     }); 

    google.maps.event.addListener(marker2, 'click', function() {
        infowindow.setContent(video_player("clip-b"));
        infowindow.open(map, marker2);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker2"), "click", function(e) {
      map.setZoom(5);
      map.panTo(marker2.getPosition());
    });
    
    //Add marker for video clip c
    var marker3 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(-5,-40),
         title: "Encoding RNA Video"
     }); 

    google.maps.event.addListener(marker3, 'click', function() {
        infowindow.setContent(video_player("clip-c"));
        infowindow.open(map, marker3);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker3"), "click", function(e) {
      map.setZoom(3);
      map.panTo(marker3.getPosition());
    });
    
    //Add marker for video clip d
    var marker4 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(-63,-40),
         title: "Messenger RNA Transport Video"
     }); 

    google.maps.event.addListener(marker4, 'click', function() {
        infowindow.setContent(video_player("clip-d"));
        infowindow.open(map, marker4);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker4"), "click", function(e) {
      map.setZoom(4);
      map.panTo(marker4.getPosition());
    });
    
    //Add marker for video clip e
    var marker5 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(-50, 123),
         title: "Ribosome Translation"
     }); 

    google.maps.event.addListener(marker5, 'click', function() {
        infowindow.setContent(video_player("clip-e"));
        infowindow.open(map, marker5);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker5"), "click", function(e) {
      map.setZoom(4);
      map.panTo(marker5.getPosition());
    });
    
    //Add marker for video clip f
    var marker6 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(5, 155),
         title: "Actin Protein Translation"
     }); 

    google.maps.event.addListener(marker6, 'click', function() {
        infowindow.setContent(video_player("clip-f"));
        infowindow.open(map, marker6);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker6"), "click", function(e) {
      map.setZoom(3);
      map.panTo(marker6.getPosition());
    });
    
    //Add marker for video clip g
    var marker7 = new google.maps.Marker({
         map:map,
         position: new google.maps.LatLng(30, 51),
         title: "Amino Acids"
     }); 

    google.maps.event.addListener(marker7, 'click', function() {
        infowindow.setContent(video_player("clip-g"));
        infowindow.open(map, marker7);
    });
    
    google.maps.event.addDomListener(document.getElementById("go_to_marker7"), "click", function(e) {
      map.setZoom(4);
      map.panTo(marker7.getPosition());
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
   // $(window).resize(function() {
   //    resizeMapDiv();
   // });
});