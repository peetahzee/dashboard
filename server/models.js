Dashboards = new Meteor.Collection("dashboards");
Widgets = new Meteor.Collection("widgets");
Invites = new Meteor.Collection("invites");

Meteor.startup(function() {
  if(Widgets.find().count() === 0) {
  	var id = Widgets.insert({
  		widgetType: "StickyNote",
        data: {
          content: "Bleh.",
          style: "color: blue;"
        },
        position: {x: 0, y: 0},

        width: 100,
        height: 100
  	});
  	var id2 = Widgets.insert({
  		widgetType: "ScoreBoard",
        data: {
            content: {
                Peter: 10,
                Junjun: 15,
                Ali: 5
            }
        },
        position: {x: 0, y: 0}
  	});
  }

  if(Dashboards.find().count() === 0) {
    Dashboards.insert({
      name: "Test Dashboard",
      widgets: [id, id2],
      users: [],
    });
     Dashboards.insert({
      name: "Test Dashboard2",
      widgets: [id],
      users: [],
    });
  }
  console.log("HI");
  invites = Invites.find().observeChanges({
      added: function(doc, idx) {
      	  invite = Invites.findOne({_id : doc});
      	  user = Meteor.users.findOne({'emails.0.address': invite.email});
          Dashboards.update(invite.dashId, {$push: {users: user._id}});
        }  	
  });
});

