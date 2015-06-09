(function ($) {
  function showMarkers(data) {
    var markers = []
    for (var i = 0, len = data.length; i < len; i++) {
      obj = data[i]
      if (obj.is_working == 1) {
        content = '<div class="water"><h3>' + obj.name + '</h3><img src="' + obj.image_uri + '"><p>' + obj.description + '</p></div>'
        markers.push({
          lat: obj.latitude,
          lng: obj.longitude,
          title: obj.name,
          infoWindow: {content: content}
        })
      }
    }
    map.addMarkers(markers)
    geolocate()
  }

  function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(centerMap)
        navigator.geolocation.watchPosition(drawCircle);
    }
  }

  function centerMap(position) {
    map.setCenter(position.coords.latitude, position.coords.longitude)
  }

  function drawCircle(position) {
    if (typeof circle !== 'undefined') {
      circle.setMap(null)
    }
    circle = map.drawCircle({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      fillColor: '#0000FF',
      radius: position.coords.accuracy,
      strokeWeight: 0
    })
  }

  $(document).ready(function(){
    map = new GMaps({
      div: '#map',
      lat: 46.05285500,
      lng: 14.49392500,
      zoom: 16
    })

    var fountains = $.get('http://apps.enki.si/vo-ka/tap-water/get_fountains.php')
    fountains.done(showMarkers)
  })
})(jQuery)
