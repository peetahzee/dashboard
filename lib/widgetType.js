WidgetType = {
  widgetId: null,
  widgetTypeName: null,
  generateHeader: function() {
    return '<div id="widget_' + this.widgetId + '" style="'+ this.data.style + '" class="widget ' + this.widgetTypeName + '">';
  },
  generateFooter: function() {
    return '</div>';
  }
};
