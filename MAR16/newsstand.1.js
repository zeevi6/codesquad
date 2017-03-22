var dataObj = {
    createNewsData: function(jsonDatas) {
        for (let i = 0; i < jsonDatas.length; i++) {
            var newsData = Object.assign(Object.create(null), {
                press: jsonDatas[i].title,
                imgurl: jsonDatas[i].imgurl,
                article: jsonDatas[i].newslist,
                pressIndex: i,
                isSubbed: 1
            });
            this.news.push(newsData);
        }
    },
    updateSubscribedNews: function() {
        this.subscribedNews = [];
        for (let i = 0; i < this.news.length; i++) {
            if (this.news[i].isSubbed === 1) {
                this.subscribedNews.push(this.news[i]);
            }
        }
    }
}
var data = Object.assign(Object.create(dataObj), {
    news: [],
    subscribedNews: []
});

//ajax 콜백함수
function reqListener() {
    let jsonDatas = JSON.parse(this.responseText);
    data.createNewsData(jsonDatas);
    data.updateSubscribedNews();
}

var utility = {
    runAjax: function(reqListener, method, url) {
        var oReq = new XMLHttpRequest();
        //reqListener 제일 마지막에 실행된다.
        oReq.addEventListener("load", reqListener);
        oReq.open(method, url);
        oReq.send();
    }
};

var $ = function(target) { return document.querySelector(target) };

document.addEventListener("DOMContentLoaded", utility.runAjax(reqListener, "GET", "./data/newslist.json"));