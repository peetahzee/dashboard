WidgetTypes = [];

WidgetType = {
  widgetId: null,
  widgetTypeName: null,
  clicked: null,
  created: function() { },
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
  getData: function() {
    this.render()
  },
  generateHeader: function() {
    if (this.widgetInDom().hasClass('ui-draggable-dragging')) {
      var style = this.widgetInDom().attr('style');
      var cl = this.widgetInDom().attr('class');
    } else {
      var style = this.getStyle();
      var cl = "widget " + this.widgetTypeName;
    }
    html = '<div id="widget_' + this.widgetId + '" style="' + style + '" class="' + cl + '">';
    html += '<div class="remove-widget-icon">X</div>';
    html += '<div class="edit-widget-icon">8</div>';
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
      this.widgetInDom().resizable({
        stop: function(event, ui) {
          Widgets.update(widget._id, { $set: { 'height': ui.size.height, 'width': ui.size.width } });
        }
      });
      this.widgetInDom().draggable({
        stop: function(event, ui) {
          Widgets.update(widget._id, { $set: { 'position.x': ui.position.left, 'position.y': ui.position.top } });
        }
      });

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
  },
  setupEdit: function() {
    var widget = this;
    var editIcon = this.widgetInDom().find('.edit-widget-icon');
    this.widgetInDom().mouseenter(function() {
      editIcon.addClass('visible');
    });
    this.widgetInDom().mouseleave(function() {
      editIcon.removeClass('visible');
    });
    editIcon.click(function() {
      widget.edit();
    })
  },
  render: function() {
    this.html = this.generateHeader();
    this.html += '<div class="content">';
    this.html += this.renderContent();
    this.html += '</div>';
    this.html += '<div class="edit">';
    this.html += this.renderEdit();
    this.html += '</div>';
    this.html += this.generateFooter();
  },
  renderEdit: function() { return ""; },
  forceRerender: function() {
    this.widgetInDom().find('.content').html(this.renderContent()); 
  }
};
