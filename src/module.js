
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
        ${this.note}, ${this.priority}, ${this.checkOptions()}`; 
    }
}

// Create default directory for the different todos
const project = []; 

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

// An Array to store user defined projects
const userProjects = []; 

// To add a new user defined folder
function addNewFolder(title) {
    const userFolder = new NewFolder(title);  
    userProjects.push(userFolder)
    return userFolder;
}

// To track all the lists created
const allTasks = [];  

// Create a function to help us create a new todo list, and add to the default directory, or user defined. 
function addNewTodo(title, description = " ", dueDate = format(new Date(), "MM/dd/yyyy"), note = " ", priority = "medium",  checklist = false, projectName = "project"){
    const newTodo = new TodoList(title, description, dueDate, note, priority, checklist)
    allTasks.push(newTodo);  // Keep here, so that all can be tracked.

    if (newTodo.checklist === true) {  // Check if the checklist is false or true, & place in app array. 
        completedTasks.push(newTodo); 
    } else {
        uncompletedTasks.push(newTodo);
    }

    if (projectName !== "project") {
        
        let targetFolder; 
        
        for (let i = 0; i < userProjects.length; i++) {  // We find the folder the user filled, and save it. 
            let folder = userProjects[i]; 
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
        project.push(newTodo); // Default Project. 
    }  
    return newTodo;  
}


const firstFolder = addNewFolder("Music"); 

const firstTask = addNewTodo("Finish Web Dev", "Before the end of the year", "07/07/2025", "I will be really happy", "medium", false); 
const secondTask = addNewTodo("Marry"); 
console.log(allTasks);

console.log(completedTasks, uncompletedTasks); 

export default allTasks; 
export {addNewFolder, addNewTodo, completedTasks}; 
 


