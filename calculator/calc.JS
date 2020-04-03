// Basic Operator Functions
function add(x, y) {
    return Number(x) + Number(y);
}
function sub(x, y) {
    return Number(x) - Number(y);
}
function mult(x, y) {
    return Number(x) * Number(y);
}
function div(x, y) {
    if (Number(y) === 0) { 
        return "can't div by 0";
    } else {
        return Number(x) / Number(y);}
}

function operate([x, op, y]) {
    let output = 0;
    switch (op) {
        case '+':
            output = add(x, y);
            break;
        case '-':
            output = sub(x, y);
            break;
        case "x":
            output = mult(x, y);
            break;
        case "/":
            output = div(x, y);
            break;
    }
    if (Number.isInteger(output)) {
        return output;
    } else {
        return output.toFixed(3);
    }
}

function decons(str) {
    return str.split(" ");
}

function clearTop() {
    document.getElementById("top").textContent = "";
}

function clearBot() {
    document.getElementById("bot").textContent = "";
}

function validExp(str) {
    let fullExp = /(-?[.\d]{1,9})\s[x+/-]\s-?[.\d]{1,9}/
    return fullExp.test(str);
}
function topEmpt() {
    return document.getElementById("top").textContent.length === 0;
}

function botEmpt() {
    return document.getElementById("bot").textContent.length === 0;
}

function dispHalfFull () {
    let top = document.getElementById("top").textContent;
    let bot = document.getElementById("bot").textContent;
    let fullExp = /(-?[.\d]{1,9})\s[x+/-]\s-?[.\d]{1,9}/
/*     console.log("dhf", top,bot); */
    return (fullExp.test(top) && bot === "");
}

function dispFull() {
    let top = document.getElementById("top").textContent;
    let bot = document.getElementById("bot").textContent;
    let fullExp = /(-?[.\d]{1,9})\s[x+/-]\s-?[.\d]{1,9}/
/*     console.log("df", top,bot); */
    return (fullExp.test(top) && operate(decons(top)) == Number(bot));
}
let curRes = 0;
var opReg = /[x+/-]/;

//Event listeners for digits
let numbers = [...document.querySelectorAll(".input")];
numbers.forEach(each => each.addEventListener("click", function () { 
    var top = document.getElementById("top");
    //limit to 9 digits
    console.log(topEmpt(), botEmpt());
    if (topEmpt() && !botEmpt()) {
        clearBot();
    }
    if ((top.textContent.length > 8 && !opReg.test(top.textContent)) || (top.textContent.length > 20)) {
        return false;
    }
    top.textContent += each.id;
})); 

//Event listeners for operators
let ops = [...document.querySelectorAll(".operator")];
ops.forEach(each => each.addEventListener("click", function() {
    var top = document.getElementById("top");
    var bot = document.getElementById("bot");

    if (validExp(top.textContent)) {
        result = operate(decons(top.textContent));
        top.textContent = result + ` ${each.id} `;
        bot.textContent = result;
    } else if (topEmpt() && !botEmpt() ) {
        top.textContent = bot.textContent + ` ${each.id} `;
        clearBot();
    }else if (top.textContent.length > 0 && !Number.isNaN(Number(top.textContent ))) {
        console.log("opAdd", top.textContent)
        top.textContent += ` ${each.id} `;
    } else {
        return false;
    }
}));
//Event listener for clear button
let clear = document.getElementById("clear");
clear.addEventListener("click", function () {
    clearBot();
    clearTop();
});

//Event listener for equal button
let equals = document.getElementById("equals");
equals.addEventListener("click", function () {
    let top = document.getElementById("top");
    let bot = document.getElementById("bot");
    let opString = top.textContent;

    if (validExp(top.textContent) && botEmpt()) {
        console.log(dispHalfFull());
        bot.textContent = operate(decons(opString));
        curExp = opString;
        clearTop();
    } else if (validExp(top.textContent) && !botEmpt()) {
        
    } else if (topEmpt() && !botEmpt()) {
        console.log(curExp);
        let recalc = decons(curExp).reverse();
        recalc[2] = bot.textContent;
        recalc = recalc.join(" ");
        console.log(recalc);
        bot.textContent = operate(decons(recalc));
    }

})