Dashboards = new Meteor.Collection("dashboards", {
  transform: function(doc) {
    console.log("transforming", doc);
    for (var i = 0; i < doc.widgets.length; i++) {
      w = doc.widgets[i];
      doc.widgets[i] = eval("new " + w.widgetType + "(w)");
      doc.widgets[i].render();
    }
    return doc;
  }
});
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

var dashbaord = null;
var widgets = null;

Template.dashboard.dashboard = function() {
  dashboard = Dashboards.findOne();
  return dashboard;
};
