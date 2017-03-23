function handler() {
    console.log(this);
}

document.body.addEventListener('click', function() {
    handler();
})

// ???? next

name = "window....."

var t1 = {
    getName: function(a, b) {
        console.log("ab -> ", a, b);
        return this.name;
    }
}

var t2 = {
    name: "hong",
    printName: function() {
        // console.log(t1.getName());  // undefined
        // console.log(t1.getName.call(this, "ddd", "aaa"));
        // console.log(t1.getName.apply(this, ["ddd", "aaa"]));
        console.log(t1.getName.apply(window, ["ddd", "aaa"]));
    }
}

t2.printName();

// ???? next

var h = {
    name: "ddddd",
    log: function() {
        console.log(this.name);
    }
}

var o = {
    run: function() {
        // document.querySelector("#header").addEventListener('click', h.log.bind(this));
        document.querySelector("#header").addEventListener('click', h.log(o));
    }
}

o.run();

// ???? next

this.other(); // ?????????????????????
// XHR Breakpoints => *