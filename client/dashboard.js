Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

Template.dashboard.dashboard = function() {
	return Dashboards.findOne();
}