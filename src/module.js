// APP LOGIC I

// Imports
import { format } from "date-fns";

// Models
class Todo {
  constructor(title, description, dueDate, note, priority) {
    this.dateCreated = format(new Date(), "MM/dd/yyyy");
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
    this.groupLists = [];
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
    allTasks[3].groupLists.push(task);
  } else {
    allTasks[4].groupLists.push(task);
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

  return task;
}

// Test Data
const firstFolder = addNewFolder("Music");
const firstTask = addNewTodo("Finish Web Dev", "Before the end of the year", "07/07/2025", "I will be really happy", "medium", false);
const secondTask = addNewTodo("Marry");

// Debug
console.log(allTasks[0].groupLists);

// Exports
export default allTasks;
export { addNewFolder, addNewTodo };
