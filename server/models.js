Dashboards = new Meteor.Collection("dashboards");

Meteor.startup(function() {
  if(Dashboards.find().count() === 0) {
    Dashboards.insert({
      name: "Test Dashboard",
      widgets: [ {
        widgetType: "StickyNote",
        data: {
          content: "Bleh.",
          style: "color: blue;"
        },
        position: {x: 0, y: 0},
        width: 100,
        height: 100
      },
      {
        widgetType: "StickyNote",
        data: {
          content: "Bleh2.",
          style: "color: red;"
        },
        position: {x: 200, y:200},
        width:100,
        height:100
      } ]
    });
  }
});

