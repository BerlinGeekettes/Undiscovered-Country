// data source: http://www.infochimps.com/datasets/60000-documented-ufo-sightings-with-text-descriptions-and-metada


// load in the data
d3.text('ufo_awesome.tsv', function(error, data) {

    var ufo_data = d3.tsv.parseRows(data, function(d) {
	return {
	    sighted_at: new Date(d[0].substring(0,4), d[0].substring(4,6), d[0].substring(6,8)),
	    shape: d[3]
	};
    });

    var cx = crossfilter(ufo_data);

    var date_dim = cx.dimension(function(d) { return d.sighted_at; });
    var shape_dim = cx.dimension(function(d) { return d.shape; });

    var count_by_date = date_dim.group().reduceCount();
    var count_by_shape = shape_dim.group().reduceCount();

    dc.barChart('#date-chart')
	.dimension(date_dim)
	.group(count_by_date)
	.x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2011,0, 1) ]))
	.width(1000)
	.brushOn(false)
	.title(function (d) { return d.key + ": " + d.value + " sightings"; })
	.renderTitle(true)
	.elasticY(true);

    dc.pieChart('#shape-chart')
	.dimension(shape_dim)
	.group(count_by_shape);

    dc.renderAll();

});