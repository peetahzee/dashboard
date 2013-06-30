Latitude = function(widget) {
  _.extend(this, widget);
};

_.extend(Latitude.prototype, WidgetType);

_.extend(Latitude.prototype, {
  widgetTypeName: "stickyNote",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>Latitude</h2>';
    this.html += '<div id="map-canvas"></div>';
    this.html += '<input type="button" class="authButton" value="Auth"/>';

    this.html += this.generateFooter();
  },
  getData: function() {
    this.render();
  },
  save:  function(val) {
    toSet = {};
    toSet['data.content'] = val;
    if (this._id) {
        Widgets.update(this._id, { $set: toSet });
    }
  },
  rendered: function() {
    console.log("fjksla;dfas");
    this.initMap();
     for (var i = 0; i < this.locations.length; i++) {

      wp = new google.maps.LatLng(this.locations[i].lat, this.locations[i].long);
      marker = new google.maps.Marker({position: wp, map: this.map});
     }
    widget = this;
    $(".authButton").click(function() {
      console.log("ID: " + widget._id);
        auth(widget._id);
    });
    this.setupResizeDragDelete();

  },

  initMap: function() {
    console.log("initMap")
  var apiKey = 'AIzaSyCuT1vpGKW_urUMZiEHjAxEJInWFCJQTSM';
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(37.77, -122.4),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  console.log("endMap");
}
     
});



function auth(id) {
        var apiKey = 'AIzaSyCuT1vpGKW_urUMZiEHjAxEJInWFCJQTSM';

        var config = {
      'client_id': '459813210522',
          'scope': 'https://www.googleapis.com/auth/latitude.current.best'
        };
        gapi.auth.authorize(config, function() {
          console.log('login complete');
          console.log(gapi.auth.getToken());
          gapi.client.load('latitude', 'v1', function () {
          console.log("load");
          var request = gapi.client.latitude.currentLocation.get({"granularity": "city"});
          request.execute(function (loc) {
          curloc = {};

          curloc['lat'] = loc.latitude;
          curloc['long'] = loc.longitude;
          curloc['userId'] = Meteor.userId();
          console.log(curloc);
          console.log(id);
           Widgets.update(id, {$push: {locations: curloc}});
            console.log(loc);
            console.log(loc.latitude);
          });
        });
        });

      }

NewLatitude = function () {
  return {
    widgetType: "Latitude",
    data: {
      content: "New Sticky note",
      locations: [],
    },
    position: {x: 0, y: 0}
  };
};

wtToCreate = {typeName: 'Latitude', className: "Latitude", icon: "L"};
WidgetTypes.push(wtToCreate);

