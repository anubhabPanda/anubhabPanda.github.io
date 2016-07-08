var installData = [];




var marginA= { top:30, right:30 , bottom:30 ,left:60 };
var counter = 0;
var tempColor;
var w1 = 0.86*document.getElementById("chartB").clientWidth;
var h1 = 0.66*document.getElementById("chartB").clientHeight;
// console.log(w1);
// console.log(h1);
var height1 = h1 - marginA.top - marginA.bottom ,
	width1  = w1 - marginA.left - marginA.right ;
	// barWidth = 50,
	// barOffset = 5;

d3.csv("data/Daily user installs total/DUI_total.csv",function(data){
										for(key in data)
												installData.push(data[key]);




										var tooltip3 = d3.select("#chartB").append("div")
														.style('position','absolute')
														.style('background','#FFFDDC')
														.style('padding','0 10px')
														.style('opacity',0);
																

										var yScale2,xScale2,color,rect;


										var myChart = d3.select("#chartB")
															.append("svg").classed("svg2",true)
															.attr("width",width1 + marginA.left + marginA.right)
															.attr("height",height1 + marginA.top + marginA.bottom);
										
									

										var group = myChart.append("g")
															.attr('transform','translate(' + marginA.left + ',' + marginA.top + ')');


										yScale2 = d3.scale.linear()
															 .domain([0,d3.max(installData,function(d){
															 	return d.DUI_D ;
															 })])
															 .range([0,height1-20]);

										xScale2 = d3.scale.ordinal()
															 .domain(data.map(function(d){
															 	return d.Month;
															 }))
															 .rangeBands([0,width1]);

										color = d3.scale.linear()
															.domain([0,installData.length*0.33,installData.length*0.66,installData.length])
															.range(["#fed976","#feb24c","#fd8d3c","#bd0026"]);




														
															
										rect = group.selectAll("rect").data(installData)
													.enter().append("rect")
															.style("fill",function(d,i){
																return color(i);
															})
															.attr('width',0)
															.attr("x",0)
															.attr("height",function(d){
																return yScale2(d.DUI_A);
															})
															.attr("y",function(d){
																return height1-yScale2(d.DUI_A) ;
															})


												.on("mouseover",function(d){

													tooltip3.transition()
															.style('opacity',0.9)
													tooltip3.html(d.DUI_A)
														   .style('left',(d3.event.pageX + 10) + 'px')
														   .style('top', (d3.event.pageY - 1800) + 'px')

													tempColor = this.style.fill;
													d3.select(this)
														.style("opacity",0.5).transition()
														.style("fill","blue");
												})

												.on("mouseout",function(d){
													d3.select(this).style("opacity",1).transition()
																	.style("fill",tempColor);
													tooltip3.style("opacity",0);
												})


										rect.transition()
												.attr('width',xScale2.rangeBand()-1)
												.attr("x",function(d,i){
													return xScale2(d.Month);})
												.delay(function(d,i){
													return i*100;
												})
												.duration(2000)
												.ease('elastic')
												

												var vGuideScale = d3.scale.linear()
																	.domain([0,d3.max(installData,function(d){
																		return d.DUI_D ; 
																	})])
																	.range([height1,0]);

												var vAxis = d3.svg.axis()
																.scale(vGuideScale)
																.orient('left')
																.ticks(10)

												var vGuide = d3.select(".svg2").append("g")
													vAxis(vGuide)

												vGuide.attr('transform','translate(' + marginA.left + ',' + marginA.top + ')')

												vGuide.selectAll('path')
													  .style({fill:"none" , stroke : "#000"})

												vGuide.selectAll('line')
													  .style({stroke : "#000"})


										var hAxis = d3.svg.axis()
														.scale(xScale2)
														.orient('bottom')
														.tickValues(xScale2.domain())

										var hGuide = d3.select(".svg2").append("g")
											hAxis(hGuide)

										hGuide.attr('transform','translate(' + (marginA.left) + ',' + (height1 + marginA.top) + ')')

										hGuide.selectAll('path')
											  .style({fill:"none" , stroke : "#000"})

										hGuide.selectAll('line')
											  .style({stroke : "#000"})


										function toggle(){
															if(counter == 0)
																e1();
															else if(counter == 1)
																e2();
															else if(counter == 2)
																e3();
															else
																e4();
														}

function e1()
{
				d3.select("#d2")
				.text("Monthly user installs for the year 2014")
				.style("opacity",0)
				.transition()
				.duration(1000)
				.style("opacity",1);
				
				
				// yScale2.domain([0,d3.max(installData,function(d){
				// 	return d.DUI_B ;
				// })])
				// .range([0,height-20]);
								
				color.range(["#d0d1e6","#74a9cf","#2b8cbe","#045a8d"]);					

				rect.data(installData)
					.style("fill",function(d,i){
								return color(i);
							})
							.attr('width',0)
							.attr("x",0)
							.attr("height",function(d){
							return yScale2(d.DUI_B);
							})
							.attr("y",function(d){
								return height1-yScale2(d.DUI_B) ;
							})

				.on("mouseover",function(d){

					tooltip3.transition()
							.style('opacity',0.9)
					tooltip3.html(d.DUI_B)
						   .style('left',(d3.event.pageX + 10) + 'px')
						   .style('top', (d3.event.pageY - 1800) + 'px')

					tempColor = this.style.fill;
					d3.select(this)
						.style("opacity",0.5).transition()
						.style("fill","blue");
				})

				.on("mouseout",function(d){
					d3.select(this).style("opacity",1).transition()
									.style("fill",tempColor);
					tooltip3.style("opacity",0);
				})


				rect.transition()
						.attr('width',xScale2.rangeBand())
						.attr("x",function(d,i){
							return xScale2(d.Month);})
						.delay(function(d,i){
							return i*100;
						})
						.duration(2000)
						.ease('elastic')



				// vGuideScale = d3.scale.linear()
				// 					.domain([0,d3.max(installData,function(d){
				// 							return d.DUI_B ;
				// 						})])
				// 					.range([height,0]);
				// vAxis.scale(vGuideScale);
				// vAxis(vGuide);

				// hAxis.scale(xScale2);
				// hAxis(hGuide);
				counter = 1;
				
				
}

function e2()
{
				d3.select("#d2")
				.text("Monthly user installs for the year 2015")
				.style("opacity",0)
				.transition()
				.duration(1000)
				.style("opacity",1);
				


				// yScale2.domain([0,d3.max(installData,function(d){
				// 	return d.DUI_C ;
				// })])
				// .range([0,height-20]);
								
				color.range(["#e5f5f9","#99d8c9","#41ae76","#005824"]);						

				rect.data(installData)
					.style("fill",function(d,i){
								return color(i);
							})
							.attr('width',0)
							.attr("x",0)
							.attr("height",function(d){
							return yScale2(d.DUI_C);
							})
							.attr("y",function(d){
								return height1-yScale2(d.DUI_C) ;
							})


				.on("mouseover",function(d){

					tooltip3.transition()
							.style('opacity',0.9)
					tooltip3.html(d.DUI_C)
						   .style('left',(d3.event.pageX + 10) + 'px')
						   .style('top', (d3.event.pageY - 1800) + 'px')

					tempColor = this.style.fill;
					d3.select(this)
						.style("opacity",0.5).transition()
						.style("fill","blue");
				})

				.on("mouseout",function(d){
					d3.select(this).style("opacity",1).transition()
									.style("fill",tempColor);
					tooltip3.style("opacity",0);
				})

						rect.transition()
						.attr('width',xScale2.rangeBand())
						.attr("x",function(d,i){
							return xScale2(d.Month);})
						.delay(function(d,i){
							return i*100;
						})
						.duration(2000)
						.ease('elastic')


				// vGuideScale = d3.scale.linear()
				// 					.domain([0,d3.max(installData,function(d){
				// 							return d.DUI_C ;
				// 						})])
				// 					.range([height,0]);
				// vAxis.scale(vGuideScale);
				// vAxis(vGuide);

				// hAxis.scale(xScale2);
				// hAxis(hGuide);
				counter = 2;
				// setTimeout("d2()",3000);
}

function e3()
{
				d3.select("#d2").text("Monthly user installs for the year 2016")
				.style("opacity",0)
				.transition()
				.duration(1000)
				.style("opacity",1) ;


				// yScale2.domain([0,d3.max(installData,function(d){
				// 	return d.DUI_D ;
				// })])
				// .range([0,height-20]);
								
				color.range(["#f768a1","#7a0177","#2b8cbe","#045a8d"]);						

				rect.data(installData)
					.style("fill",function(d,i){
								return color(i);
							})
							.attr('width',0)
							.attr("x",0)
							.attr("height",function(d){
							return yScale2(d.DUI_D);
							})
							.attr("y",function(d){
								return height1-yScale2(d.DUI_D) ;
							})

				.on("mouseover",function(d){

					tooltip3.transition()
							.style('opacity',0.9)
					tooltip3.html(d.DUI_D)
						   .style('left',(d3.event.pageX + 10) + 'px')
						   .style('top', (d3.event.pageY - 1800) + 'px')

					tempColor = this.style.fill;
					d3.select(this)
						.style("opacity",0.5).transition()
						.style("fill","blue");
				})

				.on("mouseout",function(d){
					d3.select(this).style("opacity",1).transition()
									.style("fill",tempColor);
					tooltip3.style("opacity",0);
				})


				rect.transition()
						.attr('width',xScale2.rangeBand())
						.attr("x",function(d,i){
							return xScale2(d.Month);})
						.delay(function(d,i){
							return i*100;
						})
						.duration(2000)
						.ease('elastic')


				// vGuideScale = d3.scale.linear()
				// 					.domain([0,d3.max(installData,function(d){
				// 							return d.DUI_D ;
				// 						})])
				// 					.range([height,0]);
				// vAxis.scale(vGuideScale);
				// vAxis(vGuide);

				// hAxis.scale(xScale2);
				// hAxis(hGuide);
				counter = 3;
				// setTimeout("d2()",3000);
}

function e4()
{
				d3.select("#d2").text("Monthly user installs for the year 2013")
				  .style("opacity",0)
					.transition()
					.duration(1000)
					.style("opacity",1) ;

					
				// yScale2.domain([0,d3.max(installData,function(d){
				// 	return d.DUI_A ;
				// })])
				// .range([0,height-20]);
								
				color.range(["#fed976","#feb24c","#fd8d3c","#bd0026"]);						

				rect.data(installData)
					.style("fill",function(d,i){
								return color(i);
							})
							.attr('width',0)
							.attr("x",0)
							.attr("height",function(d){
							return yScale2(d.DUI_A);
							})
							.attr("y",function(d){
								return height1-yScale2(d.DUI_A) ;
							})

				.on("mouseover",function(d){

					tooltip3.transition()
							.style('opacity',0.9)
					tooltip3.html(d.DUI_A)
						   .style('left',(d3.event.pageX + 10) + 'px')
						   .style('top', (d3.event.pageY - 1800) + 'px')

					tempColor = this.style.fill;
					d3.select(this)
						.style("opacity",0.5).transition()
						.style("fill","blue");
				})

				.on("mouseout",function(d){
					d3.select(this).style("opacity",1).transition()
									.style("fill",tempColor);
					tooltip3.style("opacity",0);
				})


					rect.transition()
						.attr('width',xScale2.rangeBand())
						.attr("x",function(d,i){
							return xScale2(d.Month);})
						.delay(function(d,i){
							return i*100;
						})
						.duration(2000)
						.ease('elastic')


				// vGuideScale = d3.scale.linear()
				// 					.domain([0,d3.max(installData,function(d){
				// 							return d.DUI_A ;
				// 						})])
				// 					.range([height,0]);
				// vAxis.scale(vGuideScale);
				// vAxis(vGuide);

				// hAxis.scale(xScale2);
				// hAxis(hGuide);
				counter = 0;
				// setTimeout("d2()",3000);
}


var timer = setInterval(toggle,5000) ; 


});








					
