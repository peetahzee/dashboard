ScoreBoard = function(widget) {
    _.extend(this, widget);
};

_.extend(ScoreBoard.prototype, WidgetType);

_.extend(ScoreBoard.prototype, {
    widgetTypeName: "scoreBoard",
    render: function() {
        this.html = this.generateHeader();

        this.html += "<div class='innerHeader'><h2>Board of Doom</h2><div class='newCol'><button class='addCol' class='add'>+</button></div></div>";
        this.html += this.generateFooter();
    },
    getData: function() {
        this.render();
    },
    rendered: function() {
        var self = this;
        var widgetInDom = this.widgetInDom();
        this.setupResizeDragDelete();

        if (!self.drawBarGraph) {
            self.drawBarGraph = Meteor.autorun(function() {
                drawGraph(self)
            });
        }


        widgetInDom.find(".barRect").click(function(d) {
            barClickHandler(d, self, $(this));
        });

        widgetInDom.find(".barName").click(function(d) {
            var newKeyValue = window.prompt("Please enter new name: ");
            if (newKeyValue == null) {
                // Don't want to bother
                return;
            }
            var tempArray = self.data.content;

            for (var index in tempArray) {
                if (tempArray[index].key == $(this).attr("key")) {
                    break;
                }
            }

            var toSet = {};
            toSet['data.content.' + index + '.key'] = newKeyValue;
            Widgets.update(self._id, { $set: toSet });
        });

        widgetInDom.find("button.addCol").click(function(d) {
            Widgets.update(self._id, { $push: {'data.content': {'key': 'New Column', 'score': 0} } });
        });

        widgetInDom.find(".editClass").click(function(d) {
            selectedItemid = self._id;
            barClickHandler(d, self, $(this));
        });

        var pressTimer;

        widgetInDom.find(".barRect").mouseup(function(){
            clearTimeout(pressTimer)
            // Clear timeout
            return false;
        }).mousedown(function(){
            var jQself = this;
            // Set timeout
            pressTimer = window.setTimeout(function() {
                // If you hold it for over two seconds, allow a delete.
                toSet = {}
                toSet['data.content'] = {
                    'key': $(jQself).attr("key"),
                    'score': parseInt($(jQself).attr("value"))
                };
                var response = window.confirm("Are you sure you want to delete?");
                if (response) {
                    Widgets.update(self._id, { $pull: toSet });
                }
            }, 1000)
            return false;
        });

        widgetInDom.find(".barRect").mouseover(function() {
            var temp = d3.select(this).attr("opacity", "0.5");
        }).mouseleave(function() {
            var temp = d3.select(this).attr("opacity", "");
        });

        widgetInDom.find(".barName").mouseover(function() {
            $(".barName").css("display", "none");
            $(this).css("display", "block");
        }).mouseleave(function() {
            $(".barName").css("display", "block");
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
    var bottomHeight = 120;
    var h = $(widgetDivId).height() - bottomHeight;

    var values = [];
    for (var index in self.data.content) {
        values.push(self.data.content[index].score);
    }
    var valuesMax = Math.max.apply(Math, values);

    //Create SVG element
    var svg = d3.select(widgetDivId)
        .append("svg")
        .attr("width", w)
        .attr("height", h + bottomHeight)
        .attr("class", "barGraph");

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
            ret_val = h - ((d.score * h) / valuesMax) + 14;
            if (d.score === 0) {
                return ret_val - 20;
            } else {
                return ret_val;
            }
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "black")
        .attr("text-anchor", "middle")
        .attr("class", "editClass")
        .attr("value", function(d) {
            return d.score;
        })
        .attr("key", function(d) {
            return d.key;
        })

    svg.selectAll("text.name")
        .data(self.data.content)
        .enter().append("text")
        .attr("x", function(d, i) {
            return i * (w / values.length) + (w / values.length - 5) / 2;
        })
        .attr("y", h + bottomHeight / 5)
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
        position: {x: 0, y: 0},
        width: 500,
        height: 500
    };
}

wtToCreate = {typeName: 'Score Board', className: "ScoreBoard", icon: "U"};
WidgetTypes.push(wtToCreate);

