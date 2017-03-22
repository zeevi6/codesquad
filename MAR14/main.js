document.addEventListener("DOMContentLoaded", xhr, false);
var currrentIdx = 0;

function xhr() {
    var req = new XMLHttpRequest();
    req.open('GET', 'data/newslist.json');
    req.send(null);
    req.addEventListener("load", function() {
        if (req.status == 200) {
            var jsonObj = JSON.parse(req.responseText.replace(/\\'/g, "'"));

            // 화면 초기화
            updateList(jsonObj);
            updateContent(jsonObj, 0);

            // 이벤트들..
            var navItems = document.querySelector("nav > ul").children;

            for (var i = 0; i < navItems.length; i++) {
                navItems[i].addEventListener("click", updateContent.bind(null, jsonObj, i));
            }

            var unsubBtn = document.querySelector("button");

            jsonObj = unsubBtn.addEventListener("click", unsub.bind(null, jsonObj, currentIdx));

            var arrowLeft = document.querySelector("div.left");
            var arrowRight = document.querySelector("div.right");

            arrowLeft.addEventListener("click", moveLR.bind(null, jsonObj, "L", currrentIdx));
            arrowRight.addEventListener("click", moveLR.bind(null, jsonObj, "R", currrentIdx));


        } else {
            console.log("http status error");
        }
    })
}

function unsub(jsonObj, idx) {
    if (jsonObj.length > 0) {
        jsonObj = jsonObj.filter(function(x) { return x.title !== jsonObj[idx].title });
        updateList(jsonObj);
        updateContent(jsonObj, 0);
    }
    return jsonObj;
}

function moveLR(jsonObj, direction, idx) {
    if (idx == jsonObj.length - 1) {
        if (direction == "R") {
            idx = 0;
        } else {
            idx--;
        }
    }
    if (idx == 0) {
        if (direction == "L") {
            idx = jsonObj.length - 1;
        } else {
            idx++;
        }
    }
    updateContent(jsonObj, idx);
}

function updateList(jsonObj) {
    var verticalNav = document.querySelector("nav > ul");
    verticalNav.innerHTML = "";
    jsonObj.forEach(function(e, i) {
        verticalNav.innerHTML += "<li>" + e.title + "</li>"; //jsonObj[i] --> e
    }, this);
}

function updateContent(jsonObj, idx) {
    var template = document.querySelector("#newsTemplate").innerHTML;
    var sectionContent = document.querySelector(".content");

    template = template.replace(/{title}/, jsonObj[idx].title);
    template = template.replace(/{imgurl}/, jsonObj[idx].imgurl);

    var liStrs = jsonObj[idx].newslist;

    // newsList.innerHTML = "";
    var tempLiStr = "";
    liStrs.forEach(function(e, i) {
        tempLiStr += "<li>" + liStrs[i] + "</li>";
    }, this);
    template = template.replace(/{newsList}/, tempLiStr);

    currentIdx = idx;
    sectionContent.innerHTML = template;
}