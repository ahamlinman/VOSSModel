/*************************************************************************************
	/																					  *
	/								FUNCTIONS ARE DEFINED HERE							  *
	/																					  *
	/*************************************************************************************/

Can I get a callback from the PHP file I opened via Javascript?
	
	/*
What it does: finds the location of a div within their parent div
What it takes in: a string of the id of the div
What it puts out: an object with .x = string of distance from left edge; .y = string of distance from top edge; .div = string of div's id
*/
function getLocationOf(input)
{
	//console.log(input);
	//console.log(document.getElementById(input).offsetLeft);
	//console.log(document.getElementById(input).offsetTop);
    var offset = $(input).offset();
	return {x: offset.left, 
		y: input.offsetTop,
		div: input.parentElement.id};
}

/*
What it does: moves a div to a new location
What it takes in: the id of the div being moved (string) and an object returned from getLocationOf(input)
What it puts out: nothing
*/
function shift(beingMoved,newLocation)
{
    var emSize = parseFloat($("body").css("font-size"));
    var leftCorrection = (-diameter[newLocation.div]*emSize/2) + $("#" + newLocation.div).width()/2;
	$(beingMoved).animate(
	{
		left:newLocation.x + leftCorrection,
		height:diameter[newLocation.div] + "em",
		width:diameter[newLocation.div] + "em",
		borderRadius:diameter[newLocation.div] + "em",
		//background:color[newLocation.div]
	})
	$(beingMoved).css("backgroundColor",color[newLocation.div]);
}

/*************************************************************************************
	/																					  *																						  *
	/								VALUES ARE DEFINED HERE								  *
	/																					  *
	/*************************************************************************************/
//diameter for orb to change to based on planets
var diameter ={
	sun: 10,
	mercury: 1,
	venus: 2,
	earth: 3,
	mars: 2,
	asteroid: 1,
	jupiter: 9,
	saturn:8,
	uranus:7,
	neptune:7,
	kuiper:1,
}
//color for orb to change to based on planets
var color ={
	sun: '#EA4D31',
	mercury: '#747474',
	venus: '#FADD5C',
	earth: '#24DAFF',
	mars: '#E86161',
	asteroid: '#DEDEDE',
	jupiter: '#F0C44D',
	saturn:'#BF9D3D',
	uranus:'#6EFFE0',
	neptune:'#6EBBFF',
	kuiper:'#DEDEDE',
}

/*************************************************************************************
	/																					  *																						  *
	/								ACTUAL EXECUTION HERE								  *
	/																					  *
	/*************************************************************************************/
$(".planet-links a").click(function()
	{
		var toThisDiv = event.target;
		console.log(toThisDiv, getLocationOf(toThisDiv));
		shift("#orb",getLocationOf(toThisDiv));
        event.preventDefault();
	});