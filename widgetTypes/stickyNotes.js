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
    this.html += this.generateFooter();
  }
});


wtToCreate = {typeName: 'Sticky Notes', className: "StickyNote"};
WidgetTypes.push(wtToCreate);

