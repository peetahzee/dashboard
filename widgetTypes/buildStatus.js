BuildStatus = function(widget) {
  _.extend(this, widget);
};

_.extend(BuildStatus.prototype, WidgetType);

_.extend(BuildStatus.prototype, {
  widgetTypeName: "buildStatus",
  render: function() {
    this.html = this.generateHeader();
    this.html += '<div class="content">';
    this.html += this.renderContent();
    this.html += '</div>';
    this.html += this.generateFooter();
  },
  renderContent: function() {
    var statusColors = {
      'building': '0A4270',
      'passed': '33700A'
    }

    var html = "";
    if(this.statuses != undefined) {
      for (var i in this.statuses) {
        html += '<div class="status" style="height: ' + 100 / this.statuses.length + '%; background: #' + statusColors[this.statuses[i].status] + ';">';
        html += '<h2>' + this.statuses[i].project + '</h2>';
        html += '<div class="status-string">' + this.statuses[i].status + '</div>';  
        html += '</div>';
      }
    }
    return html;
  },
  getData: function() {
    var widget = this;
    $.getJSON(widget.data.link).done(function(data) { 
      widget.statuses = data;
      widget.render();
      widget.forceRerender();
    });
    this.render();
  },
  created: function() {
    var widget = this;
    Meteor.setInterval(function() {
      widget.getData();
    }, 5000);
    this.render();
  }


});

NewBuildStatus = function () {
	return {
        widgetType: "BuildStatus",
        data: {
            title: "ptzlabs.com",
            link: "http://ptzlabs.com/test/test.php"
          },
        position: {x: 0, y: 0}
     };
 }

wtToCreate = {typeName: 'Build Status', className: "BuildStatus", icon: "m"};
WidgetTypes.push(wtToCreate);