const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.dataset.value || e.target.dataset.action);
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    const keyMap = {
        'Enter': 'calculate',
        '=': 'calculate',
        'Escape': 'clear',
        'Backspace': 'delete',
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/',
        '%': '%',
        '.': '.',
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9'
    };

    if (key in keyMap) {
        e.preventDefault(); 
        handleInput(keyMap[key]);
    }
});

function handleInput(value) {
    if (value === 'calculate') {
        try {
            string = eval(string).toString();
            input.value = string;
        } catch (error) {
            input.value = "Error";
            string = "";
        }
    } else if (value === 'clear') {
        string = "";
        input.value = string;
    } else if (value === 'delete') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } else {
        
        if (value === '.' && string.split(/[\+\-\*\/]/).pop().includes('.')) {
            return;
        }
       
        if ((value === '+' || value === '*' || value === '/' || value === '%') && 
            (string === "" || /[\+\-\*\/%]$/.test(string))) {
            return;
        }
        
        string += value;
        input.value = string;
    }
    
    const button = document.querySelector(`[data-value="${value}"], [data-action="${value}"]`);
    if (button) {
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }
}
