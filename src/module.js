
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

    todoListDetails() {
        return `${this.title}, ${this.description}, ${this.duedate}, ${this.note}, ${this.priorityLevel()}, ${this.checkOptions()}`; 
    }
}

// Create default directory for the different todos
const project = []; 

// Create a function to help us create a new todo and add to the default directory
function addNewTodo(title, description, dueDate, priority, note, checklist){
    const newTodo = new todoList(title, description, dueDate, priority, note, checklist)
    project.push(newTodo);  
}

console.log(project); 

addNewTodo("Fuck", "Fuck Suanle well", "12/06/2025", "high", 'I will do it', "yes"); 


// Create a blueprint to create an empty folder
class folder {
    constructor(name) {
        this.name = name; 
    }
}

class newFolder extends folder{
    constructor(name) {
        super(name)
    }
    
    folderList(){
        const listOfTodos = []; 
        return listOfTodos; 
    }
}


function addNewFolder(name) {
    const userFolder = new newFolder(name);  
    return userFolder;  
}

