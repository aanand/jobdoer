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

    var x = d3.scale.ordinal()
      .domain(d3.range(0, NUM_SAMPLES))
      .rangeRoundBands([0, width], 0.1);

    var y = d3.scale.linear()
      .domain([0, d3.max(samples)])
      .rangeRound([height, 0]);

    var svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

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
