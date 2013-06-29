Dashboards = new Meteor.Collection("dashboards");
WidgetTypes = new Meteor.Collection("widgetTypes");

Meteor.startup(function() {
	if(WidgetTypes.find().count() === 0) {
		WidgetTypes.insert({
			name: "Sticky Notes",
			slug: "stickyNotes",
			getData: function() {
				return "Hello World ";
			},
			render: function(data) {
				console.log(data);
			}
		})
	}

	if(Dashboards.find().count() === 0) {
		Dashboards.insert({
			name: "Test Dashboard",
			widgets: [
				{
					widgetType: "stickyNotes",
					data: "Bleh.",
					position: {x: 0, y: 0} 
				},
				{
					widgetType: "stickyNotes",
					data: "Bleh2.",
					position: {x: 1, y: 1} 
				}
			]
		});
	}
});