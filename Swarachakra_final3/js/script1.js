var position,no_of_bar;

d3.csv("data/dataB.csv",function(data){

	
	var margin = { top:30, right:30 , bottom:80 ,left:90 }
	var rect;
	var tempColor;
	var w = document.getElementById("leftPanel").clientWidth;
	var h = 0.7*document.getElementById("leftPanel").clientHeight;
	var height = h - margin.top - margin.bottom ,
		width  = w - margin.left - margin.right ,
		barWidth = 50,
		barOffset = 5;
	

	var yScale = d3.scale.linear()
						 .domain([0,d3.max(data,function(d){
						 	return parseInt(d.value);
						 })])
						 .range([0,height-20]);

	var xScale = d3.scale.ordinal()
						 .domain(d3.range(0,data.length))
						 .rangeBands([0,width],0.2);

	// var colorA = d3.scale.linear()
	// 					.domain([0,data.length*0.33,data.length*0.66,data.length])
	// 					.range(["#B58929","#C61C6F","#268BD2","#85992C"]);

	var colorA = d3.scale.linear()
						.domain([0,data.length*0.33,data.length*0.66,data.length])
						.range(["#0868ac","#43a2ca","#7bccc4","#bae4bc"]);

	var colorB = d3.scale.linear()
						.domain([0,data.length*0.33,data.length*0.66,data.length])
						.range(["#006d2c","#2ca25f","#66c2a4","#b2e2e2"]);

	// var colorD = d3.scale.linear()
	// 					.domain([0,data.length*0.33,data.length*0.66,data.length])
	// 					.range(["#7a0177","#c51b8a","#f768a1","#fbb4b9"]);



	// var first_tooltip = d3.select("body").append("div")
	// 				.classed("first_tooltip",true)
	// 				.style('opacity',0); 

	var myChart = d3.select("#leftPanel")
		.append("svg").attr("class","svg")
		.attr("width",width + margin.left + margin.right)
		.attr("height",height + margin.top + margin.bottom)
		.append("g")
		.attr('transform','translate(' + margin.left + ',' + (margin.top + 20) + ')')




		var vGuideScale = d3.scale.linear()
						.domain([0,d3.max(data,function(d){
							return parseInt(d.value) ;
						})])
						.range([height,0]);
	

	var vAxis = d3.svg.axis()
					.scale(vGuideScale)
					.orient('left')
					.ticks(10)

d3.select(".svg").append("g").attr("class","axis")
				.call(vAxis)
				.attr('transform','translate(' + margin.left + ',' + (margin.top + 20) + ')')

	


	var hAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.tickValues(xScale.domain().filter(function(d,i){
						if(i % 10 == 0 && i != 0)
						return true ;
					return false ;
					}))

d3.select(".svg").append("g").attr("class","axis")
				.call(hAxis)
				.attr('transform','translate(' + (margin.left) + ',' + (height + margin.top + 20) + ')')


d3.select(".svg").append("g").attr("class","labels")
								.attr("transform","translate(" + ((width/2)) + "," + (height+100) + ")")
								.append("text")
								.text("Number of Words ")
				

			d3.select(".svg").append("g").attr("class","labels")
								.attr("transform","translate(20,300)rotate(-90)")
								.append("text")
								.text("Frequency")

	
function draw(data){
	 rect = myChart.selectAll("rect").data(data)

			rect.enter()
				.append("rect")
				.attr("class","barRect")
				.style("fill",function(d,i){
					return colorA(i);
				})
				.attr('width',xScale.rangeBand())
				.attr("height",0)
				.attr("x",function(d,i){
					return xScale(i);})
				.attr("y",height)

	

			.on("mouseover",function(d,i){

			
				var x = d3.event.pageX ;
				var y = d3.event.pageY ; 
				tempColor = this.style.fill;
				d3.select(this)
					.style("opacity",0.5).transition()
					.style("fill","blue");

				d3.select("#first_tooltip").text("Word = " + d.word + " Frequency = " + d.value)
					.style("left", (x -550) + "px")
					.style("top",(y-980) + "px")
					.style("opacity",0.8)	

			})

			.on("mouseout",function(d,i){
				d3.select(this).style("opacity",1).transition()
								.style("fill",tempColor);
				d3.select("#first_tooltip").style("opacity",0)
			})

	

			rect.transition()
					.attr("height",function(d,i){
						return yScale(parseInt(d.value));
					})
					.attr("y",function(d,i){
						return height-yScale(parseInt(d.value)) ;
					})
					.delay(function(d,i){
						return i*30;
					})
					.duration(2000)
					.ease('elastic')

	
			

				//sort logic


var sortOrder = false;
var sortBars = function () {
    sortOrder = !sortOrder;
    
    sortItems = function (a, b) {
        if (sortOrder) {
            return a.value - b.value;
        }
        return b.value- a.value;
    };

    myChart.selectAll("rect")
        .sort(sortItems)
        .transition()
        .delay(function (d, i) {
        return i * 50;
    })
        .duration(1000)
        .attr("x", function (d, i) {
        return xScale(i);
    });

   
};
// Add the onclick callback to the button
d3.select("#sort").on("click", sortBars);

// function randomSort() {

	
// 	svg.selectAll("rect")
//         .sort(sortItems)
//         .transition()
//         .delay(function (d, i) {
//         return i * 50;
//     })
//         .duration(1000)
//         .attr("x", function (d, i) {
//         return xScale(i);
//     });

    
// };

// function reset() {
// 	myChart.selectAll("rect")
// 		.sort(function(a, b){
// 			return a.value - b.value;
// 		})
// 		.transition()
//         .delay(function (d, i) {
//         return i * 50;
// 		})
//         .duration(1000)
//         .attr("x", function (d, i) {
//         return xScale(i);
// 	
var colorfirst = function(){
	myChart.selectAll("rect")
			.style("fill",this.style.fill)
			.transition()
			.delay(function(d,i){
				return i*20
			})
			.duration(500)
			.style("fill",function(d,i){
				return colorA(i);
			})
}

var tempColorA = d3.selectAll("rect").style.fill;	
d3.select("#colorA").on("click",colorfirst)

var colorsecond = function(){
	myChart.selectAll("rect")
			.style("fill",tempColorA)
			.transition()
			.delay(function(d,i){
				return i*20
			})
			.duration(500)
			.style("fill",function(d,i){
				return colorB(i);
			})
}	
d3.select("#colorB").on("click",colorsecond) ;

rect.exit().remove();
}		

// Slider code

slider = document.getElementsByClassName('slider');

for ( var i = 0; i < slider.length; i++ ) {

	noUiSlider.create(slider[i], {
		start: 100 ,
		connect: "lower",
		// connect: true,
		orientation: "horizontal",
		step:1,
		
		range: {
			'min': 0,
			'max': 100
		}
		
	});

	// Bind the color changing function
	// to the slide event.
	slider[i].noUiSlider.on('slide',update);
}

window.onload = draw(data) ;
function update(data){
	
	no_of_bar = slider[0].noUiSlider.get() ;
	// var bardata = [];
	d3.csv("data/dataB.csv",function(data){
		// for(var j = 0 ;j < no_of_bar ; j++){
		// 	bardata.push({word:data[j].word , value: data[j].value}) ; 

		// }
		// console.log(bardata);
	filtered = data.filter(function(d,i){
				if(i < no_of_bar - 1)
					return data[i];
				else
					return false;
			})
			// console.log(filtered);
			draw(filtered);
	})
	}




				

});


