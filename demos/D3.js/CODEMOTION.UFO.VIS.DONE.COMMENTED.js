// data source: http://www.infochimps.com/datasets/60000-documented-ufo-sightings-with-text-descriptions-and-metada


// load in the data
d3.text('ufo_awesome.tsv', function(error, data) {

    // normally we'd load and parse the data with a single call to d3.tsv instead of d3.text
    // the two steps here are needed because our tsv has no header row
    // the second argument to parseRows is an accessor function that parses our data and assigns field names
    var ufo_data = d3.tsv.parseRows(data, function(d) {
	return {
	    sighted_at: new Date(d[0].substring(0,4), d[0].substring(4,6), d[0].substring(6,8)),
	    shape: d[3]
	};
    });

    // run the data through crossfilter
    var cx = crossfilter(ufo_data);

    // define dimensions
    var sighting_date_dim = cx.dimension(function (d) { return d.sighted_at; });
    var shape_dim = cx.dimension(function (d) { return d.shape; });

    // define grouping along dimensions
    // reduceCount gives the number of records in each category for this dimension
    var sightings_by_day_group = sighting_date_dim.group().reduceCount();
    var sightings_by_shape_group = shape_dim.group().reduceCount();

   // make pie chart with reported shapes
    dc.pieChart('#shape-chart')
	.dimension(shape_dim)
	.group(sightings_by_shape_group);

   // make bar chart with sightings per day
    dc.barChart('#date-chart')
	.width(1000)
	.dimension(sighting_date_dim)
	.group(sightings_by_day_group)
	.x(d3.time.scale().domain([new Date(1985, 0, 1), new Date() ]))
	.xUnits(d3.time.months)
	.elasticY(true)
	.brushOn(false)
	.title(function(d) { return d3.time.format("%b %d, %Y")(d.key) + ": " + d.value + " sightings"; })
	.renderTitle(true);

    dc.renderAll();

});