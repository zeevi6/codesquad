var $ = function(target) { return document.querySelector(target) };
var $all = function(target) { return document.querySelectorAll(target) };

document.addEventListener("DOMContentLoaded", function() {

    var addSub = $all('.addSub');
    var removeSub = $all('.removeSub');
    var selectedItem = $all('.item');

    for (let i = 0; i < selectedItem.length; i++) {
        addSub[i].addEventListener('click', function() {
            var input = selectedItem[i].value;
            var data = JSON.stringify({
                'press': input
            });
            var url = "http://127.0.0.1:3000/addsub";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            xhr.addEventListener('load', function() {
                console.log(xhr.responseText);
            });
            // location.href = 'http://127.0.0.1:3000/newslist';
        });
        removeSub[i].addEventListener('click', function() {
            var input = selectedItem[i].value;
            var data = JSON.stringify({
                'press': input
            });
            var url = "http://127.0.0.1:3000/removesub";
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
            xhr.addEventListener('load', function() {
                console.log(xhr.responseText);
            });
            // location.href = 'http://127.0.0.1:3000/newslist';
        });
    }

});