StickyNotes = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNotes.prototype, WidgetType);

_.extend(StickyNotes.prototype, {
  widgetTypeName: "stickyNote",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>Sticky Note</h2>';
    this.html += '<div class="stickyData">' + this.data.content + "</div>";
    this.html += '<textarea rows="2" cols="30" class="stickyEdit">' + this.data.content + '</textarea>';
    this.html += this.generateFooter();
  }
});
