ScoreBoard = function(widget) {
  _.extend(this, widget);
};

_.extend(ScoreBoard.prototype, WidgetType);

_.extend(ScoreBoard.prototype, {
  widgetTypeName: "scoreBoard",
  render: function() {
    this.html = this.generateHeader();

    tempArray = this.data.content;
    tempHtml = "";
    if (this.data.content) {
        $.each(tempArray, function(item) {
            tempHtml += item + " " + tempArray[item] + "<br>";
        });
    }
    this.html += tempHtml;
    this.html += this.generateFooter();
  },
  getData: function() {
    /* var widget = this;
    Meteor.setInterval(function() {
      updateDate(widget._id);
    }, 1000); */
    this.render();
    console.log("need to do getdta function");
  },
  rendered: function() {
    var yScale = d3.scale.linear()
      .domain([0, 4])
      .range([10, 60]);
    var xScale = d3.scale.linear()
      .domain([0, 4])
      .range([0, 60]);

    if (!self.drawTimeline) {
        self.drawTimeline = Meteor.autorun(function() {

            var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

            self.barGraph = d3.select(".widget")
                .selectAll("div")
                .data(dataset)
                .enter()
                .append("div")
                .attr("class", "bar")
                .style("height", function(d) {
                    var barHeight = d * 5;
                    return barHeight + "px";
                });

            /* self.captions = d3.select(self.node)
            .select('.caption-spans')
            .selectAll('rect')
            .data(subtitles, function (sub) {
                return sub._id;
            });
            drawTimeline(); */
        });
    }
  }
});

var drawBarGraph = function() {

    console.log("drawing bar graph now?");
}

var drawTimeline = function() {

    // Append new captions
    drawSubs(self.captions.enter().append('rect'));

    // Update changed captions
    drawSubs(self.captions.transition().duration(400));

    // Remove captions
    self.captions
        .exit()
        .transition()
        .duration(400)
        .style('opacity', 0)
        .remove();
}

// Sets the attributes of each new or changed caption
var drawSubs = function (caption) {
    caption
        .attr('data-id', function (cap) { return cap._id; })
        .attr('class', 'timelineEvent')
        .attr('fill', function (cap) { 

            // Provide colour warnings if too fast rate / second
            var rate = getRatio(cap);
            if (rate <= 2.3)
            return '#50ddfb'; // it's good
            else if (rate > 2.3 && rate < 3.1)
            return '#fbb450'; // warning
            else
            return '#ea8787'; // danger
        })
    .attr('x', function (cap) { return xScale(cap.startTime); })
        .attr('y', function (cap) { return '-' + yScale(getRatio(cap)); })
        .attr('width', function (cap) { 
            return xScale(cap.endTime) - xScale(cap.startTime)
        })
    .attr('height', function (cap) {
        return yScale(getRatio(cap)); 
    });
};


  function updateDate(id) {
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


