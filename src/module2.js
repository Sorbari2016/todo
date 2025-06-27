// MODULA FILE


const mainArea = document.querySelector(".main_area");
const mainContentArea = document.getElementById("main_content_area"); 


function clearMainArea() {
    mainArea.innerHTML = ""; 
}

// Build the Main Area Section

function reLoadMainArea() {
     
    mainArea.innerHTML = `
        <div class="main_area">
                <div class="ribbon ribbon1 pry_mgn sdy_pad">
                    <div class="today item">
                        <img src="./images/sunny.png" alt="sunny day icon">
                        <p>Today</p>
                    </div>
                    <div class="today_date">
                        <p></p>
                    </div>
                    <div class="right_icons">
                        <div class="rib_icon item">
                            <img src="./images/arrow.png" alt="sort icon">
                            <p>Sort</p>
                        </div>
                        <div class="rib_icon item">
                            <img src="./images/folder.png" alt="group icon">
                            <p>Group</p>
                        </div>
                    </div>
                </div>
                <div class="ribbon ribbon2 pry_mgn">
                    <div class="top sdy_pad">
                        <span>
                            <input type="radio">
                            <input type="text"placeholder="Add a task">
                        </span>
                    </div>
                    <hr/>
                    <div class="bottom">
                        <div class="task_icons sdy_pad item">
                            <img src="./images/calendar.png" alt="calendar">
                            <img src="./images/bell.png" alt="notification icon">
                            <img src="./images/repeat.png" alt="repeat icon">
                        </div>
                        <button type="submit">Add</button>
                    </div>
                </div>
            </div>`

     mainContentArea.appendChild(mainArea);
}

// Export the functions
export {reLoadMainArea, clearMainArea}; 