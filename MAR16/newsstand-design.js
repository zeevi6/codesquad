// ==================================== Data

// Data

// press: "sbs",
// imgurl: "http://naver.com",
// articles: ["aaaa", "bbbb", "cccc"],
// pressIndex: 0,
// isSubbed: 1

// getPress() { return this.press; }
// getImgurl() { return this.imgurl; }
// getArticles() { return this.articles; }
// getPressIndex() { return this.pressIndex; }
// getIsSubbed() { return this.isSubbed; }
// setIsSubbed(isSubbed) { this.isSubbed = isSubbed; }

// END ==================================== Data


var dataObjs = {
    jsonObj: [],
    newsDataArr: []
}

var currentIndex = {
    contentTab: 0,
    contentArea: 0
}

var DOMElmnt = {
    scriptTemplate: getElem("#newsTemplate"),
    sectionContent: getElem(".content"),
    ulPressList: getElem("nav > ul"),
    divMoveLeft: getElem(".left"),
    divMoveRight: getElem(".right"),
    buttonUnsub: getElem("button")
}

// ==================================== LeftNavArea

var currentIndex = 0;

var leftNavObj = {
    selectPress: function(targetIndex) {
        currentIndex = targetIndex;
        updateContent(currentIndex);
    }
}

var leftNav = Object.assign(Object.create(leftNavObj), {
    ulPressList: getElem("nav > ul")
});

leftNav.selectPress(target);

// END ==================================== LeftNavArea


// ==================================== TopNavArea

// TopNavArea

// (클릭) 페이지 이동
function moveLeftRight(direction) {

    var targetIndex = currentIndex;

    while (1) {
        // 다음 인덱스 찾기
        if (direction === "R") { // 오른쪽 클릭
            // 마지막에서 오른쪽으로 가는 경우
            if (currentIndex === data.length) {
                targetIndex = 0;
            } else {
                targetIndex++;
            }
        } else if (direction === "L") { // 왼쪽 클릭
            // 0 에서 왼쪽으로 가는 경우
            if (currentIndex === 0) {
                targetIndex = data.length;
            } else {
                targetIndex--;
            }
        } else {
            console.log("*** unvalid direction " + direction);
        }

        // 다음 인덱스에서 구독상태인 경우에 loop 끝남 
        if (data[targetIndex].isSubbed === 1) {
            result = data[targetIndex];
            break;
        } else {
            continue;
        }
    }

    currentIndex = targetIndex;
    updateContent(currentIndex);

}

// (클릭) 뉴스/구독 전환
var contentAreaArr = ["news", "subscriptions"];
var currentContentAreaIndex = 0;

function toggleContentArea() {
    if (currentContentAreaIndex === 0) {
        currentContentAreaIndex = 1;
    } else {
        currentContentAreaIndex = 0;
    }
    updatePressList();
    updateContent(currentIndex);
}

// END ==================================== TopNavArea


// ==================================== ContentArea

// ContentArea

// // content 내용 출력
// printContent() {
//     updateContent(currentIndex);
// }

// (클릭) 구독취소
function unsubscribe() {
    data[currentIndex].setIsSubbed(0);
    currentIndex = 0; // 구독취소 후 첫페이지로 설정
    updatePressList();
    updateContent(currentIndex);
}

// END ==================================== ContentArea


// ==================================== Misc

// querySelector
function getElem(queryStr) {
    return document.querySelector(queryStr);
}
// addEventListener
function addEventLstnr(targetStr, targetFunction) {
    document.addEventListener(targetStr, targetFunction, false);
}

var verticalNav = getElem("nav > ul");
// nav 영역 출력
function updatePressList() {

    var tempLiStr = "";

    jsonObj.forEach(function(e, i) {
        tempLiStr += "<li>" + e.title + "</li>"; //jsonObj[i] --> e
    }, this);

    verticalNav.innerHTML = "";
    verticalNav.innerHTML = tempLiStr;

}

var template = getElem("#newsTemplate").innerHTML;
var sectionContent = getElem(".content");

// content 영역 출력
function updateContent(idx) {

    var liStrs = jsonObj[idx].newslist;
    var tempLiStr = "";
    liStrs.forEach(function(e, i) {
        tempLiStr += "<li>" + liStrs[i] + "</li>";
    }, this);

    template = template.replace(/{title}/, jsonObj[idx].title).replace(/{imgurl}/, jsonObj[idx].imgurl).replace(/{newsList}/, tempLiStr);

    sectionContent.innerHTML = template;
    currentIdx = idx;

}



// END ==================================== Misc

// ==================================== Init

// json value에 인덱스, 구독여부 추가한 newsData 생성하여 newsDataArr에 push

var newsObj = {
    getPress: function() {
        return this.press;
    },
    getImgurl: function() {
        return this.imgurl;
    },
    getArticles: function() {
        return this.articles;
    },
    getPressIndex: function() {
        return this.pressIndex;
    },
    getIsSubbed: function() {
        return this.isSubbed;
    },
    setIsSubbed: function(isSubbed) {
        this.isSubbed = isSubbed;
    }
}


function getXHR() {

    var req = new XMLHttpRequest();
    req.open('GET', 'data/newslist.json');
    req.send(null);
    req.addEventListener("load", function() {
        debugger;
        if (req.status == 200) {
            jsonObj = JSON.parse(req.responseText.replace(/\\'/g, "'"));
        } else {
            console.log("http status error");
        }
    })

}


function createNewsData() {

    // create newsData object and push to newsData array
    for (var i = 0; i < jsonObj.length; i++) {
        var newsData = Object.assign(Object.create(newsObj), {
            press: jsonObj[i].press,
            imgurl: jsonObj[i].imgurl,
            articles: jsonObj[i].articles,
            pressIndex: i,
            isSubbed: 1
        });
        newsDataArr.push(newsData);
    }

}


// new newsDataArr
var newsDataArr = [];

// get ajax response
var jsonObj = [];

function init() {

    // 뉴스 데이터 생성
    if (!jsonObj) {
        console.log("getXHR() return value : \n" + jsonObj);
    } else {
        createNewsData();
    }

    // DOM element 생성

    // 이벤트 추가

    // 좌측 리스트 출력

    // 첫페이지 출력

}
getXHR();


// END ==================================== Init