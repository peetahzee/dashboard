StickyNote = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNote.prototype, WidgetType);

_.extend(StickyNote.prototype, {
  widgetTypeName: "stickyNote",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>Sticky Note</h2>';
    this.html += '<div class="stickyData">' + this.data.content + "</div>";
    this.html += '<textarea rows="2" cols="30" class="stickyEdit">' + this.data.content + '</textarea>';
    this.html += this.generateFooter();
  },
  getData: function() {
  	this.render();
  },
  save:  function(val) {
    toSet = {};
    toSet['data.content'] = val;
    if (this._id) {
        Widgets.update(this._id, { $set: toSet });
    }
  }
});

NewStickyNote = function () {
  return {
    widgetType: "StickyNote",
    data: {
      content: "New Sticky note"
    },
    position: {x: 0, y: 0}
  };
};

wtToCreate = {typeName: 'Sticky Notes', className: "StickyNote"};
WidgetTypes.push(wtToCreate);

