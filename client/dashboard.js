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


Template.dashboard.events({
  'click button#addWidgetButton': function () {
    html = '';
    for (var i = 0; i < WidgetTypes.length; i++) {
      html += '<button class="addWidget" value="New'+WidgetTypes[i].className+'">C</button>';
    }
    $('#newWidgets').fadeOut(200, function() {
      $('#newWidgets').html(html);
      $("#newWidgets").fadeIn(200);
    });
  },

  'click button.addWidget': function (event) {
    widget = eval("new " + event.target.value + "()");
    Dashboards.update(dashboard._id, {'$push': { widgets: widget, }});
  },

});


Template.widget.events({
    'click': function (event) {
        var idName = "#widget_" + this.widgetId;
        // Want to toggle based on when clicking
        if ($(idName).find(".stickyData").css("display") === "block") {
            $(idName).find(".stickyData").css("display", "none");
            $(idName).find("textarea").css("display", "block");
            height = $(idName).innerHeight() - $(idName).find("h2").height() - 65;
            $(idName).find("textarea").css("height", height);

            // Make div not resizable
            $(idName).resizable( "destroy" )
        } else if (!($("input,textarea").is(":focus"))) {
            $(idName).find(".stickyData").css("display", "block");
            $(idName).find("textarea").css("display", "none");

            $(idName).resizable({
                stop: function(event, ui) {
                          widgetId = $(this).attr('id').substring(7);
                          toSet = {};
                          toSet['widgets.' + widgetId + '.height'] = ui.size.height;
                          toSet['widgets.' + widgetId + '.width'] = ui.size.width;
                          Dashboards.update(Session.get("db")._id, { $set: toSet });
                      }
            });

        }
    },

    'mouseleave': function(e) {
        e.srcElement.style.opacity = "1";
        e.srcElement.style.border = "";
    },
});

Template.widget.rendered = function() {
    var idName = "#widget_" + this.data.widgetId;
    var widget = this;

    $(idName).resizable({
        stop: function(event, ui) {
            widgetId = $(this).attr('id').substring(7);
            toSet = {};
            toSet['widgets.' + widgetId + '.height'] = ui.size.height;
            toSet['widgets.' + widgetId + '.width'] = ui.size.width;
            Dashboards.update(Session.get("db")._id, { $set: toSet });
        }
    });

    $(".stickyEdit").unbind("keypress");
    $(".stickyEdit").unbind("blur");

    // Able to edit..
    $(".stickyEdit").keypress(function(e) {
        widgetId = $(this).parent().attr('id').substring(7);

        if (e.charCode == 13) {
            widget.data.save(widgetId, $(this).val());
        }
    });
}

