WidgetTypes = [];

WidgetType = {
  widgetId: null,
  widgetTypeName: null,
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
    return '<div id="widget_' + this.widgetId + '" style="'+ this.getStyle() + '" class="widget ' + this.widgetTypeName + '">';
  },
  generateFooter: function() {
    return '</div>';
  }
};
