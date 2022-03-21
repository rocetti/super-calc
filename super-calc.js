//This calc works each operation at a time so we just need to store the current operation 
let calcs = [];
let isFirstNum = true;
let isWritingFloat = false;
start_new_calc();
//On key entered, if its one of the operators grab the num before it as first num after executing any remaining calcs 
//(this makes the calc work on subsequent operations without the need to press the = button)

//On button click act based on class
function button_clicked(button) {
    let buttonClass = button.className;
        switch (buttonClass) {
            case "number":
                set_number(button.value);
                break;
            case "operand":
                set_operand(button.value)
                break;
            case "clear":
                switch (button.value) {
                    case "c":
                        clean_calc();
                        break;
                    case "ce":
                        clean_everything();
                        break;
                    case "back":
                        clean_char();
                        break;
                
                    default:
                        break;
                }
                break;
        
            default:
                break;
        }
}
//Write numbers
function set_number(n) {
    let curr_calc = calcs[calcs.length-1];
    if (isFirstNum) {
        curr_calc.firstNum += n;
    }else{
        curr_calc.secondNum += n;
    }
    update_display();
}
//Write operands and execute previous calc operands if any
function set_operand(o) {
    let curr_calc = calcs[calcs.length-1];
    //operand special cases
    switch (o) {
        case "!":
            if (isFirstNum) {
                curr_calc.operand = o;
                calculate(curr_calc);
            }else{
                calculate(curr_calc);
                let new_calc = calcs[calcs.length-1];
                new_calc.operand = o;
                calculate(new_calc);
            }
            return;
        case ".":
            if (isWritingFloat) {
                return;
            }
            set_number(o);
            isWritingFloat = true;
            return;
        case "=":
            calculate(curr_calc);
            return;
        default:
            break;
    }
    //if was writing first num end it and write operand
    //else consider the end of second num and calculate
    if (isFirstNum) {
        curr_calc.operand = o;
        update_display();
        isFirstNum = false;
        isWritingFloat = false;
    } else {
        calculate(curr_calc);
        let new_calc = calcs[calcs.length-1];
        new_calc.firstNum = curr_calc.result;
        new_calc.operand = o;
        update_display();
        isFirstNum = false;
        isWritingFloat = false;
    }
}
//Clearing calcs
//clean the current calc
function clean_calc() {
    let curr_calc = calcs[calcs.length - 1];
    curr_calc.firstNum = "";
    curr_calc.operand = "";
    curr_calc.secondNum = "";
    curr_calc.result = "";
    isFirstNum = true;
    isWritingFloat = false;
    update_display();
}
//clean all calcs
function clean_everything() {
    document.getElementById("history").innerHTML = "";
    calcs = [];
    start_new_calc();
    update_history_display();
}
//clean the last inserted character in current calc
function clean_char() {
    let curr_calc = calcs[calcs.length - 1];
    if (curr_calc.secondNum.toString() != "") {
        if (curr_calc.secondNum[curr_calc.secondNum.length - 1] == ".") {
            isWritingFloat = false;
        }
        curr_calc.secondNum = curr_calc.secondNum.slice(0,-1);
    }else if (curr_calc.operand != "") {
        curr_calc.operand = "";
        isFirstNum = true;
    }else if (curr_calc.firstNum.toString() != "") {
        if (curr_calc.firstNum[curr_calc.firstNum.length - 1] == ".") {
            isWritingFloat = false;
        }
        curr_calc.firstNum = curr_calc.firstNum.slice(0,-1);
    }
    update_display();
}
//DISPLAY
//Update display text based on current calc
function update_display() {
    let display = document.getElementById("display");
    display.firstChild.innerText = `${calcs[calcs.length-1].firstNum}${calcs[calcs.length-1].operand}${calcs[calcs.length-1].secondNum}`;
}
//Clear all display text
function clear_display() {
    let display = document.getElementById("display");
    display.firstChild.innerText = "";
}
//history display shows last calcs
function update_history_display() {
    let hist_display = document.getElementById("history");
    let new_para = document.createElement("p");
    calcs.forEach(calc => {
        if (calc.firstNum == "" && calc.operand == "" && calc.secondNum == "") {
            return;
        }
        new_para.innerText = `${calc.firstNum}${calc.operand}${calc.secondNum} = ${calc.result}`;
        hist_display.appendChild(new_para);
    });
    hist_display.scrollTop = hist_display.scrollHeight;
}
//SUPPORT FUNCTIONS
//call for the correct calculation based on operand
function calculate(calc) {
    calc.firstNum = Number(calc.firstNum);
    calc.secondNum = Number(calc.secondNum);
    
    switch (calc.operand) {
        case "+":
            calc.result = Math.round(add(calc.firstNum,calc.secondNum) * 1000)/1000;
            break;
        case "-":
            calc.result = Math.round(subtract(calc.firstNum,calc.secondNum) * 1000)/1000;
            break;
        case "*":
            calc.result = Math.round(multiply(calc.firstNum,calc.secondNum) * 1000)/1000;
            break;
        case "/":
            calc.result = Math.round(divide(calc.firstNum,calc.secondNum) * 1000)/1000;
            break;
        case "^":
            calc.result = Math.round(power(calc.firstNum,calc.secondNum) * 1000)/1000;
            break;
        case "√":
            calc.result = Math.round(sqroot(calc.secondNum) * 1000)/1000;
            break;
        case "!":
            calc.result = Math.round(factorial(calc.firstNum) * 1000)/1000;
            break;
    
        default:
            return;
    }
    update_history_display();
    start_new_calc();
}
//create new calc object
function start_new_calc() {
    clear_display();
    let last_result = calcs.length > 0? calcs[calcs.length-1].result : "";
    let new_calc = {
        firstNum:last_result,
        operand:"",
        secondNum:"",
        result:"",
    }
    calcs.push(new_calc);
    update_display(new_calc.firstNum);
    isFirstNum = true;
    isWritingFloat = false;
    console.log(calcs);
}

//Math functions
function add(a,b) {
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function power(num,pow) {
    return num**pow;
}
function sqroot(num) {
    return Math.sqrt(num);
}
function factorial(num) {
    let res = 1;
    for (let i = 2; i < num; i++) {
        res *= i;
    }
    return res;
}