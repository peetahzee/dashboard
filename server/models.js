Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

Meteor.startup(function() {
	if(WidgetTypes.find().count() === 0) {
		WidgetTypes.insert({
			name: "Sticky Notes",
			slug: "stickyNotes",
			getData: function() {
				return "Hello World";
			},
			render: function(data) {
				console.log(data);
			}
		})
	}

	if(Widgets.find().count() === 0) {
		var widgetId = Widgets.insert({
			widgetType: "stickyNotes",
			data: "Bleh."
		})
	}

	if(Dashboards.find().count() === 0) {
		console.log("Created Dashboard with widgetId " + widgetId);
		Dashboards.insert({
			name: "Test Dashboard",
			widgets: [
				{ widget: widgetId, position: {x: 0, y: 0} }
			]
		})
	}
})