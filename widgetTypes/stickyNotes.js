StickyNotes = function(widget) {
  _.extend(this, widget);
};

_.extend(StickyNotes.prototype, {
  render: function() {
    console.log('extending', this);
    console.log(this.data);
    this.html = "<p>soemthign</p>";
  }
});
