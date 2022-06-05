var winners = {//note all values in this dictionary match ids in the html
    "row1": ['a1','b1','c1','d1','e1'],
    "row2": ['a2','b2','c2','d2','e2'],
    "row3": ['a3','b3','c3','d3','e3'],
    "row4": ['a4','b4','c4','d4','e4'],
    "row5": ['a5','b5','c5','d5','e5'],
    "column1": ['a1','a2','a3','a4','a5'],
    "column2": ['b1','b2','b3','b4','b5'],
    "column3": ['c1','c2','c3','c4','c5'],
    "column4": ['d1','d2','d3','d4','d5'],
    "column5": ['e1','e2','e3','e4','e5'],
    "topLeftBottomRight": ['a1','b2','c3','d4','e5'],
    "topRightBottomLeft": ['a5','b4','c3','d2','e1']
}

const QueryString = window.location.search;
const urlParams = new URLSearchParams(QueryString);
var path = "assets/"+urlParams.get('type')+"/";
document.getElementById("title").innerHTML = urlParams.get('title');

var selected = [];//list of ids for all clicked cells
function display(object){
	object.style.display = 'block';
}
function hide(object){
	object.style.display = '';
}
function toggleDisplay(object){
	if(object.style.display === '')
	{
		display(object);
		return true;
	}else{
		hide(object);
		return false;
	}
}
function toggle(id) {
	var marker = document.getElementById(id);
	var displayed = toggleDisplay(marker);
	if(displayed){
		selected.push(id);
	}else{
		var index = selected.findIndex(v => v === id);
		selected.splice(index,1);
	}
	bingoCount()
}
function bingoCount() {
	var bingos = 0;
	for(let key in winners)
	{
		var marker = document.getElementById(key);
		var contains = winners[key].every(element => {
			return selected.indexOf(element) !== -1;
		});
		if(contains){
			bingos=bingos+1;
			display(marker);
		}else{
			hide(marker);
		}
	}
	var bingoTotal = document.getElementById("bingos");
	bingoTotal.innerHTML = bingos;
}

window.onload = function load() {
	var goals = document.getElementsByClassName("goal");
	for(goal in goals){
		goals[goal].src =path+goal+".png"
	}
	var markers = document.getElementsByClassName("marker");
	for(marker in markers){
		markers[marker].src = path+"marked.png";
	}
	var columns = document.getElementsByClassName("column");
	for(column in columns){
		columns[column].src = path+"column.png";
	}
	var rows = document.getElementsByClassName("row");
	for(row in rows){
		rows[row].src = path+"row.png";
	}
	var topLeftBottomRight = document.getElementById("topLeftBottomRight");
	topLeftBottomRight.src =path+"topLeftBottomRight.png";
	var topRightBottomLeft = document.getElementById("topRightBottomLeft");
	topRightBottomLeft.src =path+"topRightBottomLeft.png";
}