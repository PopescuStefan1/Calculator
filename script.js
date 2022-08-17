const screen = document.querySelector('.currentScreenText');
const history = document.querySelector('.previousScreenText');
let a;
let b;
let op;

const numberButtons = document.querySelectorAll('.inputButton');
numberButtons.forEach(button => button.addEventListener('click', function () { showOnScreen(button.textContent) }));

const opButtons = document.querySelectorAll('.operatorButton');
opButtons.forEach(button => button.addEventListener('click', function () { operatorPress(button) }));

const equalButton = document.querySelector('.equalsButton');
equalButton.addEventListener('click', function () { solve() });

const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', function () { clear() })

function clear() {
    history.textContent = '';
    screen.textContent = '';
    a = null;
    b = null;
    op = null;
}

function showOnScreen(text) {
    // Clears values and screen when pressing a new digit after solving the previous operation
    if (history.textContent.includes('=')) {
        clear();
    }

    screen.textContent += text;
}

function operatorPress(button) {
    if (history.textContent !== '') {
        solve();
    }

    op = button.textContent;
    a = Number(screen.textContent);
    history.textContent = `${screen.textContent} ${op} `;
    screen.textContent = '';
}

function solve() {
    if (!history.textContent.includes('=')) {
        b = Number(screen.textContent);
    }
    const result = operate(op, a, b);
    if (result === null) {
        screen.textContent = 'Cannot divide by 0'
    } else {
        history.textContent = `${a} ${op} ${b} = `;
        screen.textContent = `${result}`;
        a = result;
    }
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
    return (a / b).toFixed(5);
}