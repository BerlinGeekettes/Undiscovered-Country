// data source: http://www.infochimps.com/datasets/60000-documented-ufo-sightings-with-text-descriptions-and-metada


// load in the data
d3.text('ufo_awesome.tsv', function(error, data) {

    var ufo_data = d3.tsv.parseRows(data, function(d) {
	return {
	    sighted_at: new Date(d[0].substring(0,4), d[0].substring(4,6), d[0].substring(6,8)),
	    shape: d[3]
	};
    });

    // More functions coming here

});