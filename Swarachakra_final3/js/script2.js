var divWidth = document.getElementById("chartC").clientWidth ;
var divHeight = document.getElementById("chartC").clientHeight;

var countries,cities;
var year = "2016" ;
var w4 = 1*divWidth;
var h4 = 0.9*divHeight;
var value;
var projection = d3.geo.mercator()
						.center([0,40])
						.translate([w4/2,h4/2])
						.scale([w4/7]);
var sel;
var maxZoomIn = w4*2;
var maxZoomOut = w4/7;

var zoom = d3.behavior.zoom()
			 .translate(projection.translate())
			 .scale(projection.scale())
			 .scaleExtent([maxZoomOut,maxZoomIn])



			 .on("zoom",function(d){

			 	var t = d3.event.translate;
			 	var s = d3.event.scale;

			 	zoom.translate(t);
			 	projection.translate(t).scale(s);

			 	countries.attr("d",path) ;

			 	// cities.attr("cx", function(d) {
					// 	   return projection([d.longitude, d.latitude])[0];
					//    })
					//    .attr("cy", function(d) {
					// 	   return projection([d.longitude, d.latitude])[1];
					//    });
			 });



var zoomIn = function() {
			var newScale = Math.min(projection.scale() * 2, maxZoomIn);
			zoomTo(newScale);
		};

		var zoomOut = function() {
			var newScale = Math.max(projection.scale() / 2, maxZoomOut);
			zoomTo(newScale);
		};

		//Define zoomTo function to which we can pass a new scale value
		zoomTo = function(newScale) {

			var t = projection.translate(),
				s = projection.scale();
			
			t[0] -= w4 / 2;
			t[0] *= newScale / s;
			t[0] += w4/ 2;

			t[1] -= h4 * 0.55;
			t[1] *= newScale / s;
			t[1] += h4 * 0.55;

			
			
			zoom.translate(t).scale(newScale);
			projection.translate(t).scale(newScale);

			//Finally, transition paths and circles into place

			countries.transition()
				.ease("linear")
				.delay(50)
				.duration(500)
				.attr("d", path);

			cities.transition()
				.ease("linear")
				.duration(500)
				.attr("cx", function(d) {
					return projection([d.longitude, d.latitude])[0];
				})
				.attr("cy", function(d) {
					return projection([d.longitude, d.latitude])[1];
				});



		};


		d3.select("#zoomIn")
			.on("click", function() {
				zoomIn();
			});

		d3.select("#zoomOut")
			.on("click", function() {
				zoomOut();
			});

var zoomPresets = [
			{
				name: 	"All",
				scale: 	maxZoomOut,
				x: 		w4 / 2,
				y:		h4 / 2
			},
			{
				name: "Africa",
				scale: 	w4 / 2.5,
				x: 		w4 / 2.5,
				y:		0
			},
			{
				name: "Americas",
				scale: 	w4 / 5,
				x:		w4 * 0.8,
				y:		h4 / 3
			},
			{
				name: "Asia",
				scale: 	w4 / 3,
				x: 		w4 / 24,
				y:		h4 * 0.5
			},
			{
				name: "Europe",
				scale: 	w4 * 0.6,
				x: 		w4 / 3,
				y:		h4 * 0.8
			}
		];
		
		//Create a button for each preset
		d3.select("#presetsContainer")
			.selectAll("button")  
			.data(zoomPresets)
			.enter()
			.append("button")
			.text(function(d) {
				return d.name;
			})
			.on("click", function(d) {

				//Define behavior on click for this button

				var s = d.scale;
				var x = d.x;
				var y = d.y;
		
				//Update projection scale and translation
				projection.scale(s)
						  .translate([ x, y ]);
			
				//Update zoom behavior to match
				zoom.scale( projection.scale() )
					.translate( projection.translate() );
			
				//Finally, transition paths and circles into place

				countries.transition()
					.ease("linear")
					.delay(50)
					.duration(500)
					.attr("d", path);

				cities.transition()
					.ease("linear")
					.duration(500)
					.attr("cx", function(d) {
						return projection([d.longitude, d.latitude])[0];
					})
					.attr("cy", function(d) {
						return projection([d.longitude, d.latitude])[1];
					});

			});

var path = d3.geo.path()
				 .projection(projection);

// var colorB = d3.scale.quantize()
// 					.range(["#d0d1e6","#a6bddb","#74a9cf","#045a8d","#2b8cbe"]);

// var colorB = d3.scale.category10();
var colorB_domain = [10, 100, 500, 1000, 2000] ;

var ext_colorB_domain = [0, 10, 100, 500, 1000, 2000]
var legend_labels = ["< 10", "10+", "100+", "500+", "1000+", "> 2000"]

var colorB = d3.scale.threshold()
.domain(colorB_domain)
.range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);

var svgA = d3.select("#chartC")
			.append("svg").attr("class","svg3")
			.attr({
				width:w4,
				height:h4

			})
			.style("background","none")

var div1 = d3.select("#chartC").append("div")   
  .attr("class", "tooltip2")               
  .style("opacity", 0)
 	div1.append("p").attr("id","p5")
 	div1.append("p").attr("id","p6")

	d3.csv("data/Mapdata/yearwiseData.csv",function(data){
			
			// colorB.domain([
							// d3.min(data,function(d){return +d[year] ;}),
							// d3.max(data,function(d){return +d[year] ;}),
			// 	])
			

			d3.json("data/mapshaper_output.json",function(json){

					
					
						
					var countriesGroup = svgA.append("g")
											.attr("id","countriesGroup")
											.call(zoom) ;

										countriesGroup.append("rect").classed("rectangle","true")
										.attr("x", 0)
										.attr("y", 0)
										.attr("width", w4)
										.attr("height", h4)
										.style("fill","#E9F2F5")
										.style("stroke","#008CBA")
										.attr("rx",5)
										.attr("ry",5);

					var newYear = "2016"


	function drawMap(data,json,newYear){
					
					for(var i = 0;i<data.length;i++){

											var dataCountryCode = data[i].countryCode;
											var dataValue = +data[i][newYear];
											
											for(var j = 0 ; j<json.features.length ; j++){

													var jsonCountryCode = json.features[j].properties.iso_a3 ;

														if(dataCountryCode == jsonCountryCode){

															json.features[j].properties.userInstalls = dataValue;
															
															break;
														}
											}

										}


			
					var textYear = svgA.append("g")
										.attr("transform","translate(" + (w4-100) + "," + 50 + ")")
										.append("text").classed("yearText",true)
										.text(year)
						
					

									

									countries = countriesGroup.selectAll("path")
																.data(json.features)
														countries.enter()
																.append("path")
																.attr("d",path)
																.style("fill",function(d,i){

																		value = d.properties.userInstalls;
																		if(value){
																			return colorB(value);
																		}
																		else{
																			return "#ccc" ;
																		}
																})
																.style("opacity",0.8) 

								 .on("mouseover", function(d) {
															    d3.select(this).transition().duration(300).style("opacity", 1);
															    
															    div1.transition().duration(300)
															    .style("opacity", 0.7)
															    
															    div1.style("left", (d3.event.pageX-480) + "px")
															    .style("top", (d3.event.pageY -2700) + "px");

															    d3.select("#p5")
															    .text(d.properties.name)
															  if(d.properties.userInstalls !== undefined){
															  	d3.select("#p6")
															    	.text("User Installs for the year " 
															    	+ year + " : " + d.properties.userInstalls)
															  }
															    
															    
															  })

								  .on("mouseout", function() {
															    d3.select(this)
															    .transition().duration(300)
															    .style("opacity", 0.8);
															    
															    div1.transition().duration(300)
															    .style("opacity", 0);
								  })


								  //Adding Legend

								   var legend = svgA.selectAll("g.legend")
												  .data(ext_colorB_domain)
												  .enter().append("g")
												  .attr("class", "legend");

												  var ls_w = 20, ls_h = 20;

												  legend.append("rect")
												  .attr("x", 20)
												  .attr("y", function(d, i){ return h4 - (i*ls_h) - 2*ls_h;})
												  .attr("width", ls_w)
												  .attr("height", ls_h)
												  .style("fill", function(d, i) { return colorB(d); })
												  .style("opacity", 0.8);

												  legend.append("text")
												  .attr("x", 50)
												  .attr("y", function(d, i){ return h4 - (i*ls_h) - ls_h - 4;})
												  .text(function(d, i){ return legend_labels[i]; });

												   // countries.exit().remove();
												   
																

}





function udateMap(dataA,jsonA,sel){	
					
					var textYear = sel;		
					for(var i = 0;i<dataA.length;i++){

											var dataCountryCode = dataA[i].countryCode;
											var dataValue = +dataA[i][sel];
											
											for(var j = 0 ; j<jsonA.features.length ; j++){

													var jsonCountryCode = jsonA.features[j].properties.iso_a3 ;

														if(dataCountryCode == jsonCountryCode){

															jsonA.features[j].properties.userInstalls = dataValue;
															
															break;
														}
											}

										}
					
					var textYear = svgA.select(".yearText")
										.text(sel)
						
					

									

									countries = countriesGroup.selectAll("path")
																.data(jsonA.features)
																.transition()
																.duration(2000)
																.ease("ease-in")
																.attr("d",path)
																.style("fill",function(d,i){

																		value = d.properties.userInstalls;
																		if(value){
																			return colorB(value);
																		}
																		else{
																			return "#ccc" ;
																		}
																})
																.style("opacity",0.8) 

								 .on("mouseover", function(d) {
															    d3.select(this).transition().duration(300).style("opacity", 1);
															    
															    div1.transition().duration(300)
															    .style("opacity", 0.7)
															    
															    div1.style("left", (d3.event.pageX-480) + "px")
															    .style("top", (d3.event.pageY -2700) + "px");

															    d3.select("#p5")
															    .text(d.properties.name)
															  if(d.properties.userInstalls !== undefined){
															  	d3.select("#p6")
															    	.text("User Installs for the year " 
															    	+ textYear + " : " + d.properties.userInstalls)
															  }
															    
															    
															  })

								  .on("mouseout", function() {
															    d3.select(this)
															    .transition().duration(300)
															    .style("opacity", 0.8);
															    
															    div1.transition().duration(300)
															    .style("opacity", 0);
								  })


								 
									console.log(sel);

}






						window.onload = drawMap(data,json,year) ; 
						d3.selectAll("select")
							.on("change",function(){
								
								sel = d3.select("#yearSelector").node().value;
								console.log(data,json)
								udateMap(data,json,sel) ;

							})
						


		
		});



	});
		
