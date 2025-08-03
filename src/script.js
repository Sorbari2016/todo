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
import { addButtonTask } from "./javaScript.js";


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

    matchingTasks.forEach(function(task) {
    
        createTaskTile(task);
        
    })
}

// Track last added list, and the last input.
let lastAddedList, providedTitle;
let expand, checkBox, numberOfTiles = 0; 


// Method toa add a list tile, once a list is added this way
function createTaskTile(list) {       
    const tile = document.createElement("div"); 
    Object.assign(tile, {
        className: "ribbon tile pry_mgn pry_pad"
    });

    const checkboxId = `checklist-${Date.now()}`; // unique ID

    tile.innerHTML = `
        <div class="title-area">
            <input type="checkbox" id="${checkboxId}" class="change">
            <div class="expand">
                <p id="title-text">${list.title}</p>
            </div>        
            <button type="button">
                <img src='${importantIcon}'>
            </button>
        </div>
        <div class="other-details"></div>`;  

    mainArea.appendChild(tile); 

    const expand = tile.querySelector(".expand");
    const checkBox = tile.querySelector(`#${checkboxId}`);

    // Pass the tile to addTaskDetails
    expand.addEventListener("click", () => addTaskDetails(tile));

    checkBox.addEventListener("change", function () {
        updateTask(checkboxId);      
        tile.querySelector("#title-text").classList.add("strikethrough"); 
        mainArea.removeChild(tile); 
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
        createTaskTile(lastAddedList);

        inputElement.value = "";
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
    ribbon2.innerHTML = "";
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

    lastAddedList = allTasks[0].groupLists[allTasks[0].groupLists.length - 1];

    rightMain.innerHTML = `
        <div id="list_header" class="details">
            <span>
                <button type="type">
                    <input type="checkbox" id="checklist2" class="change">
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
                    {value: "",  label: "Select Priority"},
                    {value: "Top priority",  label: "Top priority"},
                    {value: "Medium priority",  label: "Medium priority"}, 
                    {value: "Low priority",  label: "Low priority"} 
                ]
            })
        }

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
        </div>`

    main.append(leftMain, rightMain);
    leftMain.append(ribbon, ribbon2, tile);
    mainArea.appendChild(main);

    // Add date created
    const formattedCreatedDate = `${format(lastAddedList.dateCreated, "eeee")}, ${format(lastAddedList.dateCreated, "MMMM d, yyyy")}`;
    main.querySelector(".date_created").innerHTML = `<p>${formattedCreatedDate}</p>`;

    // Corrected textarea selector
    const textareaInputs = document.querySelectorAll("textarea");
    textareaInputs.forEach(textarea => {
        textarea.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                const fieldFilled = this.getAttribute("id");
                updateTask(fieldFilled);
            }
        });
    });

    // Change event listeners for fields with .change
    const changeElements = document.querySelectorAll(".change");
    changeElements.forEach(element => {
        element.addEventListener("change", function () {
            const detailField = this.getAttribute("id");
            updateTask(detailField);
        });
    });
}



// Method to update the created list. 
function updateTask(listProperty) {    
    const addedDetails  = document.createElement("p"); 
    document.querySelector(".other-details").append(addedDetails); 

    const details = document.getElementById(listProperty)
    if (listProperty === "checklist") {
        lastAddedList[listProperty] = details.checked; 
    } else {
        lastAddedList = allTasks[0].groupLists[allTasks[0].groupLists.length - 1 ];
        lastAddedList[listProperty] = details.value;
    } 
    details.disabled = true; 

    
    addedDetails.textContent = lastAddedList[listProperty]; // Add updated details to tile
   
    if (listProperty === "dueDate") {                     // Reset the inputs
        details.value = format(new Date(), "yyyy-MM-dd")
    } else if (listProperty === "priority") {
        
    } else {
        details.value = details.ariaPlaceholder;
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