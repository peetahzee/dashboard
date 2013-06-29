Dashboards = new Meteor.Collection("dashboards", {
  transform: function(doc) {
    console.log("transforming", doc);
    for (var i = 0; i < doc.widgets.length; i++) {
      w = doc.widgets[i];
      doc.widgets[i] = eval("new " + w.widgetType + "(w)");
      doc.widgets[i].widgetId = i;
      doc.widgets[i].render();
    }
    return doc;
  }
});
Widgets = new Meteor.Collection("widgets");
WidgetTypes = new Meteor.Collection("widgetTypes");

var dashboard = null;
var widgets = null;

Template.dashboard.dashboard = function() {
	dashboard = Dashboards.findOne();
	return dashboard;
}


Template.widget.events({
    'click': function (event) {
        console.log(event.which);
        console.log(this.widgetType);
        console.log(this.widgetId);
        Dashboards.update({_id: dashboard._id}, 
        	{ '$set': {'widgets.0.data.content': 'hello5'} }
        );
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

