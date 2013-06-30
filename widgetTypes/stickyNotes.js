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
  save: function(val) {
    Widgets.update(this._id, { $set: {'data.content': val} });
  },
  rendered: function() {
    var widget = this; // for context
    var widgetInDom = this.widgetInDom();
    widgetInDom.unbind();

    widgetInDom.find('.stickyData').click(function() {
      // Want to toggle based on when clicking
      if (widgetInDom.find(".stickyData").css("display") === "block") {
        widgetInDom.find(".stickyData").css("display", "none");
        widgetInDom.find("textarea").css("display", "block");
        widgetInDom.find("textarea").focus();

        var height = widgetInDom.innerHeight() - widgetInDom.find("h2").height() - 65;
        widgetInDom.find("textarea").css("height", height);

        widgetInDom.resizable('disable');
      } else if (!($("input,textarea").is(":focus"))) {
        widgetInDom.find(".stickyData").css("display", "block");
        widgetInDom.find("textarea").css("display", "none");

        widgetInDom.resizable('enable');
      }
    });

    widgetInDom.find(".stickyEdit").keypress(function(e) {
      if (e.charCode == 13) {
        widget.save($(this).val());
      }
    });

    this.setupResizeDragDelete();
  },
  clicked: function() {

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

wtToCreate = {typeName: 'Sticky Notes', className: "StickyNote", icon: "C"};
WidgetTypes.push(wtToCreate);

