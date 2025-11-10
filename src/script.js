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
function createTaskTile(task, index = 0, currentTab = "mainArea") {       
    const tile = document.createElement("div"); 
    Object.assign(tile, {
        className: "ribbon tile pry_mgn pry_pad"
    });

    task.id = task.id || Date.now() + Math.random().toString(36).substring(2, 9); 
    tile.dataset.id = task.id; // used instead of dataset.index

    const checkboxId = `checklist-${Date.now()}-${index}`; // unique ID

    tile.innerHTML = `
        <div class="title-area">
            <input type="checkbox" id="${checkboxId}" class="change">
            <div class="expand">
                <p class="task-title">${task.title}</p>
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

    //  Sync completed state
    if (task.checklist === true) {
        checkBox.checked = true;
        titleText.classList.add("strikethrough");
    }

    //  Open details view on click
    expand.addEventListener("click", () => {
        viewTaskDetails(tile, task, currentTab);
    });

    // Checkbox updates completion state
    checkBox.addEventListener("change", () => {     
        const isChecked = checkBox.checked;
        updateTask(task, "checklist", isChecked, tile, currentTab);
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

console.log(currentTab); 
//To view/Add list details
function viewTaskDetails(tile, task, tab) {
    tile.style.height = "10rem"; 
    tile.querySelector(".title-area p").style.fontWeight = "bold"; 

    let ribbon2 = document.querySelector(".ribbon2");

    if (!ribbon2) {
        ribbon2 = document.createElement("div");
        ribbon2.classList.add("ribbon2");
        mainArea.prepend(ribbon2);
    }

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

    rightMain.innerHTML = `
        <div id="list_header" class="details">
            <span>
                <input type="checkbox" id="checklist-detail" class="change" ${task.checklist ? "checked" : ""}>
                <h4>${task.title}</h4>
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

    // Fill existing details
    document.getElementById("description").value = task.description || "";
    document.getElementById("note").value = task.note || "";
    document.getElementById("dueDate").value = task.dueDate || "";
    document.getElementById("priority").value = task.priority || "";

    // Show formatted creation date
    const formattedCreatedDate = `${format(task.dateCreated, "eeee")} ${format(task.dateCreated, "MMMM d, yyyy")}`;
    main.querySelector(".date_created").innerHTML = `<p>${formattedCreatedDate}</p>`;

    // Event listeners
    document.querySelectorAll(".change").forEach(element => {
        element.addEventListener("change", function () {
            const field = this.id === "checklist-detail" ? "checklist" : this.id;
            const value = (this.type === "checkbox") ? this.checked : this.value;

            updateTask(task, field, value, tile, currentTab);
        });
    });

    document.querySelectorAll("textarea").forEach(textarea => {
        textarea.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                updateTask(task, this.id, this.value, tile, currentTab);
            }
        });
    });
}


// Method to update the created list. 
function updateTask(task, field, value, tile, currentTab) {
    // Update task object
    task[field] = value;

    // Special handling for checklist
    if (field === "checklist") {
        const isChecked = value;

        // Toggle strikethrough
        const titleText = tile.querySelector(".task-title");
        if (isChecked) {
            titleText.classList.add("strikethrough");
        } else {
            titleText.classList.remove("strikethrough");
        }

        // Delegate to markTaskAsCompleted for group movements
        markTaskAsCompleted(task, tile, isChecked, currentTab);
        return; // checklist handled fully
    }

    // Update UI tile with new value
    syncTileDetails(tile, field, value);

    // Show update in `.other-details` (like your original version)
    if (field !== "priority" && field !== "dueDate") {
        const detailDisplay = document.createElement("p");
        detailDisplay.textContent = value;
        tile.querySelector(".other-details").appendChild(detailDisplay);
    }
}


function syncTileDetails(tile, field, value) {
    if (field === "title") {
        const titleEl = tile.querySelector(".task-title");
        if (titleEl) titleEl.textContent = value;
    }

    if (field === "dueDate") {
        const dueEl = tile.querySelector(".task-due");
        if (dueEl) {
            dueEl.textContent = value ? new Date(value).toDateString() : "";
        }
    }

    if (field === "priority") {
        const priorityEl = tile.querySelector(".task-priority");
        if (priorityEl) {
            priorityEl.textContent = value || "No priority";
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