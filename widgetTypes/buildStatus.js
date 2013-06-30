BuildStatus = function(widget) {
  _.extend(this, widget);
};

_.extend(BuildStatus.prototype, WidgetType);

_.extend(BuildStatus.prototype, {
  widgetTypeName: "buildStatus",
  renderContent: function() {
    var statusColors = {
      'building': '0A4270',
      'passed': '33700A',
      'failed': '912323',
      'fetchFailed': 'FF0000'
    }

    var html = "";
    if(this.statuses != undefined) {
      for (var i in this.statuses) {
        html += '<div class="status" style="height: ' + 100 / this.statuses.length + '%; background: #' + statusColors[this.statuses[i].status] + ';">';
        html += '<h2>' + this.statuses[i].project + '</h2>';
        html += '<div class="status-string">' + this.statuses[i].status + '</div>';  
        html += '</div>';
      }
    } else {
      html += '<div class="status" style="height: 100%; background: #' + statusColors.fetchFailed + ';">';
      html += '<h2>error retrieving json</h2>';
      html += '<div class="status-string">with link ' + this.data.link + '</div>';  
      html += '</div>';
    }
    return html;
  },
  renderEdit: function() {
    html = ''
    html += '<h3>Build Status</h3>'
    html += '<p>Where does your data come from? </p>'
    html += '<form class="build_status_link"><input type="text" value="' + this.data.link +'" /></form>';
    return html;
  },
  getData: function() {

    var widget = this;
    $.getJSON(widget.data.link).done(function(data) { 
      widget.statuses = data;
      widget.forceRerender();
    }).fail(function(data) {
      widget.statuses = "failed";
    });
    this.render();
  },
  created: function() {
    var widget = this;
    Meteor.setInterval(function() {
      widget.getData();
    }, 5000);
    this.render();
  },
  rendered: function() {
    this.setupResizeDragDelete();
    this.setupEdit();
  },
  edit: function() {
    var widget = this;
    this.widgetInDom().find('.content').slideUp(function() {
      widget.widgetInDom().find('.edit').slideDown();
    });
    this.widgetInDom().find(".build_status_link").submit(function() {
      var val = $(this).find('input').val();
      widget.widgetInDom().find('.edit').slideUp(function() {
        Widgets.update(widget._id, {$set: {'data.link': val}});
        widget.getData();
        widget.widgetInDom().find('.content').slideDown();
      });

      return false;
    });
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