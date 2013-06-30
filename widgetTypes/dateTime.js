DateTime = function(widget) {
  _.extend(this, widget);
};

_.extend(DateTime.prototype, WidgetType);

_.extend(DateTime.prototype, {
  widgetTypeName: "dateTime",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<h2> Time: '+ this.data.time + '</h2>';
    this.html += '<div class="time"> Date: '+this.data.date+'</div>';
    this.html += this.generateFooter();
  },
  getData: function() {
    var widget = this;
    if (!this.data.hasBeenInit) {
      console.log("hi");
      Meteor.setInterval(function() {
        updateDate(widget._id);
      }, 1000);
      toSet = {};
      toSet['data.hasBeenInit'] = true;
      Widgets.update(widget._id, {$set: toSet});
    }
    this.render();
  },
  });

  function updateDate(id) {
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

wtToCreate = {typeName: 'Date/Time', className: "DateTime"};
WidgetTypes.push(wtToCreate);

