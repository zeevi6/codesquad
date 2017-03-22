function deleteClass (input) {
	var divs = document.querySelectorAll("div");
	var regex = new RegExp("[a-zA-Z0-9]*"+input+"[a-zA-Z0-9]*", "g");
	for(var i=0; i<divs.length; i++) {
		divs[i].className = divs[i].className.replace(regex, "");
	}
	console.log("deleted classes containing "+input);
}

deleteClass("-");
deleteClass("_");
