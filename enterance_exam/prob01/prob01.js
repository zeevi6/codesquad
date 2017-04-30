
function to1240(num) {
    
    var strOutput = "";
    var arrOutput = [];
    
    var m = -1;
    var digit = 0;
    
    for(i = num; i > 0; i = Math.floor(i/4)) {
        digit = i%4;
        if(digit === 3) {
            digit = 4;
        }
        arrOutput.push(digit);
        m = m + 1;
    }
    
    for(j = m; j >= 0; j--) {
        strOutput += arrOutput[j];
    }

    return strOutput;
    
}

function toDec(str) {
    
    var numOutput = 0; 
    var arrNum = str.replace("\"","").split('').map(Number);
    
    arrNum.forEach(function(item, i) {
        if(item === 4) arrNum[i]=3
    });
    
    var length = arrNum.length;
    var digit = 0;
    
    for(i=0; i < length; i++) {
        numOutput += Math.pow(4, length-i-1) * arrNum[i];
    }

    return numOutput;
    
}