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
  }
});

<<<<<<< HEAD
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
=======

wtToCreate = {typeName: 'Sticky Notes', className: "StickyNote"};
WidgetTypes.push(wtToCreate);

>>>>>>> 039a89276b3e152feb4a8b4e3670580f18657046
