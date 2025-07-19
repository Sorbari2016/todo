// SIDEBAR DOM STUFF

// IMPORTS 
import { checkItemClicked } from "./script";

// Add Event delegation on the sidebar top section
const sideBarTop = document.querySelector(".upper_section"); 

sideBarTop.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        buttonID = event.target.getAttribute("id")

        checkItemClicked(buttonID); 
    }
});


