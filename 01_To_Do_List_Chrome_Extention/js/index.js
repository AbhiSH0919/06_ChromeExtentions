const inputTitle = document.querySelector("#title");
const inputDes = document.querySelector("#description");
const btnAdd = document.querySelector(".btnAdd");
const clear = document.querySelector(".clearAll");
const listBox = document.querySelector(".listBox");

let listData = [];

// TO-DO SAVE FUNCTION IN LOCALSTORAGE ======= EVENTS/FUNCTION =======
const saveToDo = function () {
  if (listData === null) {
    listData = [];
    listData.push([inputTitle.value, inputDes.value]);
    localStorage.setItem("toDoKey", JSON.stringify(listData));
    inputTitle.value = "";
    inputDes.value = "";
  } else {
    listData = JSON.parse(localStorage.getItem("toDoKey"));
    listData.push([inputTitle.value, inputDes.value]);
    localStorage.setItem("toDoKey", JSON.stringify(listData));
    inputTitle.value = "";
    inputDes.value = "";
  }
};

// TO-DO ADD FUNCTION ON DOCUMENT ======= EVENTS/FUNCTION =======
const addToDo = function () {
  listData = JSON.parse(localStorage.getItem("toDoKey"));
  localStorage.setItem("toDoKey", JSON.stringify(listData));

  let listItem = "";
  listData.forEach(function (element, index) {
    listItem += `
                    <li class="grid-cols-4">
                    <p>${index + 1}</p>
                    <p class="toggle">${element[0]}</p>
                    <p>${element[1]}</p>
                    <p><button class="btn btnDel">Delete</button></p>
                    </li>
                    `;
  });

  listBox.innerHTML = listItem;

  if (listItem.length != 0) {
    // TO-DO TASK COMPLETE CLASS TOGGLE(Window reloaded - Lists back to normal) ======= EVENTS/FUNCTION =======
    const complete = listBox.querySelectorAll("li");
    complete.forEach((index) => {
      index.addEventListener("click", function () {
        index.classList.toggle("complete");
      });
    });

    // TO-DO LIST ITEM DELETE BTN/LOCALSTORAGE ======= EVENTS/FUNCTION =======
    const delBtn = listBox.querySelectorAll(".btnDel");
    delBtn.forEach((item, index) => {
      item.addEventListener("click", function (event) {
        listData = JSON.parse(localStorage.getItem("toDoKey"));
        listData.splice(index, 1);
        localStorage.setItem("toDoKey", JSON.stringify(listData));
        addToDo();
      });
    });
  }
};

// ENTER KEY BEHAVIOUR =======
inputTitle.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    if (inputTitle.value !== "") {
      inputTitle.style.boxShadow = "0 0 0.2rem rgba(0, 0, 0, 0.6)";
      inputTitle.placeholder = "Write To-do here...";
      saveToDo();
      addToDo();
    } else {
      inputTitle.style.boxShadow = "0 0 0.4rem red";
      inputTitle.placeholder = "Plz enter something here.!";
    }
  }
});

// TO-DO ADD BTN ======= EVENTS/FUNCTION =======
btnAdd.addEventListener("click", function () {
  if (inputTitle.value !== "") {
    inputTitle.style.boxShadow = "0 0 0.2rem rgba(0, 0, 0, 0.6)";
    inputTitle.placeholder = "Write To-do here...";
    saveToDo();
    addToDo();
  } else {
    inputTitle.style.boxShadow = "0 0 0.4rem red";
    inputTitle.placeholder = "Plz enter something here.!";
  }
});

// ALL TO-DO LIST CLEAR BTN ======= EVENTS/FUNCTION =======
clear.addEventListener("click", function () {
  if (listData.length != 0) {
    if (confirm("Do you want to clear all the list ?")) {
      listData = [];
      localStorage.setItem("toDoKey", JSON.stringify(listData));
      addToDo();
      inputTitle.style.boxShadow = "0 0 0.2rem rgba(0, 0, 0, 0.6)";
      inputTitle.placeholder = "Write To-do here...";
    }
  }
});

// WINDOW LOAD - ADDING LIST ======= CALL ADDTODO FUNCTION =======
window.onload = () => {
  console.log("Hello World...!\n\nAdd To Do's");
  if (JSON.parse(localStorage.getItem("toDoKey")) === null) {
    listData = [];
    localStorage.setItem("toDoKey", JSON.stringify(listData));
  }
  addToDo();
};
