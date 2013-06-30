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
            content: [
                {key: "Peter", score: 0},
                {key: "Junjun", score: 10},
                {key: "Ali", score: 3}
            ]
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

