$(function() {
  var NUM_SAMPLES = 20;
  var samples = [];

  for (i=0; i<NUM_SAMPLES; i++) {
    samples.push(0);
  }

  var runningCount = 0;

  function tick() {
    $.ajax({
      url: '/count',
      dataType: 'text',
      success: function(response) {
        var count = parseInt(response);
        var delta;

        if (runningCount === 0) {
          delta = 0;
        } else {
          delta = count - runningCount;
        }

        runningCount = count;
        samples.push(delta);
        samples = samples.slice(-NUM_SAMPLES);

        drawGraph();

        window.setTimeout(tick, 1000);
      },
      error: function(textStatus) {
        window.setTimeout(tick, 1000);
      },
    });
  }

  function drawGraph() {
    console.log(samples);

    var width = 500;
    var height = 300;
    var margin = {
      left: 30, right: 10,
      bottom: 10, top: 10,
    }

    var x = d3.scale.ordinal()
      .domain(d3.range(0, NUM_SAMPLES))
      .rangeRoundBands([0, width], 0.1);

    var xAxis = d3.svg.axis()
                  .scale(x)
                  .tickValues([])
                  .orient("bottom");

    var y = d3.scale.linear()
      .domain([0, d3.max(samples)])
      .rangeRound([height, 0]);

    var yAxis = d3.svg.axis()
                  .scale(y)
                  .ticks(2)
                  .orient("left");

    var svg = d3.select("svg > g")
      .attr('width', width)
      .attr('height', height);

    if (svg.selectAll('g').empty()) {
      svg = d3.select('svg')
                .attr("width",  width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")

      svg.append("g")
         .attr("class", "y axis")
    }

    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    var bars = svg.selectAll('.bar')
      .data(samples);

    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d, i) { return x(i) })
      .attr('width', x.rangeBand());

    bars
      .attr('y', function(d, i) { return y(d) })
      .attr('height', function(d) { return height - y(d) });
  }

  tick();
});
