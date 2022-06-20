//function to store values from the html to be used by the new page that is opened
function OpenPageWithData(type,pageTitle){
	sessionStorage.setItem("type", type);
	sessionStorage.setItem("pageTitle", pageTitle);
	window.open("./bingo.html","_self");
}