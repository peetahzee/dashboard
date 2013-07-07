Chatbox = function(widget) {
  _.extend(this, widget);
};

_.extend(Chatbox.prototype, WidgetType);

_.extend(Chatbox.prototype, {
  widgetTypeName: "chatBox",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<div class="content">';
    if (this.messages != undefined) {
      this.html += '<div class="chats">';
      for (var i = this.messages.length - 1; i >= 0; i--) {
        this.html += '<div><b>' + this.messages[i].username + ':</b> ' + this.messages[i].content + '</div>';
      }
      this.html += '</div>';
      this.html += '<form class="chatbox"><input type="text" name="content"/></form>';
    }
    this.html += '</div>';
    this.html += this.generateFooter();
  },
  getData: function() {
    this.render();
  },
  rendered: function() {
    var widget = this;
    var widgetInDom = this.widgetInDom();
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
      console.log(widgetInDom);
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

wtToCreate = {typeName: 'Chatbox', className: "Chatbox", icon: '"'};
WidgetTypes.push(wtToCreate);