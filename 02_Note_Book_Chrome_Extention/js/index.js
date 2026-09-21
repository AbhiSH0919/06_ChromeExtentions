"use strict";

const btnAdd = document.querySelector(".btnAdd");
const container = document.querySelector(".container");

/*========================= SAVE NOTES AND NOTE PAGE FUNCTION =====================*/
const saveNotes = function () {
	const notes = document.querySelectorAll(".noteBook textarea");
	const notesData = [];

	/*========================= ADD NOTES IN DATA ARRAY ===========================*/
	notes.forEach(function (notesText) {
		notesData.push(notesText.value);
	});
	//  console.log(notesData, "pushed notes data");

	/*========================= SAVE & REMOVE LOCALSTORAGE KEY CONDITION =================*/
	if (notesData.length === 0) {
		localStorage.removeItem("abhiKey");
	} else {
		localStorage.setItem("abhiKey", JSON.stringify(notesData));
	}
};

/*=========================== CREATE NOTE PAGE ====================================*/
const addNote = function (text = "") {
	const noteBook = document.createElement("div");
	noteBook.classList.add("noteBook");
	container.appendChild(noteBook);
	noteBook.innerHTML = `<nav class="toolbar">
                          <button id="trash">Trash</button>
                          </nav>
<textarea class="textarea" placeholder="Write here...">${text}</textarea>`;

	saveNotes();
	//============================ FOCUS ON NEW TEXTAREA ============================
	const textarea = noteBook.querySelectorAll(".noteBook textarea");
	if (textarea.length != 0) {
		textarea[`${textarea.length - 1}`].focus();
	}

	//============================ SAVE NOTE WHEN FOCUS OUT ============================
	textarea.forEach((textarea) => {
		textarea.addEventListener("focusout", function () {
			saveNotes();
		});

		textarea.addEventListener("keyup", function (e) {
			if (
				e.key === " " ||
				e.key === "," ||
				e.key === "." ||
				e.key === "Backspace"
			) {
				saveNotes();
			}
		});
	});

	//============================ SAVE NOTE PAGE BUTTON ============================
	const btnSave = document.querySelector(".btnSave");
	btnSave.addEventListener("click", function () {
		saveNotes();
	});

	//============================ DELETE NOTE PAGE BUTTON ============================
	const trash = noteBook.querySelector("#trash");
	trash.addEventListener("click", function () {
		//container.removeChild(noteBook);
		noteBook.remove();
		saveNotes();
	});
};

/*============================ NOTE PAGE ADD BUTTON ===============================*/
btnAdd.addEventListener("click", function () {
	addNote();
});

/*=========================== GET DATA FROM LOCAL STORAGE =========================*/
window.onload = () => {
	const localStorageData = JSON.parse(localStorage.getItem("abhiKey"));
	console.log(localStorageData);

	if (localStorageData === null) {
		addNote();
	} else {
		localStorageData.forEach((LSNoteData) => {
			addNote(LSNoteData);
		});
	}
};
