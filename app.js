var dataset = [
    { 
        name: "Registration Fee",
        cost: 341
    },
        { 
        name: "Meals",
        cost: 204
    },
        { 
        name: "Lodging",
        cost: 171
    },
        { 
        name: "Tolls",
        cost: 123
    },
        { 
        name: "Transportation",
        cost: 109
    },
        { 
        name: "Other",
        cost: 78
    }
];

var colors = ["#E9C238", "#5C90CD", "#23D3D3", "#ED8F35", "#DC7247", "#A5E069"];

function addPercentagesToDataset (dataset) {
    var totalCost = 0;
    dataset.forEach(function (item) {
        totalCost += item.cost;
    });
    dataset.forEach(function (item) {
        item.percentage = Math.round(100 * item.cost / totalCost);
    });
}

function addColorsToDataset (dataset, colors) {
    if (colors.length < dataset.length) {
        console.error("Not enough colors specified.");
        return; 
    }
    for (var i = 0; i < dataset.length; i++){
        dataset[i].color = colors[i];
    }
}

addPercentagesToDataset(dataset);
addColorsToDataset(dataset, colors);

var width = 250,
    height = 250,
    innerRadius = 50,
    outerRadius = 110;

var color = d3.scale.ordinal()
    .range(colors)
    .domain(d3.range(0, 6));

var pie = d3.layout.pie()
    .value(function (d) { return d.cost; })
    .sort(null);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

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
