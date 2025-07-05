// DOM STUFFS

// Header Section
// The Search bar

import allTasks from "./module.js";
import calendarIcon from "./images/calendar.png"; 
import sortIcon from "./images/arrow.png"; 
import priorityIcon from "./images/priority_flag.png"; 
import originDateIcon from "./images/creation.png"; 
import categoryIcon from "./images/category.png"; 


import { clearMainArea, reLoadMainArea } from "./module2";



const searchInput = document.querySelector("input[type = 'search']"); 



searchInput.addEventListener("input", function(){
    let searchItem = searchInput.value.trim();     

    const mainArea = document.querySelector(".main_area");
        
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

    // Click anywhere you to get the main area back, if you dont want to search again
    function retoreMainArea() {
        if (searchItem.length < 1 ) {
            document.firstElementChild.addEventListener("click", function() {
                reLoadMainArea(); 
            })
        }
    }
    
    retoreMainArea();
})

// The Main area Section
// Sort icon

const sort = document.querySelector('#sort'); 
sort.addEventListener("click", function() { 
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
}) 

// The Group icon
const group = document.getElementById("group"); 
group.addEventListener("click", function() {
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
})




// There are going to be lots of event listeners, so we dont 
// need to run them individually. 




