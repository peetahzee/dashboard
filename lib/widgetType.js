WidgetTypes = [];

WidgetType = {
  widgetId: null,
  widgetTypeName: null,
  clicked: null,
  rendered: function() {
    this.setupResizeDragDelete();
  },
  getStyle: function() {
    if (this.style != undefined) style = this.data.style; else style = "";
    if (this.height != undefined) style += "height: " + this.height + "px;";
    if (this.width != undefined) style += "width: " + this.width + "px;";
    if (this.position.y != undefined) style += "top: " + this.position.y + "px;";
    if (this.position.x != undefined) style += "left: " + this.position.x + "px;";
    return style;
  },
  getData: null,
  generateHeader: function() {
    html = '<div id="widget_' + this.widgetId + '" style="'+ this.getStyle() + '" class="widget ' + this.widgetTypeName + '">';
    html += '<div class="remove-widget-icon">X</div>';
    return html;
  },
  generateFooter: function() {
    return '</div>';
  },
  widgetInDom: function() {
    return $("#widget_" + this._id);
  },
  setupResizeDragDelete: function() {
    var widget = this;
    if(!this.widgetInDom().is('.ui-resizable')) {
      this.widgetInDom().resizable({
        stop: function(event, ui) {
          Widgets.update(widget._id, { $set: { 'height': ui.size.height, 'width': ui.size.width } });
        }
      }).draggable({
        stop: function(event, ui) {
          Widgets.update(widget._id, { $set: { 'position.x': ui.position.left, 'position.y': ui.position.top } });
        }
      }); 
    }

    var removeIcon = this.widgetInDom().find('.remove-widget-icon');
    this.widgetInDom().mouseenter(function() {
      removeIcon.addClass('visible');
    });
    this.widgetInDom().mouseleave(function() {
      removeIcon.removeClass('visible');
    });
    removeIcon.click(function() {
      Widgets.remove(widget._id);
      Dashboards.update(Session.get("db")._id, { $pull: { widgets: widget._id } } );
    })
  }
};
