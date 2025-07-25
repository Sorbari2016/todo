// APP LOGIC II 

// Import the images 
import sunnyIcon from './images/sunny.png'; 
import sortIcon from "./images/arrow.png"; 
import folderIcon from "./images/folder.png"; 
import calendarIcon from "./images/calendar.png"; 
import bellIcon from "./images/bell.png"; 
import repeatIcon from "./images/repeat.png"; 
import { format, compareAsc } from "date-fns";
import {mainAreaClicks, addNewTask,textInput, providedTitle, lastAddedList} from "./script";
import allTasks from './module';




// Add the current day, & Date to the main area
const thisDay = format(new Date(), "eeee");
const currentDate = format(new Date(), "MMMM d"); 
const currentDay = `${thisDay}, ${currentDate}`; 
const todayDate = document.querySelector(".today_date");
todayDate.textContent = currentDay; 
 

// Select the main area node
const mainArea = document.querySelector(".main_area");


function clearMainArea() {
    mainArea.innerHTML = ""; 
}

// Build the Main Area Section

function reLoadMainArea() {
    mainArea.innerHTML = `
                <div class="ribbon ribbon1 pry_mgn sdy_pad">
                    <div class="today item">
                        <img src="${sunnyIcon}" alt="sunny day icon">
                        <p>Today</p>
                    </div>
                    <div class="today_date">
                        <p></p>
                    </div>
                    <div class="right_icons">
                        <div class="rib_icon item">
                            <button id = "s" class="btn click"> 
                                <img src="${sortIcon}" alt="sort icon">
                                <p id = "sort">Sort</p>
                            </button>
                        </div>
                        <div class="rib_icon item">
                            <button id = "g" class = "btn click">
                                <img src="${folderIcon}" alt="group icon">
                                <p>Group</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="ribbon ribbon2 pry_mgn">
                    <div class="top sdy_pad">
                        <span>
                            <input type="checkbox" class ="click" id = "checkbox">
                            <input type ="text" placeholder="Add a task">
                        </span>
                    </div>
                    <hr/>
                    <div class="bottom">
                        <div class="task_icons sdy_pad item">
                            <img id = "c" class = "click" src="${calendarIcon}" alt="calendar">
                            <img id = "rm" class = "click" src="${bellIcon}" alt="notification icon">
                            <img id = "r" class = "click" src="${repeatIcon}" alt="repeat icon">
                        </div>
                        <button type="submit" id = "addBtn">Add</button>
                    </div>
                </div>
            </div>`
    mainArea.classList.add("main_area"); 
    const mainContentArea = document.getElementById("main_content_area");
    mainContentArea.appendChild(mainArea);

    mainAreaClicks(); 
    addNewTask(); 
}

// Export the functions
export {reLoadMainArea, clearMainArea, mainArea, sunnyIcon, todayDate, currentDay, sortIcon, folderIcon}; 