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
        return "div by 0!";
    } else {
        return Number(x) / Number(y);}
}

function operate([x, op, y]) {
    let output, dec;
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
    dec = String(output.toFixed(3)); //round any potential float
    outputStr = String(output);
    if (/\./.test(outputStr) && dec.length <= 13) {
        return dec;
    }
    else if (outputStr.length > 13) {
        return "out of range";
    } else {
        return output;
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

function topEmpt() {
    return document.getElementById("top").textContent.length === 0;
}

function botEmpt() {
    return document.getElementById("bot").textContent.length === 0;
}

function validExp(str) {
    let fullExp = /(-?[\.\d]{1,9})\s[x+/-]\s-?[\.\d]{1,9}/
    return fullExp.test(str);
}

function hasOper(str) {
    let opReg = /[x+/-]/;
    return opReg.test(str);
}

function hasDigits(str) {
    if (str === ".") {
        return false;
    }
    let digReg = /[\.\d]{1,9}/;
    return digReg.test(str);
}

function digitHandler(e) { 
    //"click" data = "this" element id
    //"event" data = event.key
    let data = "";
    if (e.type === "click") {
        data = this.id;
    } 
    else if (e.type === "keydown" && /[0-9]/.test(e.key)) {
        data = e.key;
    } else {
        return false;
    }

    let top = document.getElementById("top");
    let opExp = decons(top.textContent);

    //new digit clears old calculated values
    if (topEmpt() && !botEmpt()) {
        clearBot();
    }
    //limit operand to 9 char
    if ((opExp[0].length > 8 && !hasOper(opExp[1])) || (opExp[2] && opExp[2].length == 9)) {
        return false;
    }
    top.textContent += data;
}

function dotHandler(e) {
    //"click" data = "this" element id
    //"event" data = event.key

    let data = "";
    if (e.type === "click") {
        data = this.id;
    } 
    else if (e.type === "keydown" && e.key ===".") {
        data = e.key;
    } else {
        return false;
    }

    let top = document.getElementById("top");
    let opExp = decons(top.textContent);

    //new digit clears calculated value
    if (topEmpt() && !botEmpt()) {
        clearBot();
    }
    //character limit
    if ((opExp[0].length > 8 && !hasOper(opExp[1])) || (opExp[2] && opExp[2].length === 9)) {
        return false;
    } 
    //limit one decimal point per operand
    else if (/\./.test(opExp[0]) && !hasOper(opExp[1]) || (opExp[2] && /\./.test(opExp[2]))) {
        return false;
    }
    top.textContent += data;
}

function opHandler(e) {
    //"click" data = "this" element id
    //"event" data = event.key
    let data = "";
    if (e.type === "click") {
        data = this.id;
    } 
    else if (e.type === "keydown" && /[x/+-]/.test(e.key)) {
        data = e.key;
    } else {
        return false;
    }

    let top = document.getElementById("top");
    let bot = document.getElementById("bot");
    let opExp = decons(top.textContent);

    if (validExp(top.textContent)) {
        result = operate(decons(top.textContent));
        top.textContent = result + ` ${data} `;
    } else if (topEmpt() && !botEmpt() ) {
        top.textContent = bot.textContent + ` ${data} `;
        clearBot();
    } else if (hasDigits(opExp[0]) && !hasOper(opExp[1])) {
        top.textContent += ` ${data} `;
    } else {
        return false;
    }
}

function delHandler(e) {
    //"click" data = "this" element id
    //"event" data = event.key
    let data = "";
    if (e.type === "click") {
        data = this.id;
    } 
    else if (e.type === "keydown" && e.key === "Backspace") {
        data = e.key;
    } else {
        return false;
    }

    let top = document.getElementById("top");
    let opString = top.textContent;
    let opExp = decons(top.textContent);

    if (opString.length > 0 && !hasOper(opExp[1]) || (hasOper(opExp[1]) && opExp[2].length > 0)) {
        top.textContent = opString.slice(0,-1);
    } else if (hasOper(opExp[1]) && opExp[2].length === 0) {
        top.textContent = opString.slice(0,-3);
    } else {
        return false;
    } 
}

function equalHandler(e) {
    let top = document.getElementById("top");
    let bot = document.getElementById("bot");
    let opString = top.textContent;

    if (validExp(top.textContent)) {
        bot.textContent = operate(decons(opString));
        curExp = opString;
        clearTop();
    } else if (topEmpt() && !botEmpt()) {
        let recalc = decons(curExp);
        recalc[0] = bot.textContent;
        recalc = curExp = recalc.join(" ");
        bot.textContent = operate(decons(recalc));
    }
}

//Event listeners for digit buttons
let numbers = [...document.querySelectorAll(".input")];
numbers.forEach(each => each.addEventListener("click", digitHandler));
document.addEventListener("keydown", digitHandler);

//Event listeners for decimal button
let dot = document.querySelector(".decimal");
dot.addEventListener("click", dotHandler);
document.addEventListener("keydown", dotHandler);

//Event listeners for operator buttons
let ops = [...document.querySelectorAll(".operator")];
ops.forEach(each => each.addEventListener("click", opHandler));
document.addEventListener("keydown", opHandler);

//Event listener for clear button
let clear = document.getElementById("clear");
clear.addEventListener("click", function () {
    clearBot();
    clearTop();
});

//Event listener for backspace button
let backSpace = document.getElementById("delete");
backSpace.addEventListener("click", delHandler);
document.addEventListener("keydown", delHandler);

//Event listener for +/- sign button
let posNeg = document.getElementById("sign");
posNeg.addEventListener("click", function () {
    let top = document.getElementById("top");
    let bot = document.getElementById("bot");
    let opExp = decons(top.textContent);

    //flip sign first operand
    if (hasDigits(opExp[0]) && !hasOper(opExp[1]) && botEmpt()) {
        top.textContent = -Number(top.textContent);
    } 
    //flip sign of second operand
    else if (validExp(top.textContent) && botEmpt()) {
        opExp[2] = -opExp[2];
        top.textContent = opExp.join(" ");
    } 
    //flip sign of result
    else if (topEmpt() && !botEmpt()) {
        bot.textContent = -Number(bot.textContent);
    } else {
        return false;
    }
})

//Event listener for equal button
let equals = document.getElementById("equals");
equals.addEventListener("click", equalHandler);
document.addEventListener("keydown", function (e) {
    if(/=/.test(e.key)) {
        console.log("if", e.key)
        equalHandler(e);}
    });