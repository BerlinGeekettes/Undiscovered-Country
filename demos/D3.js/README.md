D3.js Demo
=====================================

1. Get the [data](http://www.infochimps.com/datasets/60000-documented-ufo-sightings-with-text-descriptions-and-metada). We're looking at reports of UFO sightings because, naturally, an undiscovered country is going to have lots of unidentified objects, and we might as well get a head start on dealing with such things, no?

2. Make an html page, the vessel for our visualization. 

   In the header - load the libraries:

   ```
    <!-- source libraries -->
    <script type="text/javascript" src="http://d3js.org/d3.v3.js"></script>
    <script type="text/javascript" src="https://raw.github.com/square/crossfilter/master/crossfilter.min.js"></script>
    <script type="text/javascript" src="https://raw.github.com/NickQiZhu/dc.js/master/dc.min.js"></script>

    <!-- our script -->
    <script type="text/javascript" src="CODEMOTION.UFO.VIS.js"></script>

    <!-- dc.js stylesheet -->
    <link rel="stylesheet" type="text/css" href="https://raw.github.com/NickQiZhu/dc.js/master/test/dc.css"/>
   ```
   
   We'll be using Mike Bostock's fantastic library [D3.js](http://d3js.org/), which is flexible and powerful but operates at a fairly low level (i.e. targeting individual SVG elements) - so even though there are all sorts of [wonderful](http://alignedleft.com/tutorials/d3/) [tutorials](http://www.jeromecukier.net/blog/2013/03/05/d3-tutorial-at-strata-redux/) [out](http://christopheviau.com/d3_tutorial/) [there](http://www.d3noob.org/) to ease the process, it can take some time to get a basic chart up and running.

   To ease the process, we'll use the higher-level [dc.js](http://nickqizhu.github.io/dc.js/), which provides a nice wrapper to quickly build interactive D3 charts. DC.js also depends on [crossfilter.js](http://square.github.io/crossfilter/), another Bostock library that provides tools for slicing and dicing data across multiple dimensions.

   In the body - copy and paste the anchor divs from the [dc.js homepage](http://nickqizhu.github.io/dc.js/), with some minor modifications:

   ```
    <h1>UFO Sightings</h1>

    <div id="date-chart">                                                                   
	<p><span>Date of sighting</span>                                                                    

	<a class="reset" href="javascript: dc.filterAll();dc.redrawAll();" style="display: none;">reset</a>  
    
	<span class="reset" style="display: none;">Current filter: <span class="filter"></span></span></p>
    </div>

    <div id="shape-chart">                                                                     
	<p><span>Shape of UFO</span>                                                                     

	<a class="reset" href="javascript:dc.filterAll();dc.redrawAll();" style="display: none;">reset</a>       

	<span class="reset" style="display: none;">Current filter: <span class="filter"></span></span></p>
    </div>
   ```


   Here's a commented [example.](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/index.html)

2a. For any who have absolutely zero Javascript experience (we've all been there) - to view the html page in browser with Javascript, you'll generally need to have a local server running. If you're using a Unix system (this includes Macs), this can be accomplished with one command in your console:

    ```
    $ python -m SimpleHTTPServer
    ```
        
   Now open your browser to http://localhost:8000 (8000 being the default port), and you should be able to navigate directly to the file.

3. Open up the [script](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.js). The commands to load the data are already set up:

   ```
    d3.text('ufo_awesome.tsv', function(error, data) {

	var ufo_data = d3.tsv.parseRows(data, function(d) {
	    return {
		sighted_at: new Date(d[0].substring(0,4), d[0].substring(4,6), d[0].substring(6,8)),
		shape: d[3]
	    };
	});

	// More functions coming here

    });
   ```
   
   Here we're loading in the data with `d3.text`. The first argument is the data we're uploading, the second is a callback function that executes once the data finishes loading. Once the data loads, we parse the rows with `d3.tsv` to get the info we need: date of sighting (converted to a Javascript Date type) and reported shape of the UFO. (Normally we'd just load and parse the data in one step with a call to `d3.tsv`, but that setup assumes a header row that our dataset lacks, so we need to load and then parse.)

   Everything added after this point stays inside the `d3.text` callback function. You may have noticed the helpful comment I left there.

4. Next, we apply a set of crossfilter commands to the parsed data, setting up a structure so that the data can be grouped easily. 

   ```
    var cx = crossfilter(ufo_data);

    var date_dim = cx.dimension(function(d) { return d.sighted_at; });
    var shape_dim = cx.dimension(function(d) { return d.shape; });

    var count_by_date = date_dim.group().reduceCount();
    var count_by_shape = shape_dim.group().reduceCount();
   ```

   The first command makes a crossfilter object. The next two set up the dimensions of interest, here date and shape. The final two commands tell crossfilter how to aggregate ('group') along these dimensions. In this case we're just counting each record; if we had a numeric variable (say, Number Of Aliens On Board), we could have called `reduceSum` to aggegate by summing instead, or made our own custom accessor function for group reduction.

5. Now we add a couple charts - a bar chart showing number of UFO sightings by date from 1985 to 2011 (when the dataset was last updated), and a pie chart broken down by shape:

   ```
    dc.barChart('#date-chart')
	.dimension(date_dim)
	.group(count_by_date)
	.x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2011,0, 1) ]));

    dc.pieChart('#shape-chart')
	.dimension(shape_dim)
	.group(count_by_shape);

    dc.renderAll();

   ```

   The call to `dc.renderAll` draws the charts. Check it out in the browser!

6. One thing you may have noticed is that the bar chart was much too small. We can fix that, and add some nifty options like titles on hover and y-axis resizing when we filter from the pic chart:

   ```
    dc.barChart('#date-chart')
	.dimension(date_dim)
	.group(count_by_date)
	.x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2011,0, 1) ]))
	.width(1000)      // set chart width
	.brushOn(false)   // take away interactivity (necessary for titles)
	.title(function(d) { 
	    return d3.time.format("%b %d, %Y")(d.key) + // put date in pretty format
		": " + d.value + " sightings"; })
	.renderTitle(true)         
	.elasticY(true);    // auto-resize y-axis on filtering
   ```

7. [Finished product](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.DONE.js) [(/with comments)](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.DONE.COMMENTED.js), woohoo! Have fun investigating the time course for different UFO shapes by clicking and filtering on the pie chart. I especially invite you to click on the category 'fireball' and tell me what you think was happening on December 16, 1999. Goodness gracious!



