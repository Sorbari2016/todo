// SIDEBAR DOM STUFF

// IMPORTS 
import { checkItemClicked, priorityIcon } from "./script";
import { clearMainArea, mainArea, } from "./module2";
import allTasks from "./module";

// Add Event delegation on the sidebar top section
const sideBarTop = document.querySelector(".upper_section"); 

sideBarTop.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const buttonID = event.target.getAttribute("id")
        console.log(buttonID); 

        checkItemClicked(buttonID); 
    }
});

// Add Button Method 
function addButtonTask() {
    clearMainArea();
    const list = document.createElement("div"); 
    list.classList.add("list"); 

    list.innerHTML = 
    `<form action="" method="get" id = "list-form">
        <div class = "details"> 
            <span>
                <input type = "checkbox">
                <input type = "text" placeholder = "Read for 3 hours">
            </span>    
        </div>
        <div class = "details">    
            <input type = "textarea" placeholder = "Description">
        </div>
        <div class = "details">
            <input type = "date">
        </div>
        <div class = "details">
            <input type = "textarea" placeholder = "Note">
        </div>
        <div class = "details">
            <span>
                <img src = '${priorityIcon}'>
                <select>
                    <option>    
                        Priority
                    </option>
                    <option value = "Top priority">Top Priority</option>
                    <option value = "Medium priority">Medium Priority</option>
                    <option value = "Low priority">Low Priority</option>
                </select>
            </span>
        </div>
        <div class = "details"> 
            <span>
                <button type = "submit">
                Cancel
                </button>
                <button type = "submit">
                Add Task
                </button>
            </span> 
        </div> 
    
    </form>`

mainArea.appendChild(list); 
}


export {addButtonTask}
