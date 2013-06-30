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
    toSet = {};
    toSet['data.content'] = val;
    if (this._id) {
        Widgets.update(this._id, { $set: toSet });
    }
  },
  rendered: function() {
    var widget = this; // for context
    var widgetInDom = this.widgetInDom();

    var height = this.widgetInDom().innerHeight() - this.widgetInDom().find("h2").height() - 65;
    widgetInDom.find("textarea").css("height", height);
    
    widgetInDom.find('.stickyData').click(function() {
      // Want to toggle based on when clicking
      if (widgetInDom.find(".stickyData").css("display") === "block") {
        widgetInDom.find(".stickyData").css("display", "none");
        widgetInDom.find("textarea").css("display", "block");
        widgetInDom.find("textarea").focus();

        widgetInDom.resizable('disable');
      } else if (!($("input,textarea").is(":focus"))) {
        widgetInDom.find(".stickyData").css("display", "block");
        widgetInDom.find("textarea").css("display", "none");

        widgetInDom.resizable('enable');
      }
    });

    this.setupResizeDrag();

    // Able to edit..
    widgetInDom.find(".stickyEdit").unbind("keypress");
    widgetInDom.find(".stickyEdit").keypress(function(e) {
      if (e.charCode == 13) {
        widget.save($(this).val());
      }
    });
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

