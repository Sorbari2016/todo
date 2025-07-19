// SIDEBAR DOM STUFF

document.querySelector(".upper_section").addEventListener("click", function(event) {
    if (event.target.tagName === "DIV") {
        const divClass = event.target.getAttribute("class")
        console.log(divClass + " " + "was clicked"); 
    }
});
