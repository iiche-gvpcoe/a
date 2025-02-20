let navLink = document.getElementById("eventClicable");
let eventLinks = document.getElementsByClassName("eventLinks")[0];
let hideTimeout, showTimeout;

// Show event links with a delay on mouseenter
navLink.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout); // Prevent hiding if mouse re-enters quickly

    showTimeout = setTimeout(() => {
        eventLinks.style.opacity = "1";
        eventLinks.style.visibility = "visible";
        eventLinks.style.pointerEvents = "auto";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0s, pointer-events 0s 0s";
    }, 300); // Delay before showing
});

// Hide event links with a delay on mouseleave (only if user doesn't hover over eventLinks)
navLink.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0.5s, pointer-events 0s 0.5s";
    }, 1000); // Delay before hiding
});

// Prevent hiding if the mouse enters eventLinks
eventLinks.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
});

// Hide when mouse leaves eventLinks as well
eventLinks.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
    }, 1000); // Delay before hiding
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default jump

        let targetID = this.getAttribute("href");
        let targetSection = document.querySelector(targetID);
        let navHeight = document.querySelector("nav").offsetHeight; // Get navbar height

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navHeight - 10, // Offset for sticky nav
                behavior: "smooth"
            });
        }
    });
});
    
// Toggle eventLinks on click
function clickEventLinks() {
    if (eventLinks.style.opacity === "0" || eventLinks.style.opacity === "") {
        eventLinks.style.opacity = "1";
        eventLinks.style.visibility = "visible";
        eventLinks.style.pointerEvents = "auto";
    } else {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
    }
}
