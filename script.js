const shell = document.getElementById("shell");

const num1 = document.getElementById("num1");
num1.textContent = "0";

let isNum1 = true;

const operater = document.getElementById("operate");
operater.textContent = "";

const num2 = document.getElementById("num2");
num2.textContent = "";

const resultDisplay = document.getElementById("result");
resultDisplay.textContent = "";

shell.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  let id = e.key;
  console.log(id);

  let type;
  if (id >= 0 && id <= 9) {
    type = "number";
  }
  if (id === "+" || id === "-" || id === "*" || id === "/") {
    type = "operator";
  }
  if (id === "Escape") {
    id = "clear";
  }
  if (id === "Backspace") {
    id = "delete";
  }
  calculate(type, id);
}

function handleClick(e) {
  const type = e.target.dataset.type;
  const id = e.target.id;
  calculate(type, id);
}

function add(num1, num2) {
  return Math.round(1000 * (parseFloat(num1) + parseFloat(num2))) / 1000;
}
function subtract(num1, num2) {
  return Math.round(1000 * (parseFloat(num1) - parseFloat(num2))) / 1000;
}
function divide(num1, num2) {
  return Math.round(1000 * (parseFloat(num1) / parseFloat(num2))) / 1000;
}
function multiply(num1, num2) {
  return Math.round(1000 * (parseFloat(num1) * parseFloat(num2))) / 1000;
}
function clear() {
  num1.textContent = "0";
  num2.textContent = "";
  operater.textContent = "";
  resultDisplay.textContent = "";
  isNum1 = true;
}
function deleteDigit() {
  if (resultDisplay.textContent != "") {
    return;
  }
  if (isNum1) {
    const str1 = num1.textContent;
    num1.textContent = str1.substring(0, str1.length - 1);
    if (num1.textContent === "") {
      num1.textContent = "0";
    }
  } else {
    const str2 = num2.textContent;
    num2.textContent = str2.substring(0, str2.length - 1);
  }
}
function operate() {
  switch (operater.textContent) {
    case "+":
      return add(num1.textContent, num2.textContent);
    case "-":
      return subtract(num1.textContent, num2.textContent);

    case "/":
      return divide(num1.textContent, num2.textContent);

    case "*":
      return multiply(num1.textContent, num2.textContent);
  }
}

// ---------------MAIN FUNCTION-----------------------------
function calculate(type, id) {
  if (type === "number") {
    if (resultDisplay.textContent != "") {
      isNum1 = true;
      num1.textContent = "";
      num1.textContent += id;
      num2.textContent = "";
      resultDisplay.textContent = "";
      operater.textContent = "";
    } else if (isNum1) {
      if (num1.textContent === "0") {
        num1.textContent = "";
      }
      num1.textContent += id;
    } else {
      num2.textContent += id;
    }
  }

  if (type === "operator") {
    if (num1.textContent != "" && num2.textContent != "") {
      num1.textContent = operate();
      num2.textContent = "";
      resultDisplay.textContent = "";
      operater.textContent = id;
    } else {
      operater.textContent = id;
      isNum1 = !isNum1;
    }
  }

  if (id === "clear") {
    clear();
  }

  if (id === "delete") {
    deleteDigit();
  }

  if (id === "=") {
    if (
      num1.textContent === "" ||
      operater.textContent === "" ||
      num2.textContent === ""
    ) {
      return;
    }
    resultDisplay.textContent = operate();
  }

  if (id === ".") {
    if (result.textContent != "") {
      clear();
      isnum1 = true;
    }
    if (isNum1 && !num1.textContent.includes(".")) {
      num1.textContent += id;
    }
    if (!isNum1 && !num2.textContent.includes(".")) {
      if (num2.textContent === "") {
        num2.textContent = "0";
        num2.textContent += id;
      } else {
        num2.textContent += id;
      }
    }
  }
}
