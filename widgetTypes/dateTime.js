DateTime = function(widget) {
  _.extend(this, widget);
};

_.extend(DateTime.prototype, WidgetType);

_.extend(DateTime.prototype, {
  widgetTypeName: "dateTime",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2>'+ this.data.time + '</h2>';
    this.html += '<div class="time">'+this.data.date+'</div>';
    this.html += this.generateFooter();
  },
  getData: function() {
    var widget = this;
    if (!Session.get("hasBeenSet"+widget._id)) {
      console.log("hi");
      Meteor.setInterval(function() {
        updateDate(widget._id);
      }, 1000);
      Session.set("hasBeenSet"+widget._id, true);
    }
    this.render();
  },
});

function updateDate(id) {
    widgetInDom = $("#widget_" + id);
    if (widgetInDom.hasClass('ui-resizable-resizing') ||
      widgetInDom.hasClass('ui-draggable-dragging')) return;

    var d = new Date();
    seconds = d.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    minutes = d.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    time = d.getHours() + ':' + minutes + ':' + seconds;
    date = d.getMonth() + 1 +'/'+ d.getDate() + '/'+ d.getFullYear();
    toSet = {};
    toSet['data.time'] = time;
    toSet['data.date'] = date;
    Widgets.update(id, {$set: toSet});
}
NewDateTime = function () {
	return {
        widgetType: "DateTime",
        data: {
            content: "New Sticky note",
            style: "color: red;"
          },
        position: {x: 0, y: 0}
     };
 }

wtToCreate = {typeName: 'Date/Time', className: "DateTime", icon: "S"};
WidgetTypes.push(wtToCreate);

