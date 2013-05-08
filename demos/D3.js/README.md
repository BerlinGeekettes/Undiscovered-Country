D3.js Demo
=====================================

1. Get the [data](http://www.infochimps.com/datasets/60000-documented-ufo-sightings-with-text-descriptions-and-metada).

2. First step in exploring any undiscovered country: look at (= visualize) the data. Why? c.f. [Anscombe's quartet](http://en.wikipedia.org/wiki/Anscombe's_quartet).

3. New + exciting potential opened up by *interactivity* in datavis: lots of great tools out there. One heavyweight in the field - Mike Bostock's [D3.js](http://d3js.org/) library, which is flexible, powerful, and fairly low-level - has plenty of pre-bundled charts, but using D3 effectively generally means operating at the level of individual SVG elements on a webpage. Many great tutorials ([e.g.](https://github.com/alignedleft/strata-d3-tutorial/raw/master/Strata%202013%20Slides.pdf) ) help overcome this, but getting a nice chart up and running quickly can still be prohibitive.

4. Helpful for learning/demo purposes: higher-level libraries, e.g. [dc.js](http://nickqizhu.github.io/dc.js/), which features ready-to-go charts building on D3 and [crossfilter.js](http://square.github.io/crossfilter/), latter being another Bostock creation which slices and dices data across multiple dimensions

5.[index.html](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/index.html) page: vessel for our vis. Main points - scripts sourced, anchor divs copied from dc.js page

p.s. one-sentence aside about usually needing a web server running to view local pages within browser (i.e. $ python -m SimpleHTTPServer), possibly unnecessary given presumed technical savvy of audience

6. Open [script](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.js), quick walk through data-loading commands

7. Live-coding. All the magic (= typing) happening here.

8. [Finished product](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.DONE.js) [(/with comments)](https://github.com/BerlinGeekettes/Undiscovered-Country/blob/master/demos/D3.js/CODEMOTION.UFO.VIS.DONE.COMMENTED.js)

9. Intense deliberation about whether to filter on 'fireball' UFO shape, hover at December 16 1999, and remark 'goodness gracious, great balls of fire', and if so how much eyerolling would be produced

10. Pass the mantle of exploration to Irina on R, Monika on Redis

11. Countries discovered + flying objects identified = talk is over, let's all have a drink

