Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

Template.dashboard.dashboard = function() {
	return Dashboards.findOne();
}

Template.widget.events({
    'click': function (event) {
        console.log(event.which);
    },

    'mouseenter': function(event) {
        console.log(event);
        console.log(this);
        event.srcElement.style.opacity = "0.5";
        event.srcElement.style.border = "1px black dotted";
    },

    'mouseleave': function(e) {
        e.srcElement.style.opacity = "1";
        e.srcElement.style.border = "";
    },
});

