"strict mode";
// =====Elements=====
const mainContainer = document.querySelector(".mainContainer");
const inputTitle = document.querySelector("#title");
const inputDes = document.querySelector("#description");
const listsBox = document.querySelector(".listsBox");
// =====Constants=====
const TODOLOCALSTORAGEKEY = "TODOLOCALSTORAGEKEY";
const ADDTODOITEM = "ADDTODOITEM";
const REMOVETODOITEM = "REMOVETODOITEM";
const CLEARALLTODOITEMS = "CLEARALLTODOITEMS";
const TOGGLETODOITEM = "TOGGLETODOITEM";
let todoArrayData = [];

const getLocalStorageData = function () {
	if (localStorage.getItem(TODOLOCALSTORAGEKEY) === null)
		localStorage.setItem(TODOLOCALSTORAGEKEY, JSON.stringify(todoArrayData));

	return JSON.parse(localStorage.getItem(TODOLOCALSTORAGEKEY));
};

/**
 *
 * @param {ConstantString} condition Cannot call function without condition parameter. [ADDTODOITEM, REMOVETODOITEM, CLEARALLTODOITEMS, TOGGLETODOITEM]
 * @param {String} todoTitle ToDo name from UI.
 * @param {String} todoDesc ToDo description from UI.
 * @param {Boolean} action Done or Undone task. But default value is false.
 * @param {Number} itemIndex Index number of the Item.
 * @description This function parameters are the Object { }. Use object as a arguments.
 */
const updateTodoArrayData = function ({
	condition,
	todoTitle,
	todoDesc,
	action = false,
	itemIndex,
}) {
	if (!condition || typeof condition === "number")
		throw new Error(
			"You Called updateTodoArrayData function without specifying condition! Condition must be valid or CONSTANT for doing this function work."
		);

	condition === ADDTODOITEM &&
		todoArrayData.push({
			todoTitle: todoTitle,
			todoDesc: todoDesc,
			action: action,
		});
	condition === CLEARALLTODOITEMS && todoArrayData.splice(0);
	condition === REMOVETODOITEM && todoArrayData.splice(itemIndex, 1);
	condition === TOGGLETODOITEM &&
		(todoArrayData[itemIndex].action = !todoArrayData[itemIndex].action);

	todoArrayDataSaveToLocalStorageData();
	updateTodoOnUi();
};

const todoArrayDataSaveToLocalStorageData = function () {
	localStorage.setItem(TODOLOCALSTORAGEKEY, JSON.stringify(todoArrayData));
};

const updateTodoOnUi = function () {
	inputTitle.value = "";
	inputDes.value = "";

	todoArrayData = getLocalStorageData();

	let listItems = "";
	todoArrayData.forEach(({ todoTitle, todoDesc, action } = item, index) => {
		listItems += `
		                <li id="${index}" class="grid-cols-4 todoListItem ${
			action ? "complete" : ""
		}">
		                <p>${index + 1}</p>
		                <p>${todoTitle}</p>
		                <p>${todoDesc}</p>
		                <button class="btn btnRemoveTodoItem">Delete</button>
		                </li>
		                `;
	});

	listsBox.innerHTML = listItems;
};

const checkFormBeforSetData = function (e) {
	if (inputTitle.value !== " " && inputTitle.value.length >= 1) {
		inputTitle.style.boxShadow = "0 0 0.2rem rgba(0, 0, 0, .6)";
		inputTitle.placeholder = "Write To-do here...";
		updateTodoArrayData({
			condition: ADDTODOITEM,
			todoTitle: inputTitle.value,
			todoDesc: inputDes.value,
		});
	} else {
		inputTitle.style.boxShadow = "0 0 0.4rem red";
		inputTitle.placeholder = "Plz enter something here.!";
		inputTitle.focus();
	}
};

// ENTER KEY BEHAVIOUR =======
inputTitle.addEventListener("keyup", function (e) {
	if (e?.key === "Enter") checkFormBeforSetData();
});

mainContainer.addEventListener("click", function (e) {
	e.preventDefault();
	// ===Elements===
	const btnTodoAdd = e?.target?.classList.contains("btnTodoAdd");
	const btnTodoClearAll = e?.target?.classList.contains("btnTodoClearAll");
	const btnRemoveTodoItem = e?.target?.classList.contains("btnRemoveTodoItem");

	if (btnTodoAdd) checkFormBeforSetData();

	if (btnTodoClearAll && todoArrayData.length >= 1) {
		if (confirm("If you press OK button all ToDo's will be cleared!")) {
			updateTodoArrayData({ condition: CLEARALLTODOITEMS });
		}
	}

	if (btnRemoveTodoItem) {
		updateTodoArrayData({
			condition: REMOVETODOITEM,
			itemIndex: +e.target.closest(".todoListItem").id,
		});
	}

	if (!btnRemoveTodoItem && e.target.closest(".todoListItem")) {
		updateTodoArrayData({
			condition: TOGGLETODOITEM,
			itemIndex: +e.target.closest(".todoListItem").id,
		});
	}
});

updateTodoOnUi(); // ---> Initial Call
console.log(...todoArrayData);
