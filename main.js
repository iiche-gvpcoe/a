let navLink = document.getElementById("eventClicable");
let eventLinks = document.getElementsByClassName("eventLinks")[0];
let hideTimeout, showTimeout;

navLink.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);

    showTimeout = setTimeout(() => {
        eventLinks.style.opacity = "1";
        eventLinks.style.visibility = "visible";
        eventLinks.style.pointerEvents = "auto";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0s, pointer-events 0s 0s";
    }, 300);
});

navLink.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
        eventLinks.style.transition = "opacity 0.5s ease, visibility 0s 0.5s, pointer-events 0s 0.5s";
    }, 1000);
});

eventLinks.addEventListener("mouseenter", function () {
    clearTimeout(hideTimeout);
});

eventLinks.addEventListener("mouseleave", function () {
    hideTimeout = setTimeout(() => {
        eventLinks.style.opacity = "0";
        eventLinks.style.visibility = "hidden";
        eventLinks.style.pointerEvents = "none";
    }, 900); 
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();

        let targetID = this.getAttribute("href");
        let targetSection = document.querySelector(targetID);
        let navHeight = document.querySelector("nav").offsetHeight;

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: "smooth"
            });
        }
    });
});
   
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

function NavLogoVisbility() {
    const nav = document.getElementsByTagName("nav")[0];
    const navLogo = document.getElementsByClassName("navLogo")[0];
    const navRect = nav.getBoundingClientRect();
    if (navRect.top <= 0) {
        navLogo.style.display = "flex";
        nav.style.marginBottom = "2rem";
    } else {
        navLogo.style.display = "none";
        nav.style.marginBottom = "1rem";
    };
};