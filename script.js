const buttons = document.querySelectorAll(".btn");

const num1 = document.getElementById("num1");
num1.textContent = "0";

let isNum1 = true;

const operate = document.getElementById("operate");
operate.textContent = "";

const num2 = document.getElementById("num2");
num2.textContent = "";

const resultDisplay = document.getElementById("result");
resultDisplay.textContent = "";

buttons.forEach((button) => {
  button.addEventListener("click", handleClick);
});

function handleClick(e) {
  const type = e.target.dataset.type;
  const id = e.target.id;

  if (type === "number") {
    if (resultDisplay.textContent != "") {
      isNum1 = true;
      num1.textContent = "";
      num1.textContent += id;
      num2.textContent = "";
      resultDisplay.textContent = "";
      operate.textContent = "";
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
      let result = 0;
      switch (operate.textContent) {
        case "+":
          result = add(num1.textContent, num2.textContent);
          break;
        case "-":
          result = subtract(num1.textContent, num2.textContent);
          break;
        case "/":
          result = divide(num1.textContent, num2.textContent);
          break;
        case "*":
          result = multiply(num1.textContent, num2.textContent);
          break;
      }
      num1.textContent = result;
      num2.textContent = "";
      resultDisplay.textContent = "";
      operate.textContent = id;
    } else {
      operate.textContent = id;
      isNum1 = !isNum1;
    }
  }

  if (id === "clear") {
    num1.textContent = "0";
    num2.textContent = "";
    operate.textContent = "";
    resultDisplay.textContent = "";
    isNum1 = true;
  }

  if (id === "delete") {
    if (resultDisplay.textContent != "") {
      return;
    }
    if (isNum1) {
      const str1 = num1.textContent;
      num1.textContent = str1.substring(0, str1.length - 1);
    } else {
      const str2 = num2.textContent;
      num2.textContent = str2.substring(0, str2.length - 1);
    }
  }

  if (id === "=") {
    if (
      num1.textContent === "" ||
      operate.textContent === "" ||
      num2.textContent === ""
    ) {
      return;
    }
    let result = 0;
    switch (operate.textContent) {
      case "+":
        result = add(num1.textContent, num2.textContent);
        break;
      case "-":
        result = subtract(num1.textContent, num2.textContent);
        break;
      case "/":
        result = divide(num1.textContent, num2.textContent);
        break;
      case "*":
        result = multiply(num1.textContent, num2.textContent);
        break;
    }
    resultDisplay.textContent = result;
  }

  if (id === ".") {
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
