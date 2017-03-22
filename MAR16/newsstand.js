// MISC

function getElem(str) {
    return document.querySelector(str);
}


// ############################################ DATA (json, news)

function News(data, i) {
    this.press = data.title;
    this.imgurl = data.imgurl;
    this.article = data.newslist;
    this.pressIndex = i;
    this.isSubbed = 1;
}

var dataObj = {
    getXHR: function() {
        var req = new XMLHttpRequest();

        req.open('GET', 'data/newslist.json');
        req.send(null);
        req.addEventListener("load", function() {
            if (req.status == 200) {
                this.json = JSON.parse(req.responseText);
            } else {
                console.log("http status error");
            }
        })
    },
    createNewsData: function() {
        // create newsData object and push to newsData 
        for (var i = 0; i < this.json.length; i++) {


            var newsData = new News(this.json[i], i);
            this.news.push(newsData);
        }
    }
}

var data = Object.assign(Object.create(dataObj), {
    json: [],
    news: []
});

// ############################################ VIEW INDEX

var indexObj = {
    incCurrentIdx: function(length) {
        var curr = this.currentContent;
        if (curr === (length - 1)) {
            curr = 0;
        } else {
            curr++;
        }
        this.currentContentIdx = curr;
    },
    decCurrentIdx: function(length) {
        var curr = this.currentContent;
        if (curr === 0) {
            curr = length;
        } else {
            curr--;
        }
        this.currentContentIdx = curr;
    },

}

var index = Object.assign(Object.create(indexObj), {
    currentTab: 0,
    currentContent: 0
});

// ########################################################################################
// ########################################################################################


// ############################################ VIEW LEFT NAV
var leftNavObj = {
    getIndexOfClickedLi: function(clickedLi) {

        // currentIndex = Array.prototype.indexOf.call(this.parent.children, this)
        // http://stackoverflow.com/questions/17167628/problems-with-array-prototype-indexof-call

        var parentUl = this.ulPress;
        var result = -1;

        parentUl.forEach(function(e, i) {
            var currentLi = getElem("ul#parent li:eq(" + i + ")");
            if (currentLi === clickedLi) {
                result = i;
            }
        }, this); //this 가 무엇일까?

        return result;
    },
    selectPress: function(targetIdx) {
        contentArea.updateContent(targetIdx);
    },
    updatePressList: function() {
        debugger;
        this.ulPress.innerHTML = "";
        var tempLiStr = "";

        data.news.forEach(function(e, i) {
            if (data.news[i].isSubbed === 1) {
                tempLiStr += "<li>" + e.press + "</li>"; //jsonObj[i] --> e
            }
        }, this);

        var newFrontIdx = 0;
        var flag_isFound = false;

        data.news.some(function(e, i) {
            if (data.news[i].isSubbed === 1) {
                if (!flag_isFound) {
                    flag_isFound = true;
                    newFrontIdx = i;
                }
            }
        })

        index.currentContent = newFrontIdx;

        this.ulPress.innerHTML = tempLiStr;
    }
}

var leftNav = Object.assign(Object.create(leftNavObj), {
    ulPress: getElem("nav > ul"),
    liPress: getElem("nav > ul").children
});

// ############################################ VIEW TOP NAV
var topNavObj = {
    moveLeftRight: function(direction) {
        // find length of subbed

        var subbedCnt;
        for (let i = 0; i < data.news.length; i++) {
            if (data.news[i].isSubbed === 1) {
                subbedCnt++;
            }
        }
        while (true) {
            if (direction === "R") {
                index.incCurrentIdx(subbedCnt);
            } else if (direction === "L") {
                index.decCurrentIdx(subbedCnt);
            }
            // 다음 인덱스에서 구독상태인 경우에 loop 끝남 
            var currentNews = data.news[index.currentContent];
            if (currentNews.isSubbed === 1) {
                break;
            } else {
                continue;
            }
        }
        contentArea.updateContent(index.currentContent);
    }
}

var topNav = Object.assign(Object.create(topNavObj), {
    divMoveLeft: getElem(".left"),
    divMoveRight: getElem(".right")
});

// ############################################ VIEW CONTENT

var contentAreaObj = {
    unsub: function() {
        debugger;
        var idx = index.currentContent;
        data.news[idx].isSubbed = 0;


        var newFrontIdx = 0;
        var flag_isFound = false;
        //var isFound = false;

        data.news.some(function(e, i) {
            if (data.news[i].isSubbed === 1) {
                if (!flag_isFound) {
                    flag_isFound = true;
                    newFrontIdx = i;
                }
            }
        })

        index.currentContent = newFrontIdx;
        leftNav.updatePressList();
        this.updateContent(idx);
    },
    updateContent: function(idx) {
        var liStrs = data.news[idx].article;
        var tempLiStr = "";

        liStrs.forEach(function(e, i) {
            tempLiStr += "<li>" + e + "</li>";
        }, this);

        this.sectionContent.innerHTML = this.scriptTemplate.innerHTML.replace(/{title}/, data.news[idx].press).replace(/{imgurl}/, data.news[idx].imgurl).replace(/{newsList}/, tempLiStr);
        debugger;
        this.buttonUnsub = getElem("button");
        this.buttonUnsub.addEventListener("click", function() {
            contentArea.unsub();
            // leftNav.updatePressList();
            // contentArea.updateContent(index.currentContent);
        });
    }
}

var contentArea = Object.assign(Object.create(contentAreaObj), {
    scriptTemplate: getElem("#newsTemplate"),
    sectionContent: getElem(".content"),
    buttonUnsub: getElem("button")
});


// ############################################ ADD EVENT

function addEvent() {

    for (let i = 0; i < leftNav.liPress.length; i++) {
        leftNav.liPress[i].addEventListener("click", function() {
            contentArea.updateContent(i);
        });
    }
    contentArea.buttonUnsub.addEventListener("click", function() {
        contentArea.unsub();
        // leftNav.updatePressList();
        // contentArea.updateContent(index.currentContent);
    });
    topNav.divMoveLeft.addEventListener("click", function() {
        topNav.moveLeftRight("L");
    });
    topNav.divMoveRight.addEventListener("click", function() {
        topNav.moveLeftRight("R");
    });
}


// ############################################ INIT

function init() {
    // get data
    data.getXHR();
    data.createNewsData();

    // init leftNav and contentArea
    leftNav.updatePressList();
    contentArea.updateContent(0);

    // debugger;
    // add events
    addEvent();
}

document.addEventListener("DOMContentLoaded", init, false);