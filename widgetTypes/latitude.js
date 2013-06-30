Latitude = function(widget) {
  _.extend(this, widget);
};

_.extend(Latitude.prototype, WidgetType);

_.extend(Latitude.prototype, {
  widgetTypeName: "stickyNote",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>Latitude</h2>';
    this.html += '<div> Latitude: ' + this.data.lat + '</div>';
    this.html += '<div> Longitude: ' + this.data.long + '</div>';
    this.html += '<input type="button" class="authButton" value="Auth"/>'

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
    $(".authButton").click(function() {
      console.log("HI");
        auth(this._id);
    });
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
          location = {};
          location['lat'] = loc.latitude;
          location['long'] = loc.longitude;
          location['userId'] = Meteor.userId();
           Widgets.update(id, {$push: {locations: location}});
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

