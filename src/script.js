// DOM STUFFS

// Header Section
// The Search bar

import allTasks from "./module.js";
import calendarIcon from "./images/calendar.png"; 
import sortIcon from "./images/arrow.png"; 
import priorityIcon from "./images/priority_flag.png"; 
import originDateIcon from "./images/creation.png"; 
import categoryIcon from "./images/category.png"; 
import { addNewTodo,addNewFolder } from "./module.js";


import { clearMainArea, reLoadMainArea } from "./module2";

const mainArea = document.querySelector(".main_area");

// Add input events to the inputs
const inputs = document.querySelectorAll("input"); 
for (let i = 0; i < inputs.length; i++ ) {
    inputs[i].addEventListener("input", function() {
        
        const inputClicked = this.getAttribute("type"); 

        checkItemClicked(inputClicked); 

    });
    
}


function search() {
    const searchInput = document.querySelector("input[type = 'search']"); 
    
    let searchItem = searchInput.value.trim();     
        
    clearMainArea(); 

    if (searchItem.length < 1) {
        mainArea.innerHTML = `<p>Searching for " "</p>`; 
    } else {
    mainArea.innerHTML = 
    `<p>Searching for "${searchItem}"</P>`
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
          <h3>Tasks</h3>
          <div class = "task_details">
            <p>${task.title}
            <p>Deadline: ${task.dueDate}</p>
          </div>
        `;
        mainArea.appendChild(taskElement);
    });
}


    // Click anywhere you to get the main area back, if you dont want to search again
    // function retoreMainArea() {
    //     if (searchItem.length < 1 ) {
    //         document.firstElementChild.addEventListener("click", function() {
    //             reLoadMainArea(); 
    //         })
    //     }
    // }
    


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
        case "search":
            search(); 
        break; 
        case "text": 
            addNewTask(); 
        case "checkbox":
            tickTask(); 
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



const addTask = document.querySelector("input[type = 'text']"); 
addTask.addEventListener("input", function(){
    const listTitle = addTask.value.trim(); 

    const addBtn = document.querySelector("button[type = 'submit']");
    addBtn.addEventListener("click", function(e) {
        e.preventDefault(); 
        addNewTodo(listTitle); 
    })

})

console.log(allTasks); 





// There are going to be lots of event listeners, so we dont 
// need to run them individually. 




