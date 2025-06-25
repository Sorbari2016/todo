
// APP LOGIC

import { format, compareAsc } from "date-fns";


// Create a List

//Create a blueprint for the list objects
class todo {
    constructor(title, description, dueDate, note) {
     this.title = title; 
     this.description = description; 
     this.duedate = format(new Date(dueDate), "MM/dd/yyyy"); 
     this.note = note; 
    }
}

class todoPriority extends todo {
    constructor(title, description, dueDate, note, priority) {
        super(title, description, dueDate, note)
        this.priority = priority; 
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
        
}


class todoList extends todoPriority {
    constructor(title, description, dueDate, priority, note, checklist) {
        super(title, description, dueDate, note, priority);

    this.checklist = checklist;      
    }

    checkOptions() {
        let options; 
    
        if (this.checklist === "yes") {
            options = "Done"; 
        } else if ( this.checklist === "no") {
            options = "Not Done"; 
        } else {
            options = "Invalid check"; 
        }
        return options; 
    }

    listDetails() {
        return `${this.title}, ${this.description}, ${this.duedate}, ${this.note}, ${this.priorityLevel()}, ${this.checkOptions()}`; 
    }
}

// Create default directory for the different todos
const project = []; 



// Create a blueprint to create an empty folder
class folder {
    constructor(title) {
        this.title = title; 
        this.lists = []; 
    }
}


class newFolder extends folder{
    constructor(title) {
        super(title)
    }

    
    folderLists(){
        return this.lists;  
    }
}

// An Array for user defined projects
const userProjects = []; 

function addNewFolder(title) {
    const userFolder = new newFolder(title);  
    userProjects.push(userFolder)
    return userFolder;
}

// To track all the lists created
const allTasks = []; 

// Create a function to help us create a new todo and add to the default directory, or user defined. 
function addNewTodo(title, description, dueDate, priority, note, checklist, projectName = "project"){
    const newTodo = new todoList(title, description, dueDate, priority, note, checklist)
    allTasks.push(newTodo);  // Keep here, so that all can be tracked. 
    if (projectName !== "project") {
        let targetFolder; 
        
        for (let i = 0; i < userProjects.length; i++) {
            let folder = userProjects[i]; 
            if (folder.title === projectName) {
                targetFolder = folder; 

            break 
            }
        }

        if (targetFolder) {
            targetFolder.lists.push(newTodo) 
        } else {
            alert(folder + " " + projectName + " " + "does not exist"); 
        }
    } else {
        project.push(newTodo); // Default Project. 
    }   
}



const firstFolder = addNewFolder("Music"); 
const firstList = addNewTodo("Sing", 'Start a singing rehearsal', "06/03/2025","high"," i need to be good", 'yes', "Music"); 

console.log(firstFolder); 

console.log(allTasks); 
