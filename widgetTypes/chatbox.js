Chatbox = function(widget) {
  _.extend(this, widget);
};

_.extend(Chatbox.prototype, WidgetType);

_.extend(Chatbox.prototype, {
  widgetTypeName: "dateTime",
  render: function() {
    this.html = this.generateHeader();
    if (this.messages != undefined) {
      for (var i = 0; i < this.messages.length; i++) {
        this.html += '<div><b>' + this.messages[i].username + ':</b> ' + this.messages[i].content + '</div>';
      }
      this.html += '<form class="chatbox"><input type="text" name="content"/></form>';
    }
    this.html += this.generateFooter();
  },
  getData: function() {
    this.render();
  },
  rendered: function() {

    widget = this;
    widgetInDom = this.widgetInDom();
    widgetInDom.find('.chatbox').unbind();
    widgetInDom.find('.chatbox').submit(function() {
      value = $(widgetInDom).find("input[name=content]").val();
      $(widgetInDom).find("input[name=content]").val("");
      newMessage = {};
      if (Meteor.userId()) {
        id = Meteor.userId();
        newMessage['username'] = Meteor.users.findOne({_id: id}).username;
      } else {
        newMessage['username'] = 'Anonymous';
      }
      newMessage['content'] = value;
      console.log(newMessage);
      Widgets.update(widget._id, {$push: {messages: newMessage}});
      return false;
      });
        this.setupResizeDragDelete();

    }
});

NewChatbox = function () {
	return {
        widgetType: "Chatbox",
        data: {
            content: "New Sticky note",
            style: "color: red;"
          },
        messages: [],
        position: {x: 0, y: 0}
     };
 }

wtToCreate = {typeName: 'Chatbox', className: "Chatbox", icon: "C"};
WidgetTypes.push(wtToCreate);