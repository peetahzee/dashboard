Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");

Meteor.startup(function() {
  if(Widgets.find().count() === 0) {
  	var id = Widgets.insert({
  		widgetType: "StickyNote",
        data: {
          content: "Bleh.",
          style: "color: blue;"
        },
        position: {x: 0, y: 0},

        width: 100,
        height: 100
  	});
  }
  if(Dashboards.find().count() === 0) {
    Dashboards.insert({
      name: "Test Dashboard",
      widgets: [ id ],
    });
  }
});

