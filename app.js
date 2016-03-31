var dataset = [
    { 
        category: "Registration Fee",
        cost: 34,
        percentage: 34 
    },
        { 
        category: "Meals",
        cost: 20,
        percentage: 20 
    },
        { 
        category: "Lodging",
        cost: 17,
        percentage: 17 
    },
        { 
        category: "Tolls",
        cost: 14,
        percentage: 14 
    },
        { 
        category: "Transportation",
        cost: 9,
        percentage: 9 
    },
        { 
        category: "Other",
        cost: 6,
        percentage: 6 
    }
]


var width = 300,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#E9C238", "#5C90CD", "#23D3D3", "#ED8F35", "#DC7247", "#A5E069"])
    .domain(d3.range(0, 6));

var pie = d3.layout.pie()
    .value(function (d) { return d.cost; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return d.data.percentage + 
            "%<span class='tooltip-category'> - " + 
            d.data.category + 
            "</span>"; 
    });

var svg = d3.select(".donut-chart").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

var path = svg.selectAll("path")
    .data(pie(dataset))
    .enter().append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc)
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

var donutChart = angular.module("donutChart", []);

donutChart.controller("donutChartController", function ($scope) {
    $scope.dataset = dataset;
});

donutChart.directive("donutChartLegendItem", function () {
    return {
        template: "Hello!",
        restrict: "E"
    };
});
