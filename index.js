const balance = document.getElementById("balance");
const textInput = document.getElementById("text");
const form = document.getElementById("form");
const expense = document.getElementById("money-minus");
const income = document.getElementById("money-plus");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const list = document.getElementById("list");

//data

// const data = [];

//loclaSorage

const localStorageData = JSON.parse(localStorage.getItem("datas"));
let datas = localStorage.getItem("datas") !== null ? localStorageData : [];

/////////
function obj(e) {
  e.preventDefault();

  if (textInput.value.trim() === "" || amount.value.trim() === "") {
    alert("please fill the boxes");
  } else {
    const data = {
      id: genrateId(),
      text: textInput.value,
      amount: +amount.value,
    };

    datas.push(data);

    addDataToDom(data);

    updateValues();

    updatStorage();

    textInput.value = "";
    amount.value = "";
  }
}
//
function genrateId() {
  return Math.floor(Math.random() * 100000000);
}

//

//updatStorage
function updatStorage() {
  localStorage.setItem("datas", JSON.stringify(datas));
}

//addDom

function addDataToDom(data) {
  const item = document.createElement("li");
  item.classList.add(data.amount < 0 ? "minus" : "plus");

  const sign = data.amount < 0 ? "-" : "+";

  item.innerHTML = `${data.text} <span>${sign}${Math.abs(data.amount)}
  </span> <button class="delete-btn" onclick="removeData(${data.id})">x</button>
  `;

  list.appendChild(item);
}
///////////////
function removeData(id) {
  datas = datas.filter((data) => data.id !== id);

  updatStorage();
  init();
  updateValues();
}

//display

function updateValues() {
  const amounts = datas.map((data) => data.amount);

  const totall = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const plus = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const minus = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerHTML = `$${totall}`;
  expense.innerHTML = `$${minus}`;
  income.innerHTML = `$${plus}`;
}

/////////
function init() {
  list.innerHTML = "";

  datas.forEach((data) => addDataToDom(data));

  updateValues();
}
init();
///

form.addEventListener("submit", obj);
