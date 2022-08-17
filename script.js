const screen = document.querySelector('.currentScreen');
const history = document.querySelector('.previousScreen');
let a;
let b;
let op;

const numberButtons = document.querySelectorAll('.inputButton');
numberButtons.forEach(button => button.addEventListener('click', function () { showOnScreen(button.textContent) }));

const opButtons = document.querySelectorAll('.operatorButton');
opButtons.forEach(button => button.addEventListener('click', function () { operatorPress(button) }));

const equalButton = document.querySelector('.equalsButton');
equalButton.addEventListener('click', function () { solve() });

function showOnScreen(text) {
    screen.textContent += text;
}

function operatorPress(button) {
    op = button.textContent;
    a = Number(screen.textContent);
    history.textContent = `${screen.textContent} ${op} `;
    screen.textContent = '';
}

function solve() {
    if (typeof b === 'undefined') {
        b = Number(screen.textContent);
    }
    const result = operate(op, a, b);

    history.textContent = `${a} ${op} ${b} = `;
    screen.textContent = `${result}`;
    a = result;
}

function operate(op, a, b) {
    if (op === '+') {
        return add(a, b);
    } else if (op === '-') {
        return subtract(a, b);
    } else if (op === '*') {
        return multiply(a, b);
    } else if (op === '/') {
        return divide(a, b);
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