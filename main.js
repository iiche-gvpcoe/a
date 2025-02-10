// window.addEventListener("scroll", navColorChange)

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
    
    
    
function navColorChange() {
let nav = document.getElementsByTagName('nav')[0];
let header = document.getElementsByTagName("Header")[0];

if (window.scrollY > header.scrollHeight) {
    nav.classList.add("scrolled");
} else {
    nav.classList.remove("scrolled");
} };

