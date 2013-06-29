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

var dashbaord = null;
var widgets = null;

Template.dashboard.dashboard = function() {
	return Dashboards.findOne();
}


Template.widget.events({
    'click': function (event) {
        console.log(event.which);
        console.log(this.widgetType);
        console.log(this._id);
        Dashboards.update({_id: Dashboards.findOne()._id}, {widgets: 
        	[ {
        widgetType: "StickyNotes",
        data: {
          content: "Bleh more.",
          style: "color: blue;"
        },
        position: {x: 0, y: 0}
      },
      {
        widgetType: "StickyNotes",
        data: {
          content: "Bleh2.",
          style: "color: red;"
        },
        position: {x: 1, y: 1}
      } ]
        });
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

