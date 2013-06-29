Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

Template.dashboard.dashboard = function() {
	return Dashboards.findOne();
}

Template.widget.getData = function() {
	return "hello " + WidgetTypes.findOne({slug: this.widgetType}).getData.call(this);
}