Dashboards = new Meteor.Collection("dashboards");
WidgetTypes = new Meteor.Collection("widgetTypes");

Meteor.startup(function() {

  if(Dashboards.find().count() === 0) {
    Dashboards.insert({
      name: "Test Dashboard",
      widgets: [ {
        widgetType: "StickyNotes",
        data: {
          content: "Bleh.",
          style: "color: blue;"
        },
        position: {x: 0, y: 0},
        width: 10,
        height: 10
      },
      {
        widgetType: "StickyNotes",
        data: {
          content: "Bleh2.",
          style: "color: red;"
        },
        position: {x: 1, y: 1},
        width:10,
        height:10
      } ]
    });
  }
});

