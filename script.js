const screen = document.querySelector('.currentScreenText');
const history = document.querySelector('.previousScreenText');
let a = null;
let b = null;
let op = null;

const numberButtons = document.querySelectorAll('.inputButton');
numberButtons.forEach(button => button.addEventListener('click', function () { showOnScreen(button.textContent) }));

const opButtons = document.querySelectorAll('.operatorButton');
opButtons.forEach(button => button.addEventListener('click', function () { operatorPress(button) }));

const equalButton = document.querySelector('.equalsButton');
equalButton.addEventListener('click', function () { solve() });

const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', function () { clear() })

const deleteButton = document.querySelector('.deleteButton');
deleteButton.addEventListener('click', function () { screen.textContent = screen.textContent.slice(0, -1); })

function clear() {
    history.textContent = '';
    screen.textContent = '';
    a = null;
    b = null;
    op = null;
}

function showOnScreen(text) {
    // Clears values and screen when pressing a new digit after solving the previous operation
    if (history.textContent.includes('=')) { clear(); }

    if (!(screen.textContent.includes('.') && text === '.')) { screen.textContent += text; }
}

function operatorPress(button) {
    if (history.textContent !== '' && !(history.textContent.includes('='))) { solve(); }

    op = button.textContent;
    if (screen.textContent === '') { a = 0 }
    else { a = Number(screen.textContent); }

    history.textContent = `${a} ${op} `;
    screen.textContent = '';
}

function solve() {
    if (!history.textContent.includes('=')) {
        b = Number(screen.textContent);
    }

    // Check if just a number & equal sign have been inputed
    if (op === null) {
        history.textContent = `${b} = `;
        screen.textContent = `${b}`;
    } else {
        let result = operate(op, a, b);
        result = Math.round((result + Number.EPSILON) * 1000000) / 1000000;

        if (result === null) {
            screen.textContent = 'Cannot divide by 0'
        } else {
            history.textContent = `${a} ${op} ${b} = `;
            screen.textContent = `${result}`;
            a = result;
        }
    }
}

function operate(op, a, b) {
    if (op === '+') { return add(a, b); }
    else if (op === '-') { return subtract(a, b); }
    else if (op === '*') { return multiply(a, b); }
    else if (op === '/') { return divide(a, b); }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) { return null; }
    return (a / b);
}