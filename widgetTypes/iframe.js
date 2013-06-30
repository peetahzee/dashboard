IFrame = function(widget) {
  _.extend(this, widget);
};

_.extend(IFrame.prototype, WidgetType);

_.extend(IFrame.prototype, {
  widgetTypeName: "iframe",
  renderContent: function() {
    html = '<iframe src="' + this.data.link + '"></iframe>'
    return html;
  },
  renderEdit: function() {
    html = ''
    html += '<h3>Iframe</h3>'
    html += '<p>What do you want to show?</p>'
    html += '<form class="iframe_link"><input type="text" value="' + this.data.link +'" /></form>';
    return html;
  },
  rendered: function() {
    this.setupResizeDragDelete();
    this.setupEdit();
  },
  edit: function() {
    var widget = this;
    this.widgetInDom().find('.content').slideUp(function() {
      widget.widgetInDom().find('.edit').slideDown();
    });
    this.widgetInDom().find(".iframe_link").submit(function() {
      var val = $(this).find('input').val();
      widget.widgetInDom().find('.edit').slideUp(function() {
        Widgets.update(widget._id, {$set: {'data.link': val}});
        widget.getData();
        widget.widgetInDom().find('.content').slideDown();
      });

      return false;
    });
  }


});

NewIFrame = function () {
	return {
        widgetType: "IFrame",
        data: {
            title: "ptzlabs.com",
            link: "http://peetahzee.com/"
          },
        position: {x: 0, y: 0}
     };
 }

wtToCreate = {typeName: 'IFrame', className: "IFrame", icon: "~"};
WidgetTypes.push(wtToCreate);