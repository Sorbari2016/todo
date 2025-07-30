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
import { clearMainArea,mainArea, sortIcon} from "./module2";
import { addButtonTask } from "./javaScript.js";


// The search, & first text inputs. 

// Add input events to the search input
const searchInput = document.querySelector("input[type = 'search']"), 
textInput = document.querySelector("input[type = 'text']"); 

 
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
                    className:"ribbon tile pry_mgn pry_pad"
                })             
    tile.innerHTML = `
        <div class = "title-area">
            <input type = "checkbox" id = "checklist" class = "change">
            <div class = "expand">
                <p id = title-text>${list.title}</p>
            </div>        
            <button type = "button">
                <img src = '${importantIcon}'>
            </button>
        </div>
        <div class = "other-details">
        </div>`  
    mainArea.appendChild(tile); 
    expand = document.querySelector(".expand"), checkBox = document.querySelector("#checklist")    
    expand.addEventListener("click", addTaskDetails); // Add a click event to the tile created dynamically
    checkBox.addEventListener("change", function() {
        const checkboxID = this.id;
        updateList(checkboxID);      
        tile.querySelector("#title-text").classList.add("strikethrough"); 
        mainArea.removeChild(tile); 
    }); 
}


addNewTask(); 

// Method to add new list to main area
function addNewTask(){
    document.addEventListener("keydown", function(event) {  // Add keydown event,listen for Enter

        if (event.key === 'Enter') {
            createTask();                
        }
    })
    
    const addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click", function(event){ //Add click event, listen to click on 'Add' button
        createTask(); 
    }); 

}


function createTask() {
    if (textInput.value.length > 1 ) { 
                
        addNewTodo(textInput.value.trim());
        
        lastAddedList = allTasks[0].groupLists[allTasks[0].groupLists.length - 1 ]; 
        createTaskTile(lastAddedList); 

        textInput.value = " "; 
        
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
function addTaskDetails() {
    expand.removeEventListener("click", addListDetails); // Remove click event from the tile 
    const tile = document.querySelector(".tile"); 
    tile.style.height   = "10rem"; 
    document.querySelector(".title-area p").style.fontWeight = "bold"; 

    const ribbon2 = document.querySelector(".ribbon2");
    ribbon2.innerHTML = " ";
    ribbon2.innerHTML =
    `<div class = "ribbon ribbon4 item pry_mgn sdy_pad">
            <button class = "btn click">  
                <img src = "${plusIcon}" alt = "add icon"> 
                Add a New Task
                </button> 
            </div>`

    const ribbon = document.querySelector(".ribbon")

    const main = document.createElement("div"),
    leftMain = document.createElement("div"), 
    rightMain = document.createElement("div"); 


    main.classList.add("main"), leftMain.classList.add("left_main"), 
    rightMain.classList.add("right_main"); 

    lastAddedList = allTasks[0].groupLists[allTasks[0].groupLists.length - 1 ];   
    
    rightMain.innerHTML = 
    `<div id = "list_header" class = "details">
        <span>
            <button type = "type">
                <input type = "checkbox" id = "checklist2" class = "change">
            </button>
            <h4>${lastAddedList.title}</h4>
            <img src = "${importantIcon}">
        </span> 
    </div>
    <div class = "details">
        <span> 
            <button type = "button"> 
                <img src = "${descriptionIcon}">
            </button>
            <input type = "textarea" id = "description" placeholder = "Description">
        </span>
    </div>
    <div class = "details">
        <span> 
            <button type = "button"> 
                <img src = "${calendarIcon}">
            </button>
            <input type = "date" id = "dueDate" class = "change">
        </span>
    </div>
    <div class = "details">
        <span> 
            <button type = "button"> 
                <img src = "${notesICon}">
            </button>
            <input type = "textarea" id = "note" placeholder = "Add Note">
        </span>
    </div>
    <div class = "details">
        <span> 
            <button type = "button"> 
                <img src = "${priorityIcon}">
            </button>
            <select id = "priority" class = "change">
                <option value = "none"></option>
                <option value ="Top priority">Top priority</option>
                <option value ="Medium priority">Medium priority</option>
                <option value = "Low priority">Low priority</option>
            </select>
        </span>
    </div>
    <hr/>
    <div id = "footer">
        <footer>
            <span>
                <div class = "date_created">
                </div>
                <button type = "button">
                    <img src = "${deleteIcon}">
                </button> 
            </span>
        </footer>
    </div>
    `

    mainArea.appendChild(main); 

    main.append(leftMain, rightMain); 
    leftMain.append(ribbon, ribbon2, tile);

    // Add Date created
    main.querySelector(".date_created").innerHTML = 
        `<p>${lastAddedList.dateCreated}</p>`


    // Add keyboard event to save a details 
    const textareaInputs = document.querySelectorAll("input[type = 'textarea']"); 
    for (let i = 0; i < textareaInputs.length; i++) {
        textareaInputs[i].addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
    
                const fieldFilled = this.getAttribute("id"); 
                updateTask(fieldFilled); 
            }
        })
    }

    // Add change events
    const changeElements = document.querySelectorAll(".change"); 
    for (let i = 0; i < changeElements.length; i++) {
        changeElements[i].addEventListener("change", function(){
        const detailField = this.getAttribute("id"); 

        updateTask(detailField); 
    })
  }

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


export {checkItemClicked, priorityIcon,textInput, lastAddedList, providedTitle, mainAreaClicks, addNewTask,createTaskTile} 