// DOM STUFFS

// Imports
import allTasks from "./module.js";
import calendarIcon from "./images/calendar.png";
import descriptionIcon from "./images/description.png"; 
import notesICon from "./images/notes.png"; 
import plusIcon from "./images/add.png"; 
import priorityIcon from "./images/priority_flag.png"; 
import originDateIcon from "./images/creation.png"; 
import categoryIcon from "./images/category.png"; 
import importantIcon from "./images/important_icon.png"; 
import deleteIcon from "./images/trash.png"; 
import { addNewTodo,addNewFolder } from "./module.js";
import { format, compareAsc, add, differenceInCalendarDays } from "date-fns";
import { clearMainArea,mainArea, sortIcon, handleOutsideClick,outsideClickListener, renderMainArea, createDetailBlock} from "./module2";
import { addButtonTask, currentTab } from "./javaScript.js";


// Handle clicks outside 
handleOutsideClick(); 

// Search Area 

// Add input event to the search input
const searchInput = document.querySelector("input[type = 'search']")
 
   searchInput.addEventListener("input", function() {

        const inputClicked = this.getAttribute("type"); 

        checkItemClicked(inputClicked); 
    });        
    
 
// Method to run the search. 
function search() { 
    let searchItem = searchInput.value.trim();     
        
    clearMainArea(); 

    if (searchItem.length < 1) {
        mainArea.innerHTML = `<p>Searching for " "</p>`; 
    } else {
    mainArea.innerHTML = 
    `<p>Searching for "${searchItem}"</P>
     <h3> Task </h3>`
    
    }

    const searchLetters = searchItem.split(""); 

    function taskMatches(task) {
        function letterMatches(letter) {
          return task.title.toLowerCase().includes(letter);
        }
        return searchLetters.some(letterMatches);
    }

    const matchingTasks = allTasks[0].groupLists.filter(taskMatches); 

    matchingTasks.forEach(function(task, index ) {
    
        createTaskTile(task, index);
        
    })
}

// Track last added list, and the last input.
let lastAddedList, providedTitle;
let expand, checkBox, numberOfTiles = 0; 


// Method toa add a list tile, once a list is added this way
function createTaskTile(list, index) {       
    const tile = document.createElement("div"); 
    Object.assign(tile, {
        className: "ribbon tile pry_mgn pry_pad"
    });

    tile.dataset.index = index;

    const checkboxId = `checklist-${Date.now()}`; // unique ID

    tile.innerHTML = `
        <div class="title-area">
            <input type="checkbox" id="${checkboxId}" class="change">
            <div class="expand">
                <p class = "task-title">${list.title}</p>
            </div>        
            <button type="button">
                <img src='${importantIcon}'>
            </button>
        </div>
        <div class="other-details"></div>`;  

    mainArea.appendChild(tile); 

    const expand = tile.querySelector(".expand");
    const checkBox = tile.querySelector(`#${checkboxId}`);
    const titleText = tile.querySelector(".task-title");

    if (list.checklist === true) {
        checkBox.checked = true;
        titleText.classList.add("strikethrough");
    }

    expand.addEventListener("click", () => addTaskDetails(tile));

    checkBox.addEventListener("change", () => {     //Add change event to the checkbox to update task
        list.checklist = checkBox.checked;

        markTaskAsCompleted(list, tile, checkBox.checked, currentTab);

    });
    
}


addNewTask(); 

// Method to add new list to main area
function addNewTask() {
    const addBtn = document.getElementById("addBtn");
    const taskInput = mainArea.querySelector('input[type="text"]');

    if (!addBtn || !taskInput) return;

    addBtn.addEventListener("click", function () {
        createTask(taskInput);
    });

    taskInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            createTask(taskInput);
        }
    });
}



function createTask(inputElement) {
    const taskTitle = inputElement.value.trim();

    if (taskTitle.length > 1) {
        addNewTodo(taskTitle);

        lastAddedList = allTasks[0].groupLists[allTasks[0].groupLists.length - 1];
        createTaskTile(lastAddedList, allTasks[0].groupLists.length - 1);

        inputElement.value = "";
    }
}

// Create method to handle task checkbox click anywhere
function markTaskAsCompleted(task, tile, checked, currentTab) {
    task.checklist = checked;

    const titleText = tile.querySelector(".task-title");
    if (checked) {
        titleText.classList.add("strikethrough");
    } else {
        titleText.classList.remove("strikethrough");
    }

    const today = new Date().toDateString();
    const due = task.dueDate ? new Date(task.dueDate).toDateString() : null;

    switch (currentTab) {
        case "mainArea":
            if (checked) {
                tile.remove();
                moveTaskBetweenGroups(task, "uncompletedTasks", "completedTasks");
            }
            break;

        case "completed_tasks":
            if (!checked) {
                tile.remove();
                moveTaskBetweenGroups(task, "completedTasks", "uncompletedTasks");
            }
            break;

        case "today_tasks":
            if (checked && due && due < today) {
                tile.remove();
                moveTaskBetweenGroups(task, "uncompletedTasks", "completedTasks");
            }
            // if due === today, it stays here
            break;

        case "upcoming_tasks":
            if (checked) {
                tile.remove();
                moveTaskBetweenGroups(task, "uncompletedTasks", "completedTasks");
            }
            break;
    }
}


// Move a task from one group to another
function moveTaskBetweenGroups(task, fromGroupTitle, toGroupTitle) {
    const fromGroup = allTasks.find(g => g.groupTitle === fromGroupTitle);
    const toGroup = allTasks.find(g => g.groupTitle === toGroupTitle);

    if (!fromGroup || !toGroup) return; // safety check

    // Remove from source group
    fromGroup.groupLists = fromGroup.groupLists.filter(t => t !== task);

    // Add to target group if not already there
    if (!toGroup.groupLists.includes(task)) {
        toGroup.groupLists.push(task);
    }
}



// Add click events to the main area click items
mainAreaClicks(); 

function mainAreaClicks() {
    const mainUtilities = document.querySelectorAll(".click"); 
    for (let i = 0; i < mainUtilities.length; i++) {
        mainUtilities[i].addEventListener("click", function(e) {
            const itemClicked = this.getAttribute("id"); 
            if (itemClicked === "checkbox") {
                e.preventDefault(); 
            } else {
            checkItemClicked(itemClicked); 
            }
        })
    }
}

//To view/Add list details
function addTaskDetails(tile) {
    tile.style.height = "10rem"; 
    tile.querySelector(".title-area p").style.fontWeight = "bold"; 

    const ribbon2 = document.querySelector(".ribbon2");
    ribbon2.innerHTML = `
        <div class="ribbon ribbon4 item pry_mgn sdy_pad">
            <button class="btn click">  
                <img src="${plusIcon}" alt="add icon"> 
                Add a New Task
            </button> 
        </div>`;

    const ribbon = document.querySelector(".ribbon");

    const main = document.createElement("div");
    const leftMain = document.createElement("div");
    const rightMain = document.createElement("div");

    main.classList.add("main");
    leftMain.classList.add("left_main");
    rightMain.classList.add("right_main");

    // Get the current task from the tile's dataset
    const taskIndex = parseInt(tile.dataset.index);
    const currentGroup = allTasks[0].groupLists;
    lastAddedList = currentGroup[taskIndex];

    rightMain.innerHTML = `
        <div id="list_header" class="details">
            <span>
                <button type="button">
                    <input type="checkbox" id="checklist" class="change">
                </button>
                <h4>${lastAddedList.title}</h4>
                <img src="${importantIcon}">
            </span> 
        </div>
        ${createDetailBlock({ icon: descriptionIcon, inputType: "textarea", id: "description", placeholder: "Description" })}
        ${createDetailBlock({ icon: calendarIcon, inputType: "date", id: "dueDate" })}
        ${createDetailBlock({ icon: notesICon, inputType: "textarea", id: "note", placeholder: "Add Note" })}
        ${createDetailBlock({
            icon: priorityIcon, 
            inputType: "select", 
            id: 'priority', 
            options: [
                { value: "", label: "Select Priority" },
                { value: "Top priority", label: "Top priority" },
                { value: "Medium priority", label: "Medium priority" },
                { value: "Low priority", label: "Low priority" }
            ]
        })}
        <hr/>
        <div id="footer">
            <footer>
                <span>
                    <div class="date_created"></div>
                    <button type="button">
                        <img src="${deleteIcon}">
                    </button> 
                </span>
            </footer>
        </div>`;

    main.append(leftMain, rightMain);
    leftMain.append(ribbon, ribbon2, tile);
    mainArea.appendChild(main);

    // Display the formatted date created
    const formattedCreatedDate = `${format(lastAddedList.dateCreated, "eeee")} ${format(lastAddedList.dateCreated, "MMMM d, yyyy")}`;
    main.querySelector(".date_created").innerHTML = `<p>${formattedCreatedDate}</p>`;

    // Event listener for Enter key on textareas
    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const fieldFilled = this.id;
                updateTask(fieldFilled, tile);
            }
        });
    });

    // Event listener for changes in any input (checkbox, date, select, etc.)
    document.querySelectorAll(".change").forEach(element => {
        element.addEventListener("change", function () {
            const detailField = this.id;
            updateTask(detailField, tile);
        });
    });

    // Pre-fill fields if values already exist
    const desc = document.getElementById("description");
    const note = document.getElementById("note");
    const due = document.getElementById("dueDate");
    const priority = document.getElementById("priority");
    const checklist = document.getElementById("checklist");

    if (desc) desc.value = lastAddedList.description || "";
    if (note) note.value = lastAddedList.note || "";
    if (due) due.value = lastAddedList.dueDate || "";
    if (priority) priority.value = lastAddedList.priority || "";
    if (checklist) checklist.checked = lastAddedList.checklist === true;
}


// Method to update the created list. 
function updateTask(listProperty, tileElement) {
    const details = document.getElementById(listProperty);  
    const taskIndex = parseInt(tileElement.dataset.index);
    const currentGroup = allTasks[0].groupLists;
    lastAddedList = currentGroup[taskIndex];

    if (listProperty === "checklist") {
        const isChecked = details.checked;
        lastAddedList[listProperty] = isChecked;

        const titleText = tileElement.querySelector(".task-title");
        if (isChecked) {
            titleText.classList.add("strikethrough");
            tileElement.remove(); // Remove tile if completed
        } else {
            titleText.classList.remove("strikethrough");
        }

        markTaskAsCompleted(lastAddedList, tileElement, isChecked, currentTab);

    } else {
        // Handle regular field updates
        lastAddedList[listProperty] = details.value;

        const detailDisplay = document.createElement("p");
        detailDisplay.textContent = details.value;
        tileElement.querySelector(".other-details").appendChild(detailDisplay);

        if (listProperty === "dueDate") {
            details.value = format(new Date(), "yyyy-MM-dd");
        } else if (listProperty !== "priority") {
            details.value = details.getAttribute("aria-placeholder") || "";
        }
    }
}


// Function to checked the button click,and run a listener 
function checkItemClicked(buttonID){
    switch (buttonID) {
        case "s":
            sort(); 
            break;
        case "g":
            group(); 
            break; 
        case "search":
            search(); 
        break; 
        case "tasks": 
            addButtonTask(); 
        break;  
        default:
        break;
    }
}

// Sort icon
function sort() {
    const sort = document.querySelector("#s"); 
    const card = document.createElement("div");
    card.classList.add("card"); 
    card.innerHTML = `
        <h4>Sort by </h4>
        <hr/>
        <ul id = "sort_menu">
            <li class = "item pry_pd"><img src="${sortIcon}" alt = "sort icon">Alphabetically</li>
            <li class = "item pry_pd"><img src = "${calendarIcon}" alt= "calendar_icon">Deadline</li>
            <li class = "item pry_pd"><img src = "${priorityIcon}" alt = "">Priority</li>
            <li class = "item pry_pd"><img src = "${originDateIcon}" alt = "">Creation Date</li>
        </ul>
    `;
    sort.appendChild(card); 
}


// The Group icon
function group() {
    const group = document.querySelector("#g"); 
    const card = document.createElement("div");
    card.classList.add("card"); 
    card.innerHTML = `
    <h4>Group by</h4>
    <hr/>
    <ul id = "group_menu">
        <li class ="item pry_pd"><img src = "${categoryIcon}">Categories</li>
    </ul>
    `
    group.appendChild(card); 
}


export {checkItemClicked, priorityIcon, lastAddedList, providedTitle, mainAreaClicks, addNewTask,createTaskTile} 