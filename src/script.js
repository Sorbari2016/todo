// DOM STUFFS

// Import statements
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
import { format, compareAsc } from "date-fns";
import { clearMainArea,mainArea, sortIcon} from "./module2";
import { constructFromSymbol } from "date-fns/constants";


// Header Section
// The Search bar

// Add input events to the search and text inputs
const searchInput = document.querySelector("input[type = 'search']"), 
textInput = document.querySelector("input[type = 'text']"); 

const mainInputs = [searchInput, textInput]; 
 
for (let i = 0; i < mainInputs.length; i++ ) {
    mainInputs[i].addEventListener("input", function() {

        const inputClicked = this.getAttribute("type"); 

        checkItemClicked(inputClicked); 
    });        
    
}
 

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

    const matchingTasks = allTasks.filter(taskMatches)

    matchingTasks.forEach(function(task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task_item");
        taskElement.innerHTML = `
          <div class = "task_details">
            <input type = "checkbox"> 
            <p>${task.title}
            <p>Deadline: ${task.dueDate}</p>
          </div>
        `;

        mainArea.appendChild(taskElement); 
    });
}

//Track if tile has been clicked
let tileClick = false; 



// Create and select a third ribbon, append to main area.
const container = document.createElement("div"); 
                Object.assign(container, {
                    className:"ribbon ribbon3 pry_mgn pry_pad"
                })
mainArea.appendChild(container); 
container.style.visibility = "hidden"; 


 const tile = document.querySelector(".ribbon3"); 


// Function to add new list to main area
addNewTask();



function addNewTask(){
    document.addEventListener("keydown", function(event) {

        if (event.key === 'Enter') {
            if (textInput.value.length > 1 ) { 
                            
                addNewTodo(textInput.value.trim());  
                addListTile(); 
        
                textInput.value = " "; 
                
            }        
        }
    })
    
    const addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click", function(event){
                
        addNewTodo(textInput.value.trim()); 
        addListTile();
        
        textInput.value = " "; 
        
    }); 

    function addListTile() { 
        // Track last added list, and the last input.
        const lastAddedList = allTasks[allTasks.length - 1 ], 
        providedTitle = textInput.value.trim();        
            if (lastAddedList.title === providedTitle ) { 
                container.style.visibility = "visible"; 
                container.innerHTML = `
                <div class = "list-title">
                    <div class = "title item">
                        <input type = "checkbox"> 
                        <p>${lastAddedList.title}</p>
                    </div>
                    <button type = "button">
                        <img src = '${importantIcon}'>
                    </button>
                </div>
                <div class = "other-details">
                </div>`

                // Add a click event to the tile created dynamically
                    tile.addEventListener("click", addListDetails); 
            }
        
            
        
    }

}



// Add click events to the main area click items 
const mainUtilities = document.querySelectorAll(".click"); 
for (let i = 0; i < mainUtilities.length; i++) {
    mainUtilities[i].addEventListener("click", function() {
        const itemClicked = this.getAttribute("id"); 
        checkItemClicked(itemClicked); 
    })
}

// Track the most recent added list
let lastAddedList; 

//To view/Add list details
function addListDetails() {
    // Remove click event from the tile 
    tile.removeEventListener("click", addListDetails); 

    const ribbon2 = document.querySelector(".ribbon2");
    ribbon2.innerHTML = " ";
    ribbon2.innerHTML =
    `<div class = "ribbon ribbon4 item pry_mgn sdy_pad">
            <button class = "btn click">  
                <img src = "${plusIcon}" alt = "add icon"> 
                Add a New Task
                </button> 
            </div>`

    const ribbon = document.querySelector(".ribbon"), 
    ribbon3 = document.querySelector(".ribbon3");

    const main = document.createElement("div"),
    leftMain = document.createElement("div"), 
    rightMain = document.createElement("div"); 


    main.classList.add("main"), leftMain.classList.add("left_main"), 
    rightMain.classList.add("right_main"); 

    lastAddedList = allTasks[allTasks.length -1 ];   
     

    rightMain.innerHTML = 
    `<div id = "list_header" class = "details">
        <span>
            <button type = "type">
                <input type = "checkbox" id = "checklist" class = "change">
            </button>
            <p>${lastAddedList.title}</p>
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
            <input type = "date" placeholder ="Add Due Date" class = "change">
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
                <option value ="top">Top priority</option>
                <option value "medium">Medium priority</option>
                <option value = "low">Low priority</option>
            </select>
        </span>
    </div>
    <hr/>
    <div id = "footer">
        <footer>
            <span>
                <div class = "date_created">
                    <p></p>
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
    leftMain.append(ribbon, ribbon2, ribbon3); 

    const textareaInputs = document.querySelectorAll("input[type = 'textarea']"); 

    // Add keyboard event to save a details 
    for (let i = 0; i < textareaInputs.length; i++) {
        textareaInputs[i].addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
    
                const fieldFilled = this.getAttribute("id"); 
                updateList(fieldFilled); 
            }
        })
    }

    // Add change events
    const changeElements = document.querySelectorAll(".change"); 
    for (let i = 0; i < changeElements.length; i++) {
        changeElements[i].addEventListener("change", function(){
            const detailField = this.getAttribute("id"); 

            updateList(detailField); 
        })
    }

    function updateList(listdetails) {

        const otherDetails = document.querySelector(".other-details"), addedDetails 
        = document.createElement("p"); 
        otherDetails.append(addedDetails); 

        const details = document.getElementById(listdetails)
        lastAddedList = allTasks[allTasks.length -1]; 
        lastAddedList[listdetails] = details.value; 
         

        switch (listdetails) {
            case "description":     
                details.value = details.ariaPlaceholder;    
                addedDetails.textContent = lastAddedList[listdetails];       
                break;
                case "note":     
                details.value = details.ariaPlaceholder;    
                addedDetails.textContent = lastAddedList[listdetails];       
                break;
            default:
                break;
        }

    }
   
    

}



// Function to checked the button click,and run listener 
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
        default:
        break;
    }
}

// The Main area Section
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


console.log(allTasks); 





