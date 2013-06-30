ScoreBoard = function(widget) {
    _.extend(this, widget);
};

_.extend(ScoreBoard.prototype, WidgetType);

_.extend(ScoreBoard.prototype, {
    widgetTypeName: "scoreBoard",
    render: function() {
        this.html = this.generateHeader();

        this.html += "<h2>Board of Doom</h2><div id='newCol'><button id='addCol' class='add'>+</button></div>";
        this.html += this.generateFooter();
    },
    getData: function() {
        this.render();
    },
    clicked: function() {
        // TODO Hasn't been implemented yet.
    },
    rendered: function() {
        var self = this;
        if (!self.drawBarGraph) {
            self.drawBarGraph = Meteor.autorun(function() {
                drawGraph(self)
            });
        }

        var widgetInDom = this.widgetInDom();
        widgetInDom.unbind();

        self.setupResizeDragDelete();

        widgetInDom.find(".barRect").click(function(d) {
            barClickHandler(d, self, $(this));
        });

        widgetInDom.find(".barName").click(function(d) {
            if ($(this).attr("value")) {
                barClickHandler(d, self, $(this));
            }
        });

        widgetInDom.find("button#addCol").click(function(d) {
            console.log("blargl");
            obj = {'key': "New Column", 'score': 0};
            Widgets.update(self._id, { $push: {'data.content' : obj}});
        });
    }
});

var barClickHandler = function(d, self, obj) {
    var oldValue = parseInt(obj.attr("value"));
    var newValue;
    if (d.shiftKey || d.altKey || d.ctrlKey) {
        if (oldValue > 0) {
            newValue = oldValue - 1;
        } else {
            console.log("blargl");
            return;
        }
    } else {
        newValue = oldValue + 1;
    }
    updateScoreBoard(self._id, self.data.content, obj.attr("key"), newValue);
}


var drawGraph = function(self) {
    //Width and height
    widgetDivId = "#widget_" + self.widgetId;

    var w = $(widgetDivId).width();
    var bottomHeight = 60;
    var h = $(widgetDivId).height() - 2 * bottomHeight;

    var values = [];
    for (var index in self.data.content) {
        values.push(self.data.content[index].score);
    }
    var valuesMax = Math.max.apply(Math, values);

    //Create SVG element
    var svg = d3.select(widgetDivId)
        .append("svg")
        .attr("width", w)
        .attr("height", h + bottomHeight);

    svg.selectAll("rect")
        .data(self.data.content)
        .enter()
        .append("rect")
        .attr("value", function(d) {
            return d.score;
        })
        .attr("key", function(d) {
            return d.key;
        })
        .attr("class", "barRect")
        .attr("x", function(d, i) {
            return i * (w / values.length);
        })
        .attr("y", function(d) {
            return h - ((d.score * h) / valuesMax);
        })
        .attr("width", w / values.length - 5)
        .attr("height", function(d) {
            return ((d.score * h) / valuesMax);
        });

    svg.selectAll("text")
        .data(self.data.content)
        .enter()
        .append("text")
        .text(function(d) {
            return d.score;
        })
        .attr("x", function(d, i) {
            return i * (w / values.length) + (w / values.length - 5) / 2;
        })
        .attr("y", function(d) {
            return h - ((d.score * h) / valuesMax) + 14;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("text-anchor", "middle")

    svg.selectAll("text.name")
        .data(self.data.content)
        .enter().append("text")
        .attr("x", function(d, i) {
            return i * (w / values.length) + (w / values.length - 5) / 2;
        })
        .attr("y", h + bottomHeight - bottomHeight / 2)
        .attr("dy", ".36em")
        .attr("text-anchor", "middle")
        .attr('class', 'name')
        .attr('value', function(d) {
            return d.score;
        })
        .attr('key', function(d) {
            return d.key;
        })
        .attr("class", "barName")
        .text(function(d) {
            return d.key;
        })
}


updateScoreBoard = function(id, tempArray, key, newValue) {
    var newObj = {'key': key, 'score': newValue};

    // Find the index of the key/score pairing.
    for (var index in tempArray) {
        if (tempArray[index].key == key) {
            break;
        }
    }

    toSet = {};
    toSet['data.content.' + index + '.score'] = newValue;

    Widgets.update(id, { $set: toSet });
}

NewScoreBoard = function () {
    return {
        widgetType: "ScoreBoard",
        data: {
            content: [
                         {key: "Peter", score: 0},
                         {key: "Junjun", score: 10},
                         {key: "Ali", score: 3}
                     ]
        },
        position: {x: 0, y: 0}
    };
}

wtToCreate = {typeName: 'Score Board', className: "ScoreBoard", icon: "U"};
WidgetTypes.push(wtToCreate);

