function countDivs () {
	var divs = document.querySelectorAll("div");
	var cnt = 0;
	for(var i=0; i<divs.length; i++) {
		if(divs[i].className.indexOf("-") != -1 || divs[i].className.indexOf("_") != -1) cnt++;
	}
	console.log(cnt);
}

countDivs();