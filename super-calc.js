//This calc works each operation at a time so we just need to store the current operation 
let firstNum = "";
let operand = "";
let sencondNum = "";
let result;
let isFirstNum = true;
let isWritingFloat = false;
//On key entered, if its one of the operators grab the num before it as first num after executing any remaining calcs 
//(this makes the calc work on subsequent operations without the need to press the = button)


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
                //clear()
                break;
        
            default:
                break;
        }
}

function set_number(n) {
    write_display(n);
    if (isFirstNum) {
        firstNum += n;
    }else{
        sencondNum += n;
    }
}

function set_operand(o) {
    //special cases
    switch (o) {
        case "!":
            if (isFirstNum) {
                calculate(firstNum,o,sencondNum);                
            }else{
                calculate(firstNum,operand,sencondNum);
                firstNum = result;
                calculate(firstNum,o,sencondNum);
            }
            isFirstNum = false;
            return;
        case ".":
            set_number(o);
            isWritingFloat = true;
            return;
        case "=":
            calculate(firstNum,operand,sencondNum);
            return;
        default:
            break;
    }
    //if was writing first num end it and write operand
    //else consider the end of second num and calculate
    if (isFirstNum) {
        operand = o;
        write_display(o);
        isFirstNum = false;        
    } else {
        calculate(firstNum,operand,sencondNum);
        firstNum = result;
        operand = o;
        write_display(o);
        isFirstNum = false;
    }
}

function write_display(x) {
    let display = document.getElementById("display");
    display.firstChild.innerText += x;
}

function clear_display() {
    let display = document.getElementById("display");
    display.firstChild.innerText = "";
}

function calculate(a,op,b) {
    a = Number(a);
    b = Number(b);
    switch (op) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        case "^":
            result = power(a,b);
            break;
        case "√":
            result = sqroot(b);
            break;
        case "!":
            result = factorial(a);
            break;
    
        default:
            return;
    }
    start_next_calc();
}
function start_next_calc() {
    clear_display();
    write_display(result);
    firstNum = "";
    operand = "";
    sencondNum = "";
    isFirstNum = true;
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