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
  }
});

NewDateTime = function () {
  var d = new Date();
  seconds = d.getSeconds();
  if (seconds < 10) { seconds = '0' + seconds; }
  minutes = d.getMinutes();
  if (minutes < 10) { minutes = '0' + minutes; }

  time = d.getHours() + ':' + minutes + ':' + seconds;
  date = d.getMonth() + 1 +'/'+ d.getDate() + '/'+ d.getFullYear(); 
	widget =  {
        widgetType: "DateTime",
        data: {
            content: "New Sticky note",
            style: "color: red;",
            time: time,
            date: date,
          },
        position: {x: 0, y: 0}
     };
  return widget;
 }

wtToCreate = {typeName: 'Date/Time', className: "DateTime", icon: "S"};
WidgetTypes.push(wtToCreate);

if(Meteor.isServer) {
  function updateDate(widget) {
    var d = new Date();
    seconds = d.getSeconds();
    if (seconds < 10) { seconds = '0' + seconds; }
    minutes = d.getMinutes();
    if (minutes < 10) { minutes = '0' + minutes; }

    time = d.getHours() + ':' + minutes + ':' + seconds;
    date = d.getMonth() + 1 +'/'+ d.getDate() + '/'+ d.getFullYear();
    toSet = {};
    toSet['data.time'] = time;
    toSet['data.date'] = date;
    Widgets.update(widget._id, {$set: toSet});
  }
  Meteor.setInterval(function() {
    Widgets.find({"widgetType": "DateTime"}).forEach(function(widget) {
      updateDate(widget);
    });
  }, 1000);
}