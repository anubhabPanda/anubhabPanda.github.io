var w3,h3;
			w3 =document.getElementById("bubbleContainer").clientWidth;
			h3 = document.getElementById("bubbleContainer").clientHeight;
			

		


			var width = w3,
				height = 0.7*h3;

			var canvas = d3.select("#bubbleContainer").append("svg").classed("svg4",true)
						   .attr("width",width)
						   .attr("height",height)
						   .append("g")
						   .attr("transform","translate(20,0)");
			
			var pack = d3.layout.pack()
						 .size([width-60 , height])
						 .padding(4)

			var color = d3.scale.category20b();

			d3.json("/data/bubbleData/DataB.json",function(data){


				// var tempData = [{
				// 	word : "Dummy",
				// 	frequency : 10000,
				// 	children : []
				// }];
				// var tempWord = [];
				// var tempFreq = [];

				// for(var i = 0 ; i < data.length ; i++)
				// {
				// 	tempWord.push(data[i].word);
				// 	tempFreq.push(data[i].value);
				// 	tempData[0].children.push({ word : tempWord[i], frequency : parseInt(tempFreq[i])});
				// }

				// console.log(tempData);

				// var scale = Math.sqrt(d3.max(tempFreq));

				var nodes = pack.nodes(data);

				

				var node = canvas.selectAll(".node")
								 .data(nodes)
								 .enter()
								 .append("g")
								 	.attr("class","node")
								 	.attr("transform",function(d){
								 		return "translate(" + d.x + "," + d.y + ")";
								 	})


		        var circle;

// function initialize(){
						circle = node.append("circle").classed("bubbles",true)
						.attr("r",0)
						.attr("fill",function(d){return d.children ? "#F8F8F8" : color(d.r) ;})
						.attr("opacity",0.75)
						.attr("stroke",function(d){return d.children ? "#F8F8F8" : "#ADADAD"})
						.attr("stroke-width",0)
						.transition()
						.delay(function(d,i){
							return i * 100;
						})
						.duration(3000)
						.ease("elastic")
						.attr("r",function(d){
								return d.r * 1.5 ;
						});

			

					var text = node.append("text").classed("bubbletext",true)
					.text(function(d){

						return d.children ? "" : d.word;
					}) ;

					text.attr("fill","white")
						.attr("font-size",function(d){  return d.r/2 ; })
						.attr("opacity",0)
						.attr("text-anchor","middle")
						.transition()
						.delay(function(d,i){
							return i * 100;
						})
						.duration(1000)
						.ease("ease-in")
						.attr("opacity",1);

						//tooltip

						// var div2 = d3.select("#bubbleContainer").append("div")   
						// 		  .attr("class", "tooltip3")               
						// 		  .style("opacity", 0)

						// div2.append("p").attr("id","p7")
 					// 	div2.append("p").attr("id","p8")

						d3.selectAll(".bubbles").filter(function(d,i){
																		if(!d.children)
																			return true;
																		else
																			return false;
												 })
												.append("title")
												.text(function(d){
															return d.word + " " + "frequency = " + d.value;
														});

						d3.selectAll(".node")
						.append("circle").classed("bubbles2",true)
						.attr("r",0)
						.attr("fill",function(d){return d.children ? "#F8F8F8" : color(d.r) ;})
						.attr("opacity",0.15)
						.attr("stroke",function(d){return d.children ? "#F8F8F8" : "#ADADAD"})
						.attr("stroke-width",0)
						.transition()
						.delay(function(d,i){
							return i * 100;
						})
						.duration(3000)
						.ease("elastic")
						.attr("r",function(d){
								return d.r * 1.5 ;
						});


						// d3.selectAll("circles").on("mouseover", function(d) {
													    
													    
						// 							    div2.transition().duration(300)
						// 							    .style("opacity", 1)
													    
						// 							    div2.style("left", (d3.event.pageX+20) + "px")
						// 							    .style("top", (d3.event.pageY -30) + "px");

						// 							    d3.select("#p7")
						// 							    .text("Word")
													  
						// 							    d3.select("#p8")
						// 							    	.text(d.value)
													    
						// 							  })
				// }


			var counter = 1 ;
			// var timer = setInterval(myTimer,5000);
			// myTimer();
			var recurseTimer;
			function recurse(){
				recurseTimer = setInterval(myTimer,5000);
			}
			
			
			function myTimer(circle){
					  d3.selectAll(".bubbles2")
						.attr("r",0)
						.attr("fill",function(d){return d.children ? "white" : color(d.r) ;})
						.attr("opacity",0.45)
						.attr("stroke",function(d){return d.children ? "white" : "#ADADAD"})
						.attr("stroke-width",0)
						.transition()
						.delay(function(d,i){
							return i * 100;
						})
						.duration(3000)
						.ease("elastic")
						.attr("r",function(d){
								return d.r * 1.5 ;
						});

					d3.selectAll(".bubbletext")
					  .attr("fill","white")
					  .attr("opacity",1)
			}
				
			
			document.getElementById("stop").onclick = stopTimer;

			function stopTimer(){
				// clearInterval(timer);
				clearInterval(recurseTimer);
			}
				
			document.getElementById("start").onclick = startTimer;

			function startTimer(){
					recurse();
				}

			

						
			});
