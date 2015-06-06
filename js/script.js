(function ($) {
  function showMarkers(data) {
    var markers = []
    for (var i = 0, len = data.length; i < len; i++) {
      obj = data[i]
      if (obj.is_working == 1) {
        markers.push({
          lat: obj.latitude,
          lng: obj.longitude,
          title: obj.name,
          infoWindow: {
            content: obj.description
          }
        })
      }
    }
    map.addMarkers(markers)
    map.fitZoom()
    geolocate()
  }

  function geolocate() {
    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude)
        console.log(position)
        map.drawCircle({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          fillColor: '#0000FF',
          radius: position.coords.accuracy
        })
      },
      error: function(error) {
        alert('Geolocation failed: ' + error.message)
      },
      not_supported: function() {}
    })
  }

  $(document).ready(function(){
    map = new GMaps({
      div: '#map',
      lat: 46.05285500,
      lng: 14.49392500
    })

    var fountains = $.get('http://apps.enki.si/vo-ka/tap-water/get_fountains.php')
    fountains.done(showMarkers)
  })
})(jQuery)
