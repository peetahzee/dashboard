ScoreBoard = function(widget) {
    _.extend(this, widget);
};

_.extend(ScoreBoard.prototype, WidgetType);

_.extend(ScoreBoard.prototype, {
    widgetTypeName: "scoreBoard",
    render: function() {
        this.html = this.generateHeader();

        this.html += "<h2>blargl</h2>";
        this.html += this.generateFooter();
    },
    getData: function() {
        var widget = this;
        Meteor.setInterval(function() {
            updateScoreBoard(widget._id, values);
        }, 1000);
        this.render();
        console.log("need to do getdta function");
    },
    rendered: function() {
                  var self = this;



                  if (!self.drawBarGraph) {
                      self.drawBarGraph = Meteor.autorun(function() {
                          //Width and height
                          widgetDivId = "#widget_" + self.widgetId;

                          // TODO get rid of automatic hard coding here..
                          var w = 500;
                          var bottomHeight = 30;
                          var h = 300; //$(widgetDivId).height();
                          var keys = [];
                          var values = [];

                          $.each(self.data.content, function(item) {
                              keys.push(item);
                              values.push(self.data.content[item]);
                          });

                          var valuesMax = Math.max.apply(Math, values);

                          //Create SVG element
                          var svg = d3.select(widgetDivId)
                          .append("svg")
                          .attr("width", w)
                          .attr("height", h + bottomHeight);

                          svg.selectAll("rect")
                              .data(values)
                              .enter()
                              .append("rect")
                              .attr("x", function(d, i) {
                                  return i * (w / values.length);
                              })
                              .attr("y", function(d) {
                                  return h - ((d * h) / valuesMax);
                              })
                              .attr("width", w / values.length - 5)
                              .attr("height", function(d) {
                                  return ((d * h) / valuesMax);
                              });

                          svg.selectAll("text")
                              .data(values)
                              .enter()
                              .append("text")
                              .text(function(d) {
                                  return d;
                              })
                              .attr("x", function(d, i) {
                                  return i * (w / values.length) + (w / values.length - 5) / 2;
                              })
                              .attr("y", function(d) {
                                  return h - ((d * h) / valuesMax) + 14;
                              })
                              .attr("font-family", "sans-serif")
                              .attr("font-size", "14px")
                              .attr("fill", "black")
                              .attr("text-anchor", "middle")

                         svg.selectAll("text.name")
                              .data(keys)
                              .enter().append("text")
                              .attr("x", function(d, i) {
                                  return i * (w / keys.length) + (w / values.length - 5) / 2;
                              })
                              .attr("y", h + bottomHeight - 15)
                              .attr("dy", ".36em")
                              .attr("text-anchor", "middle")
                              .attr('class', 'name')
                              .text(String);

                      });
                  }
              }
});

function updateScoreBoard(id) {
    console.log("need update?");
    /* var d = new Date();
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
       Widgets.update(id, {$set: toSet}); */
}

NewScoreBoard = function () {
    return {
        widgetType: "Score Board",
        data: {
            content: {
                         Peter: 0,
                         Junjun: 10,
                         Ali: -3
                     }
        },
        position: {x: 0, y: 0}
    };
}

wtToCreate = {typeName: 'Score Board', className: "ScoreBoard"};
WidgetTypes.push(wtToCreate);

