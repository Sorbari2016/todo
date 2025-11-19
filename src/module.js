// APP LOGIC I

// Imports
import { format } from "date-fns";
 

// Models
class Todo {
  constructor(title, description, dueDate, note, priority) {
    this.dateCreated = format(new Date(), "MM/dd/yyyy");
    this.title = title;
    this.description = description;
    this.dueDate =
      dueDate instanceof Date
        ? format(dueDate, "MM/dd/yyyy")
        : dueDate;
    this.note = note;
    this.priority = priority;
  }

  // Restore base Todo fields from parsed JSON
   static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.note,
      data.priority
    );
    todo.dateCreated = data.dateCreated
    return todo;
  }
}

class TodoList extends Todo {
  constructor(title, description, dueDate, note, priority, checklist) {
    super(title, description, dueDate, note, priority);
    this.checklist = checklist;
  }

   // Restore TodoList INCLUDING inherited Todo props
  static fromJSON(data) {
    const restored = new TodoList(
      data.title,
      data.description,
      data.dueDate,
      data.note,
      data.priority,
      data.checklist
    );

    restored.dateCreated = data.dateCreated; 
    return restored;
  }

  priorityLevel() {
    const map = {
      high: "Top priority",
      medium: "Medium priority",
      low: "Low priority",
    };
    return map[this.priority] || "Invalid priority";
  }

  checkOptions() {
    return this.checklist ? "Completed" : "Not completed";
  }

  listDetails() {
    return [
      this.dateCreated,
      this.title,
      this.description,
      this.dueDate,
      this.note,
      this.priorityLevel(),
      this.checkOptions()
    ].join(", ");
  }
}

class Folder {
  constructor(title) {
    this.title = title;
    this.lists = [];
  }
}

class NewFolder extends Folder {
  constructor(title) {
    super(title);
  }

  folderLists() {
    return this.lists;
  }
}

class GroupedTasks {
  constructor(groupTitle) {
    this.groupTitle = groupTitle;
    this.groupLists = new Array(); 
  }
}

// Task Manager Data Store
const allTasks = [];

// Group Setup
function addGroupedTasks(groupTitle) {
  const newGroup = new GroupedTasks(groupTitle);
  allTasks.push(newGroup);
}

addGroupedTasks("combinedTasks");
addGroupedTasks("project");
addGroupedTasks("userProjects");
addGroupedTasks("completedTasks");
addGroupedTasks("uncompletedTasks");
addGroupedTasks("upcomingTasks");
addGroupedTasks("todaysTasks");

function addNewFolder(title) {
  const folder = new NewFolder(title);
  allTasks[2].groupLists.push(folder);
  return folder;
}

function addNewTodo(
  title,
  description = " ",
  dueDate = format(new Date(), "MM/dd/yyyy"),
  note = " ",
  priority = "medium",
  checklist = false,
  projectName = "project"
) {
  const task = new TodoList(title, description, dueDate, note, priority, checklist);

  allTasks[0].groupLists.push(task); // Combined tasks

  if (checklist) {
    allTasks[3].groupLists.push(task); // Completed tasks
  } else {
    allTasks[4].groupLists.push(task); // Uncomplted tasks
  }

  if (projectName !== "project") {
    const targetFolder = allTasks[2].groupLists.find(folder => folder.title === projectName);
    if (targetFolder) {
      targetFolder.lists.push(task);
    } else {
      alert(`${projectName} does not exist`);
    }
  } else {
    allTasks[1].groupLists.push(task);
  }
  saveToLocalStorage(); 

  return task;
}



// Create method to save lists to localStorage
function saveToLocalStorage() {
  try {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
  } catch (err) {
    console.error("Failed to save allTasks:", err);
  }
}


// Create method to load lists from localStorage
function loadFromLocalStorage() {
  const raw = localStorage.getItem("allTasks");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);

    parsed.forEach(group => {
      group.groupLists = group.groupLists.map(obj => TodoList.fromJSON(obj));
    });

    // Mutate imported allTasks array instead of reassigning
    allTasks.length = 0;
    allTasks.push(...parsed);

  } catch (err) {
    console.error("Failed to load or parse allTasks from localStorage:", err);
  }
}
 

loadFromLocalStorage();


// Only add demo/test data if no saved data exists
if (allTasks[0].groupLists.length === 0) {
  const firstFolder = addNewFolder("Music");
  const firstTask = addNewTodo("Finish Web Dev", "Before the end of the year", "07/07/2025", "I will be really happy", "medium", false);
  const secondTask = addNewTodo("Marry");
  addNewTodo("Pray","", new Date(), "",  "", true);
}



// Debug
console.log(allTasks[0].groupLists);

console.log(allTasks); 

// Exports
export { allTasks, addNewFolder, addNewTodo};
export default saveToLocalStorage; 
