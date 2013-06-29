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
	return Dashboards.findOne();
}

Template.dashboard.created = function() {
    console.log(this.dashboard);

    console.log("blargl " + this._id);
    Session.set("db", this._id);
}

Template.widget.events({
    'click': function (event) {
        console.log(event.which);
    },

    'mouseleave': function(e) {
        e.srcElement.style.opacity = "1";
        e.srcElement.style.border = "";
    },
});

Template.widget.rendered = function() {
    var idName = "#widget_" + this.data.widgetId;
    widgetId = this.data.widgetId;


    $(idName).resizable({
        stop: function(event, ui) {
            console.log(Session.get("db"));
            Dashboards.update(Session.get("db"),
                {
                    $set: {
                        // 'widgets.' + widgetId + '.height': ui.size.height,
                        //'widgets.' + widgetId + '.width': ui.size.width
                        }
                });
        }
    });
}

