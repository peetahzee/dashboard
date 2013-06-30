StickyNotes = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNotes.prototype, {
  render: function() {
    this.html = '<div id="widget_' + this.widgetId + '" style="'+ this.data.style + '" class="widget">';
    this.html += '<h2>Sticky Note</h2>';
    this.html += this.data.content;
    this.html += '</div>';
  }
});

NewStickyNote = function () {
	return {
        widgetType: "StickyNotes",
        data: {
            content: "New Sticky note",
            style: "color: red;"
          },
          position: {x: 0, y: 0}
     };
 }