function countWithTest () {
    var cnt = 0;
	var divs = document.querySelectorAll("div");
	var regex = new RegExp("[a-zA-Z0-9_-]*", "g");
    for(var i=0; i<divs.length; i++) {
		if(regex.test(divs[i].className)) {
            cnt++;
        }
    }
	console.log(cnt);
}

countWithTest();