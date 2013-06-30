Dashboards = new Meteor.Collection("dashboards", {
  transform: function(doc) {
    for (var i = 0; i < doc.widgets.length; i++) {
      w = doc.widgets[i];
      doc.widgets[i] = eval("new " + w.widgetType + "(w)");
      doc.widgets[i].widgetId = i;
      doc.widgets[i].render();
    }
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


Template.widget.events({
    'click': function (event) {
        var idName = "#widget_" + this.widgetId;
        $(idName).find("textarea").css("display", "block");
        $(idName).find(".stickyData").css("display", "none");
    },

    'mouseleave': function(e) {
        e.srcElement.style.opacity = "1";
        e.srcElement.style.border = "";
    },
});

Template.widget.rendered = function() {
    var idName = "#widget_" + this.data.widgetId;

    $(idName).resizable({
        stop: function(event, ui) {
            widgetId = $(this).attr('id').substring(7);
            toSet = {};
            toSet['widgets.' + widgetId + '.height'] = ui.size.height;
            toSet['widgets.' + widgetId + '.width'] = ui.size.width;
            Dashboards.update(Session.get("db")._id, { $set: toSet });
        }
    });

    // Able to edit..
    $(".stickyEdit").keypress(function(e) {
        if (e.charCode == 13) {
            widgetId = $(this).parent().attr('id').substring(7);
            toSet = {};
            toSet['widgets.' + widgetId + '.data.content'] = $(this).val();
            Dashboards.update(Session.get("db")._id, { $set: toSet });
        }
    });
}

