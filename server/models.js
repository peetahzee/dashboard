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
      },
      {
        widgetType: "StickyNote",
        data: {
          content: "Bleh2.",
          style: "color: red;"
        },
        position: {x: 1, y: 1},
      } ]
    });
  }
});

