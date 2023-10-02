let code = '';
let result = [];

function updateDisplay() {
  const display = document.getElementById('code-display');
  const numbers = display.getElementsByTagName('div');

  for (let i = 0; i < 4; ++i) {
    if (i < code.length) {
      numbers[i].textContent = code[i];
    } else {
      numbers[i].textContent = '';
    }
  }
}

function updateDisplayResult() {
  const rowTemplate = document.getElementById('result-row');
  const resultArea = document.getElementById('result-area');

  resultArea.innerHTML = '';
  result.forEach((resultItem) => {
    const row = document.importNode(rowTemplate.content, true);

    const p = row.querySelector('p');
    p.textContent = resultItem;
    row.querySelector('button').addEventListener('click', function () {
      p.classList.toggle('strike');
    });
    resultArea.appendChild(row);
  });
}

function addCode(value) {
  if (code.length < 4) {
    code += value;
    updateDisplay();
  }
}

function bindKey(tag) {
  tag.addEventListener('click', function () {
    addCode(tag.textContent);
  });
}

function cancel(tag) {
  tag.addEventListener('click', function () {
    code = '';
    updateDisplay();
  });
}

function submit(tag) {
  tag.addEventListener('click', function () {
    const availableNumbers = code.split('').map((x) => parseInt(x, 10));
    const regex = new RegExp(`^[${availableNumbers.join('')}]{4}$`);
    result = [];

    const hasAllValues = (code) => {
      return availableNumbers.every((num) => code.includes(String(num)));
    };

    for (let i = 0; i < 10000; ++i) {
      const calculatedCode = String(i).padStart(4, '0');

      if (calculatedCode.match(regex) && hasAllValues(calculatedCode)) {
        result.push(calculatedCode);
      }
    }

    updateDisplayResult();
  });
}

function typeCode(event) {
  if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(event.key)) {
    addCode(event.key);
  }
  if (event.code === 'Backspace' && code.length > 0) {
    code = code.slice(0, -1);
  }
  if (event.code === 'Delete') {
    code = '';
  }
  updateDisplay();
}

function start() {
  const keyboard = document.getElementById('keyboard');
  const keys = keyboard.getElementsByTagName('div');

  for (const key of keys) {
    switch (key.dataset.interaction) {
      case 'key':
        bindKey(key);
        break;
      case 'cancel':
        cancel(key);
        break;
      case 'submit':
        submit(key);
        break;
    }
  }

  document.addEventListener('keydown', typeCode);
}

document.addEventListener('DOMContentLoaded', start);
