//disables enter key from working on the page as nef was accedentally toggling stuff by pressing it
window.addEventListener('keypress', function (e) {
	if (e.keyCode === 13 || e.which === 13) {
		e.preventDefault();
		return false;
	}
});

//dictionary listing all possible bingos based on id values in the html
var winners = {};
fetch("winners.json").then(response => {
	return response.json();
}).then(jsondata => winners = jsondata);

var path = "assets/"+sessionStorage.getItem('type')+"/";
var title = sessionStorage.getItem('pageTitle');
document.getElementById("title").innerHTML = title;

//sets the display property of the given marker to block which makes it visible
function display(object){
	object.style.display = 'block';
}

//sets the display property of the given marker to '' which makes it invisible
function hide(object){
	object.style.display = '';
}

//function used by the buttons on the html itself to toggle their corrisponding markers
function toggle(id) {
	//get the marker for the clicked button
	var marker = document.getElementById(id);
	//if marker is hidden make it visible otherwise hide it
	if(marker.style.display === '')
	{
		display(marker);
	}else{
		hide(marker);
	}
	
	//call the method that updates the bingo count and displays the diagonal/vertical/horizontal markers for each bingo
	updateBingos()
}

//called to update the bingo count on the page this currently also handles the show/hide of diagonal/vertical/horizontal markers for the bingos
function updateBingos() {
	//start by assuming no bingos
	var bingos = 0;
	
	//loop over all possible winning bingo combinations
	for(let key in winners)
	{
		//store a boolean of whether all nessesary markers are visible for it to be a bingo
		var contains = winners[key].every(element => {
			return document.getElementById(element).style.display === 'block';
		});
		
		//get the diagonal/vertical/horizontal marker for the current index of possible winning bingo combinations
		var marker = document.getElementById(key);

		//if all nessesary markers were clicked for it to be a bingo add 1 to the bingo count 
		//and also display the diagonal/vertical/horizontal marker for that bingo
		//if they were not all visible hide the diagonal/vertical/horizontal marker corrisponding to that bingo instead
		if(contains){
			bingos=bingos+1;
			display(marker);
		}else{
			hide(marker);
		}
	}
	//get the element from the html that displays the bingo count
	var bingoTotal = document.getElementById("bingos");
	//set the bingo count display on the html
	bingoTotal.innerHTML = bingos;
}

//when the page loads
window.onload = function load() {
	//statically places all the goal icons in their respective locations
	var goals = document.getElementsByClassName("goal");
	for(goal in goals){
		goals[goal].src =path+goal+".png"
	}
	
	//places the marked icons on their respective location
	var markers = document.getElementsByClassName("marker");
	for(marker in markers){
		markers[marker].src = path+"marked.png";
	}
	
	//places the colum icons where they need to be
	var columns = document.getElementsByClassName("column");
	for(column in columns){
		columns[column].src = path+"column.png";
	}
	
	//places the row icons where they need to be
	var rows = document.getElementsByClassName("row");
	for(row in rows){
		rows[row].src = path+"row.png";
	}
	
	//places one of the diagonal icons where it needs to be
	var topLeftBottomRight = document.getElementById("topLeftBottomRight");
	topLeftBottomRight.src =path+"topLeftBottomRight.png";

	//places the other diagonal icons where it needs to be
	var topRightBottomLeft = document.getElementById("topRightBottomLeft");
	topRightBottomLeft.src =path+"topRightBottomLeft.png";
}