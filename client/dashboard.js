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

Meteor.startup(function() {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL',
  });
});

var dashboard = null;
var widgets = null;

Template.dashboard.dashboard = function() {
  Session.get("new_widget");
  if (Meteor.userId() == null) {
    return Dashboards.findOne({_id : "SAMPLE"});
  } else if (Session.get('db')) {
    // find existing dashboard
    return Dashboards.findOne({_id : Session.get('db')._id});
  } else {
    dashboard = Dashboards.findOne({users: Meteor.userId()});
    if (!dashboard) { return null; }
    Session.set("db", dashboard);
    return dashboard;
  }
}

Template.dashboard.newUser = function() {
  return Meteor.userId() == null;
}
Template.dashboard.noDashboards = function() {
  return Dashboards.findOne({users: Meteor.userId()}) == null;
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
      widget = WidgetTypes[i];
      html += '<button class="addWidget" value="New'+widget.className+'">'+widget.icon+'</button>';
    }
    $('#newWidgets').fadeOut(200, function() {
      $('#newWidgets').html(html);
      $("#newWidgets").fadeIn(200);
    });
  },

  'click button#viewBoardsButton': function() {
    if( $("#boards").is(':visible')) {
      $("#boards").slideUp();
    } else {
     if(Session.get('db') != undefined) {
        $('#boards button').removeClass('active');
        $("button[value=" + Session.get("db")._id+"]").addClass('active');
      }
      $("#boards").slideDown();
    }
  },

  'click button#viewPeopleButton': function() {
    if( $("#people").is(':visible')) {
      $("#people").slideUp();
    } else {
      $("#people").slideDown();
    }
  },

  'click button#viewSettingsButton': function() {
    if( $("#settings").is(':visible')) {
      $("#settings").slideUp();
    } else {
      $("#settings").slideDown();
    }
  },

  'click button.color': function(event) {
    Dashboards.update(Session.get("db")._id, {$set: {'color': event.target.value}});
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


Template.widget.preserve(['div.widget', 'iframe']);

Template.widget.widget = function () {
  widget =  Widgets.findOne({_id: this.toString()});
  return widget;
}

Template.widget.created = function() {
  Widgets.find({_id: this.data}).observe(
    {added: function(doc) {
      doc.created();
    }}
  );
}

Template.widget.rendered = function() {
  Widgets.find({_id: this.data}).observe(
    {added: function(doc) {
      doc.rendered();
    }}
  );
}
