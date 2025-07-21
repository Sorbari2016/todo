
// APP LOGIC I
// Creating the bluprints, and major creation methods. 

import { format, compareAsc } from "date-fns";


// Create a List

//Create a blueprint for the list objects
class Todo {
    constructor(title, description, dueDate, note, priority) {
     this.createdDate = format(new Date(), "MM/dd/yyyy"); // store the date the list was created
     this.title = title; 
     this.description = description; 
     this.dueDate = format(new Date(dueDate), "MM/dd/yyyy"); 
     this.note = note; 
     this.priority = priority; 
    }
}


class TodoList extends Todo {
    constructor(title, description, dueDate, note, priority, checklist) {
        super(title, description, dueDate, note, priority);

    this.checklist = checklist;      
    }

    checkOptions() {
        let options; 
    
        if (this.checklist === "yes") {
            options = "Done"; 
        } else {
            options = "Not Done";
        }
        return options; 
    }

    listDetails() {
        return `${this.title}, ${this.description}, ${this.duedate}, 
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
function addNewTodo(title, description = " ", dueDate = format(new Date(), "MM/dd/yyyy"), note = " ", priority = "medium",  checklist = "no", projectName = "project"){
    const newTodo = new TodoList(title, description, dueDate, note, priority, checklist)
    allTasks.push(newTodo);  // Keep here, so that all can be tracked. 
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
const firstList = addNewTodo("Sing", 'Start a singing rehearsal', "06/03/2025"," i need to be good", "high", 'yes', "Music");
const secondList = addNewTodo("Invent"); 
export default allTasks; 
export {addNewFolder, addNewTodo}; 


