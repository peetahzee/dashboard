Dashboards = new Meteor.Collection("dashboards");

Widgets = new Meteor.Collection("widgets", {
  transform: function(doc) {
      doc = eval("new " + doc.widgetType + "(doc)");
      doc.widgetId = doc._id;
      doc.getData();
      return doc;

    }
});

var dashboard = null;
var widgets = null;

Template.dashboard.dashboard = function() {
  dashboard = Dashboards.findOne();
  Session.set("db", dashboard);
  return dashboard;
}


Template.dashboard.events({
  'click button#addWidgetButton': function () {
    html = '';
    for (var i = 0; i < WidgetTypes.length; i++) {
      widget = WidgetTypes[i];
      html += '<button class="addWidget" value="New'+widget.className+'">'+widget.icon+'</button>';
    }
    $('#newWidgets').fadeOut(200, function() {
      $('#newWidgets').html(html);
      $("#newWidgets").fadeIn(200);
    });
  },

  'click button.addWidget': function (event) {
    widget = eval("new " + event.target.value + "()");

    id = Widgets.insert(widget);
    Dashboards.update(Session.get("db")._id, {$push: {widgets: id}});
  },
});

Template.widget.widget = function () {
  widget =  Widgets.findOne({_id: this.toString()});
  return widget;
}

Template.widget.rendered = function() {
  var widget = Widgets.findOne({_id: this.data});
  
  widget.rendered();
}
