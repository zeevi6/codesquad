function countSections () {
	var sections = document.querySelectorAll("section");
	var cnt = 0;
	for(var i=0; i<sections.length; i++) {
		if(sections[i].className.indexOf("-") != -1 || sections[i].className.indexOf("_") != -1) cnt++;
	}
	console.log(cnt);
}

countSections();