Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
Invites = new Meteor.Collection("invites");

Meteor.startup(function() {
  if(Widgets.find().count() === 0) {
  	Widgets.insert({ "_id" : "yyK2GAAxtYoiP25iY", "data" : { "link" : "http://meteor.com/", "title" : "ptzlabs.com" }, "height" : 652, "position" : { "x" : 368, "y" : 229 }, "widgetType" : "IFrame", "width" : 916 });
    Widgets.insert({ "widgetType" : "DateTime", "data" : { "content" : "New Sticky note", "style" : "color: red;", "time" : "19:23:11", "date" : "7/1/2013" }, "position" : { "x" : 31, "y" : 229 }, "_id" : "RLc2iaGcLdzMH6bjf" });
    Widgets.insert({ "_id" : "RJKNHKqGS454uP5Sa", "data" : { "content" : "New Sticky note", "style" : "color: red;" }, "messages" : [  {   "username" : "ptz",   "content" : "Some chatbox" },   {   "username" : "ptz",   "content" : "Blah" }, {   "username" : "ptz",   "content" : "hello" } ], "position" : { "x" : 30, "y" : 351 }, "widgetType" : "Chatbox" });
    Widgets.insert({ "widgetType" : "StickyNote", "data" : { "content" : "New Sticky note" }, "position" : { "x" : 814, "y" : 3 }, "_id" : "2QZTZDhkDA4QvSSH2" });
    Widgets.insert({ "widgetType" : "Latitude", "data" : { "content" : "New Sticky note" }, "locations" : [ ], "position" : { "x" : 1045, "y" : 6 }, "height" : 350, "width" : 350, "_id" : "aw3M4FuA6NtYy8smW" });
    Widgets.insert({"_id" : "tFwACxrvCjvzKwQKq", "data" : { "title" : "ptzlabs.com", "link" : "http://ptzlabs.com/test/test.php" }, "height" : 196, "position" : { "x" : 389, "y" : 3 }, "widgetType" : "BuildStatus", "width" : 395 });
  }

  if(Dashboards.find().count() === 0) {
    Dashboards.insert({
      "_id" : "SAMPLE",
      "name" : "Welcome to Dashboards!",
      "users" : [""],
      "widgets" : [
        "yyK2GAAxtYoiP25iY",
        "RLc2iaGcLdzMH6bjf",
        "RJKNHKqGS454uP5Sa",
        "2QZTZDhkDA4QvSSH2",
        "aw3M4FuA6NtYy8smW",
        "tFwACxrvCjvzKwQKq"
      ]
    });
  }
  invites = Invites.find().observeChanges({
      added: function(doc, idx) {
      	  invite = Invites.findOne({_id : doc});
      	  user = Meteor.users.findOne({'emails.0.address': invite.email});
      	  if (user) {
          	Dashboards.update(invite.dashId, {$push: {users: user._id}});
          }
        }  	
  });
});

