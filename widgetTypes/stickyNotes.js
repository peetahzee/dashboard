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

  save:  function(val) {
    toSet = {};
    toSet['widgets.' + this.widgetId + '.data.content'] = val;
    if (Session.get("db")._id) {
        Dashboards.update(Session.get("db")._id, { $set: toSet });
    }
  }
});

NewStickyNote = function () {
	return {
        widgetType: "StickyNote",
        data: {
            content: "New Sticky note",
            style: "color: red;"
          },
          position: {x: 0, y: 0}
     };
 }

wtToCreate = {typeName: 'Sticky Notes', className: "StickyNote"};
WidgetTypes.push(wtToCreate);

