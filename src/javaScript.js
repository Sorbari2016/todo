// SIDEBAR DOM STUFF

// IMPORTS 
import { checkItemClicked, priorityIcon,createTaskTile } from "./script";
import { clearMainArea, mainArea, reLoadMainArea, currentDay, now}  from "./module2";
import { addNewTodo } from "./module";
import allTasks from "./module";
import { format, compareAsc } from "date-fns";

// Add Event delegation on the sidebar top section
document.querySelector(".upper_section").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const buttonID = event.target.getAttribute("id")
        if (buttonID === "tasks") {
            checkItemClicked(buttonID); 
        } else  {
            clearMainArea(); 
            queryAllTasks(allTasks[0].groupLists, buttonID); 
        }
        
    }
});


// Create Sidebar 'Add Task' Button Method 
function addButtonTask() {
    clearMainArea();
    const list = mainArea.createElement("div"); 
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
            <textarea id = "notes" placeholder = "Note">
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
    list.querySelectorAll("button[type = 'button']").forEach((button) => {    
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

// Track today's date. 
now.setHours(0, 0, 0, 0); 

// Create a method to handle the Upcoming, Completed, & Today sections of the sidebar. 
function queryAllTasks(array, sectionID) {
    let filteredList, listDueDate; 
    if (sectionID === "upcoming_tasks") {
        filteredList = array.filter(function(list){  // first filter for upcoming tasks.   
            listDueDate = new Date(list.dueDate);
            listDueDate.setHours(0, 0, 0, 0);  
            return listDueDate > now; 
        })
    } else if (sectionID === "completed_tasks") {
        filteredList = array.filter(function(list){
            const listChecklist = list.checklist; 
            return listChecklist === true; 
        })
    } else {
        filteredList = array.filter(function(list) {
            listDueDate = new Date(list.dueDate);
            listDueDate.setHours(0, 0, 0, 0); 
            return listDueDate.getTime() === now.getTime(); 
        })
    }

    if (filteredList) {
        filteredList.forEach(function(task) {
            listTile(task); 
        });
    }

    return filteredList 
} 



// update the number of tasks 
getNumberofTasks(); 

function getNumberofTasks() {
    document.querySelector("#no_of_comp").textContent = allTasks[3].groupLists.length;
    document.querySelector("#no_of_up").textContent = allTasks[5].groupLists.length
    document.querySelector("#no_of_tod").textContent = allTasks[6].groupLists.length
}


addNewTodo("Pray","", new Date(), "",  "", true); 

export {addButtonTask}



