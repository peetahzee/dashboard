WidgetTypes = [];

WidgetType = {
  widgetId: null,
  widgetTypeName: null,
  getStyle: function() {
    style = this.data.style;
    style += "height: " + this.height + "px;";
    style += "width: " + this.width + "px;";
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
