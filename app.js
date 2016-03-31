var dataset = [
    { 
        name: "Registration Fee",
        cost: 34,
        percentage: 34
    },
        { 
        name: "Meals",
        cost: 20,
        percentage: 20
    },
        { 
        name: "Lodging",
        cost: 17,
        percentage: 17
    },
        { 
        name: "Tolls",
        cost: 14,
        percentage: 14
    },
        { 
        name: "Transportation",
        cost: 9,
        percentage: 9
    },
        { 
        name: "Other",
        cost: 6,
        percentage: 6
    }
];

var colors = ["#E9C238", "#5C90CD", "#23D3D3", "#ED8F35", "#DC7247", "#A5E069"];

function addColorsToDataset (dataset, colors) {
    if (colors.length < dataset.length) {
        console.error("Not enough colors specified.");
        return; 
    }
    for (var i = 0; i < dataset.length; i++){
        dataset[i].color = colors[i];
    }
}

addColorsToDataset(dataset, colors);

var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(colors)
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
            d.data.name + 
            "</span><br>"; 
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
        template: "<div class='legend-circle' style='background-color: {{ legendItem.color }}'></div><span class='legend-item-name'>{{ legendItem.name }}</span>",
        restrict: "E",
        scope: {
            legendItem: "="
        }
    };
});
