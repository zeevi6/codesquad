var todoObj = {
  showtask : function () {
    var printStr = "";
    printStr+="[todo]\n";
    for(var i=0; i<this.task.length; i++){
        printStr+=this.task[i]+"\n";
    }
    printStr+="\n[complete]\n";
    for(var j=0; j<this.complete.length; j++){
        printStr+=this.complete[j]+"\n";
    }
    console.log(printStr);
  },
  addtask : function (item) {
      this.task.push(item);
      console.log("new task - "+item);
  },
  comptask : function (item) {
      this.complete.push(item);
      var itemIndex = this.task.indexOf(item);
      if(itemIndex === -1) {
          console.log("no such task..");
      } else {
          this.task.splice(itemIndex, 1);
          console.log("task complete - "+item);
      }
  }
}

var todolist = {
    task : [],
    complete : []
}

Object.setPrototypeOf(todolist, todoObj);

// todolist.addtask("111");
// todolist.addtask("222");
// todolist.showtask();
// todolist.comptask("222");
// todolist.showtask();
