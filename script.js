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
deleteButton.addEventListener('click', function () { deleteOne() })

function deleteOne() {
    screen.textContent = screen.textContent.slice(0, -1);
}

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

    if (!(screen.textContent.includes('.') && text === '.') && screen.textContent.length < 15) { screen.textContent += text; }
}

function operatorPress(button) {
    if (history.textContent !== '' && !(history.textContent.includes('='))) { solve(); }

    if (typeof button === 'string') { op = button; }
    else { op = button.textContent; }

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

        // If result is too large cut from the precision
        if (result.toString().length > 15) {
            result = result.toExponential();
        }
        if (result.toString().includes('e')) {
            let string = result.toString();
            const end = string.indexOf('e');
            const remove = string.slice(7, end - 1);
            string = string.replace(remove, '');
            result = Number(string);
            result = result.toExponential();
        }

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

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
            showOnScreen(event.key);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operatorPress(event.key);
            break;
        case "Enter":
        case "=":
            solve();
            break;
        case "Esc": // IE/Edge specific value
        case "Escape":
            clear();
            break;
        case "Backspace":
            deleteOne();
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);