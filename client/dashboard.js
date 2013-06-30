Dashboards = new Meteor.Collection("dashboards");
Invites = new Meteor.Collection("invites");
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
  Session.get("new_widget");
  if (Session.get('db')) {
    dashboard = Dashboards.findOne({_id : Session.get('db')._id});
    return dashboard;
  }
  console.log(Meteor.userId());
  dashboard = Dashboards.findOne({users: Meteor.userId()});
  Session.set("db", dashboard);
  return dashboard;
}

Template.dashboard.rendered = function() {
  $("#invite").unbind();
  $("#invite").submit(function() {
    value = $(this).find("input[name=email]").val();
    Invites.insert({
      'dashId': Session.get("db")._id,
      'email': value,
    });
    return false;
  });

  $("#addDashboard").unbind();
  $("#addDashboard").submit(function() {
    console.log("HI");
    value = $(this).find("input[name=name]").val();
    Dashboards.insert({
      name: value,
      users: [Meteor.userId()],
    });
    return false;
  });
}

Template.dashboard.boards = function() {
  return Dashboards.find({users : Meteor.userId()});
}

Template.dashboard.events({
  'click button#addWidgetButton': function () {
    html = '';
    for (var i = 0; i < WidgetTypes.length; i++) {
      html += '<button class="addWidget" value="New'+WidgetTypes[i].className+'">'+WidgetTypes[i].icon+'</button>';

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
    dashboard = Session.get("db");
    Session.set("new_widget", id);
  },

  'click button.dashboard': function(event) {
    dashboard = Dashboards.findOne({_id: event.target.value});
    Session.set("db", dashboard);
  },

});

Template.widget.widget = function () {
  console.log("by");
  widget =  Widgets.findOne({_id: this.toString()});
  return widget;
}

Template.widget.rendered = function() {
  var idName = "#widget_" + this.data;
  var widget = Widgets.findOne({_id: this.data});
  $(idName).find('.stickyData').click(function() {
    // Want to toggle based on when clicking
    if ($(idName).find(".stickyData").css("display") === "block") {
      $(idName).find(".stickyData").css("display", "none");
      $(idName).find("textarea").css("display", "block");
      height = $(idName).innerHeight() - $(idName).find("h2").height() - 65;
      $(idName).find("textarea").css("height", height);

      $(idName).find("textarea").focus();
      // Make div not resizable
      $(idName).resizable('disable');
    } else if (!($("input,textarea").is(":focus"))) {
      $(idName).find(".stickyData").css("display", "block");
      $(idName).find("textarea").css("display", "none");

      $(idName).resizable('enable');
    }
  });

  $(idName).resizable({
    stop: function(event, ui) {
      widgetId = $(this).attr('id').substring(7);
      toSet = {};
      toSet['height'] = ui.size.height;
      toSet['width'] = ui.size.width;
      Widgets.update(widgetId, { $set: toSet });
    }
  }).draggable({
    stop: function(event, ui) {
      widgetId = $(this).attr('id').substring(7);
      toSet = {};
      toSet['position.x'] = ui.position.left;
      toSet['position.y'] = ui.position.top;
      Widgets.update(widgetId, { $set: toSet});
    }
  });

  $(idName).find(".stickyEdit").unbind("keypress");

  // Able to edit..
  $(idName).find(".stickyEdit").keypress(function(e) {
    if (e.charCode == 13) {
      widget.save($(this).val());
    }
  });
}
