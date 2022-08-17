const screen = document.querySelector('.currentScreen');
const history = document.querySelector('.previousScreen');
let a;
let b;
let op;

const numberButtons = document.querySelectorAll('.inputButton');
numberButtons.forEach(button => button.addEventListener('click', function () { showOnScreen(button.textContent) }));

const opButtons = document.querySelectorAll('.operatorButton');
opButtons.forEach(button => button.addEventListener('click', function () { operatorPress(button) }));

function showOnScreen(text) {
    screen.textContent += text;
}

function operatorPress(button) {
    op = button.textContent;
    a = screen.textContent;
    history.textContent = `${screen.textContent} ${op}`;
}

function operate(op, a, b) {
    if (op === '+') {
        add(a, b);
    } else if (op === '-') {
        subtract(a, b);
    } else if (op === '*') {
        multiply(a, b);
    } else if (op === '/') {
        divide(a, b);
    }
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
    if (b === 0) {
        return null;
    }
    return a / b;
}