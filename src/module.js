
// APP LOGIC I
// Creating the bluprints, and major creation methods. 

import { format, compareAsc } from "date-fns";


// Create a List

//Create a blueprint for the list objects
class Todo {
    constructor(title, description, dueDate, note, priority) {
     this.dateCreated = format(new Date(), "MM/dd/yyyy");  // store the date the list was created
     this.title = title; 
     this.description = description; 
     this.dueDate = format(new Date(dueDate), "MM/dd/yyyy"); 
     this.note = note; 
     this.priority = priority;

    }
}

// Arrays to track completed and incomplet tasks 
const completedTasks = [], uncompletedTasks = []; 

class TodoList extends Todo {
    constructor(title, description, dueDate, note, priority, checklist) {
        super(title, description, dueDate, note, priority);

    this.checklist = checklist;      
    }

    priorityLevel() {
        let priorityStatus; 
         
          if (this.priority === "high") {
              priorityStatus = "Top priority"; 
          } else if (this.priority === "medium") {
              priorityStatus = "Medium priority"; 
          } else if (this.priority === "low") {
              priorityStatus = "Low priority"; 
          } else {
              priorityStatus = "Invalid priority"; 
          }
         
          return priorityStatus
    }

    checkOptions() {
        let options; 
    
        if (this.checklist === false ) {
            options = "Not completed"; 
        } else {
            options = "Completed"; 
        }
        return options; 
    }

    listDetails() {
        return `${this.dateCreated}, ${this.title}, ${this.description}, ${this.duedate}, 
        ${this.note}, ${this.priorityLevel()}, ${this.checkOptions()}`; 
    }
}

// Create a blueprint to create an empty folder
class Folder {
    constructor(title) {
        this.title = title; 
        this.lists = []; 
    }
}


class NewFolder extends Folder{
    constructor(title) {
        super(title)
    }

    
    folderLists(){
        return this.lists;  
    }
}

// To track all the lists created
const allTasks = [];  

// Create class to addGroupedTasks
class groupedTasks {
	constructor(groupTitle){
    	this.groupTitle = groupTitle;
        this.groupLists = [];  
    }
}

// Create function to actually add the group tasks. 
function addGroupedTasks(groupTitle) {
    const newTaskGroup = new groupedTasks(groupTitle); 
    allTasks.push(newTaskGroup); 	
}

// Create different groups of arrays
addGroupedTasks("project"); 
addGroupedTasks("userProjects");
addGroupedTasks("completedTasks");  
addGroupedTasks("uncompletedTasks");
addGroupedTasks("upcomingTasks");
addGroupedTasks("todaysTasks");


// To add a new user defined folder
function addNewFolder(title) {
    const userFolder = new NewFolder(title);  
    allTasks[1].groupLists.push(userFolder)
    return userFolder;
}


// Create a function to help us create a new todo list, and add to the default directory, or user defined. 
function addNewTodo(title, description = " ", dueDate = format(new Date(), "MM/dd/yyyy"), note = " ", priority = "medium",  checklist = false, projectName = "project"){
    const newTodo = new TodoList(title, description, dueDate, note, priority, checklist)
    allTasks[0].groupLists.push(newTodo);  // Keep here, so that all can be tracked.

    if (newTodo.checklist === true) {  // Check if the checklist is false or true, & place in app array. 
        allTasks[2].groupLists.push(newTodo); 
    } else {
        allTasks[3].groupLists.push(newTodo);
    }

    if (projectName !== "project") {
        
        let targetFolder; 
        
        for (let i = 0; i < allTasks[1].groupLists.length; i++) {  // We find the folder the user filled, and save it. 
            let folder = allTasks[1].groupLists[i]; 
            if (folder.title === projectName) {
                targetFolder = folder; 

            break 
            }
        }

        if (targetFolder) {                        // We push the list to the list ppt of the folder. 
            targetFolder.lists.push(newTodo) 
        } else {
            alert(projectName + " " + "does not exist"); 
        }
    } else {
        allTasks[0].groupLists.push(newTodo); // Default Project. 
    }  
    return newTodo;  
}

// To get all the lists
function getAllTasks() {
    return allTasks.flatMap(group => group.groupLists);
}

// Save all these lists in one variable
let allLists; 
allLists = getAllTasks();


const firstFolder = addNewFolder("Music"); 

const firstTask = addNewTodo("Finish Web Dev", "Before the end of the year", "07/07/2025", "I will be really happy", "medium", false); 
const secondTask = addNewTodo("Marry"); 

console.log(allLists);




export default allLists; 
export {addNewFolder, addNewTodo}; 
 


