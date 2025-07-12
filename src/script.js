// DOM STUFFS

// Header Section
// The Search bar

import allTasks from "./module.js";
import calendarIcon from "./images/calendar.png"; 
import sortIcon from "./images/arrow.png"; 
import priorityIcon from "./images/priority_flag.png"; 
import originDateIcon from "./images/creation.png"; 
import categoryIcon from "./images/category.png"; 
import importantIcon from "./images/important_icon.png"
import { addNewTodo,addNewFolder } from "./module.js";


import { clearMainArea, reLoadMainArea } from "./module2";

const mainArea = document.querySelector(".main_area");

// Add input events to the inputs
const inputs = document.querySelectorAll("input"); 
for (let i = 0; i < inputs.length; i++ ) {
    inputs[i].addEventListener("input", getInputID)
        
}

function getInputID() {
    const inputClicked = this.getAttribute("type"); 

    checkItemClicked(inputClicked); 
}

// Remove the event Listener on the text input.
const textInput = document.querySelectorAll("input")[2]; 
textInput.removeEventListener("input", getInputID); 


function search() {
    const searchInput = document.querySelector("input[type = 'search']"); 
    
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

// Track if enter or Add button has been clicked to add new task
let addList = false; 

// Function to add new list to main area
addNewTask(); 

function addNewTask(){
    let textInput = document.querySelector("input[type = 'text']") 

    document.addEventListener("keydown", function(event) {

        if (event.key === 'Enter') {
            if (textInput.value.length > 1 ) { 

                const providedTitle = textInput.value.trim();
                            
                addNewTodo(providedTitle); 
                addListTile(); 
        
                textInput.value = " "; 
                
            }        
        }
    })
    
    const addBtn = document.getElementById("addBtn")
    addBtn.addEventListener("click", function(event){
        
        let providedTitle = textInput.value.trim();
                
        addNewTodo(providedTitle); 
        addListTile();
        
        textInput.value = " "; 
        
    }); 

    function addListTile() {
        let targetList, providedTitle = textInput.value.trim(); 
        for (let i = 0; i < allTasks.length; i++){
            let createdList = allTasks[i]; 
            if (createdList.title === providedTitle ) {
                targetList = createdList; 
                const container = document.createElement("div"); 
                container.setAttribute("class", "ribbon ribbon3"); 
                container.innerHTML = `
                        <input type = "checkbox"> 
                        <p>${targetList.title}</p>
                        <img src = '${importantIcon}'>` 
                mainArea.appendChild(container); 
            }
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
            <li class = "item pry_pd"><img src="${sortIcon}" alt = "sort icon">Aphabetically</li>
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




