// DOM STUFFS

// Header Section
// The Search bar

import allTasks from "./module.js";


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

    function retoreMainArea() {
        if (searchItem.length < 1 ) {
            document.firstElementChild.addEventListener("click", function() {
                reLoadMainArea(); 
            })
        }
    }
    
    retoreMainArea();
})




