StickyNotes = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNotes.prototype, WidgetType);

_.extend(StickyNotes.prototype, {
  widgetTypeName: "stickyNote",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>Sticky Note</h2>';
    this.html += this.data.content;
    this.html += this.generateFooter();
  }
});
