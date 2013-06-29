StickyNotes = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNotes.prototype, {
  render: function() {
    this.html = '<div style="'+ this.data.style + '">';
    this.html += '<h2>Sticky Note</h2>';
    this.html += this.data.content;
    this.html += '</div>';
  }
});
