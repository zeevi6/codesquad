var $ = function(target) { return document.querySelector(target) };
var $all = function(target) { return document.querySelectorAll(target) };

document.addEventListener("DOMContentLoaded", function() {

    $('input').value = $all('nav>ul>li')[0].innerText;
    var buttonlist = $all('button');

    for (let i = 0; i < buttonlist.length; i++) {
        buttonlist[i].addEventListener('click', function() {
            var input = $('input').value;
            var data = JSON.stringify({
                'press': input
            });
            var url = "http://127.0.0.1:3000/unsub";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            xhr.addEventListener('load', function() {
                console.log(xhr.responseText);
            })
            location.href = 'http://127.0.0.1:3000/newslist';
        });
    }

    $('.right').addEventListener('click', function() {

        var currentIndex = $('.currentPage').innerText - 1;
        var pageCount = $('.pageCount').innerText;

        currentIndex++;

        if (currentIndex > pageCount - 1) {
            currentIndex = 0;
        }

        modifyView(currentIndex);

    });

    $('.left').addEventListener('click', function() {

        var currentIndex = $('.currentPage').innerText - 1;
        var pageCount = $('.pageCount').innerText;

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = pageCount - 1;
        }

        modifyView(currentIndex);

    });

})


var presslist = $('nav>ul').children;

for (let i = 0; i < presslist.length; i++) {
    presslist[i].addEventListener('click', function() {
        modifyView(i);
    })
}

function toggleClass(targetIndex) {

    var content = $all('.content');
    var list = $all('nav>ul>li');

    for (let i = 0; i < content.length; i++) {
        if (i !== targetIndex) {
            content[i].className = "content hide";
            list[i].className = "plain";
        } else {
            content[i].className = "content show";
            list[i].className = "bold";
        }
    }
}

function updateFormInputValue(targetIndex) {
    var press = $all('nav>ul>li')[targetIndex].innerText;
    $('input').value = press;
}

function updatePageNumber(targetIndex) {
    $('.currentPage').innerText = targetIndex + 1;
}

function modifyView(i) {
    toggleClass(i);
    updateFormInputValue(i);
    updatePageNumber(i);
}