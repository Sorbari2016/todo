// SIDEBAR DOM STUFF

// IMPORTS 
import { checkItemClicked, priorityIcon } from "./script";
import { clearMainArea, mainArea, reLoadMainArea} from "./module2";
import { addNewTodo } from "./module";
import allTasks from "./module";

// Add Event delegation on the sidebar top section
const sideBarTop = document.querySelector(".upper_section"); 

sideBarTop.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const buttonID = event.target.getAttribute("id")

        if (buttonID === "task") {
         checkItemClicked(buttonID); 
        } else {
            queryAllTasks(); 
        }
    }
});

// Create Sidebar 'Add Task' Button Method 
function addButtonTask() {
    clearMainArea();
    const list = document.createElement("div"); 
    list.classList.add("list"); 

    list.innerHTML = 
    `<form id = "list-form">
        <div class = "details"> 
            <span>
                <input type = "checkbox">
                <input type = "text" id = "title" placeholder = "Read for 3 hours">
            </span>    
        </div>
        <div class = "details">    
            <input type = "textarea" id = "description" placeholder = "Description">
        </div>
        <div class = "details">
            <input type = "date" id = "dueDate">
        </div>
        <div class = "details">
            <input type = "textarea" id = "notes" placeholder = "Note">
        </div>
        <div class = "details">
            <span>
                <img src = '${priorityIcon}'>
                <select id = "priority">
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
                <button type = "button" id = "cancel">
                Cancel
                </button>
                <button type = "button" id = "addTask">
                Add Task
                </button>
            </span> 
        </div> 
    </form>`
    mainArea.appendChild(list);
    
    //Add a click events to the cancel, & Add Task buttons
    const addTaskButtons = document.querySelectorAll("button[type = 'button']");

    addTaskButtons.forEach((button) => {    
        button.addEventListener("click", function() {
        const buttonID = this.getAttribute("id");
  
        if (buttonID === "cancel") {
            clearMainArea();
            reLoadMainArea();
        } else {
            const newListTitle = document.getElementById("title").value;
            const newListDescription = document.getElementById("description").value;
            const newListDueDate = document.getElementById("dueDate").value;
            const newListPriority = document.getElementById("priority"); 
            const newListNotes = document.getElementById("notes").value;
            const newListCheck = document.querySelector("input[type='checkbox']").checked;
            
            let newListPriorityLevel = newListPriority.value; 

            if (newListTitle !== "") {
                if (newListPriorityLevel === "Priority") {
                    newListPriorityLevel = "medium"; 
                    addNewTodo(newListTitle,newListDescription, new Date(newListDueDate), newListNotes,newListPriorityLevel, newListCheck);
                    alert("Your List has been created ! ")
                    clearMainArea();
                    reLoadMainArea();
                } else {
                    newListPriorityLevel = newListPriority.value;
                    addNewTodo(newListTitle, newListDescription, new Date(newListDueDate), newListNotes, newListPriorityLevel, newListCheck)
                    alert("Your List has been created ! "); 
                    clearMainArea();
                    reLoadMainArea();
                }
            } else {
                alert("Your list MUST have a title"); 
            }
        }
    });
  }); 

}

// Create a method to handle the Upcoming, Completed, & Today sections of the sidebar. 
function queryAllTasks() {

    
}


export {addButtonTask}




