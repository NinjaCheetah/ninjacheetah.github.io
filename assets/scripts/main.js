window.addEventListener('load', setFooterDate, false);
window.addEventListener('load', loadTheme, false);

function setFooterDate() {
    let footerDate = document.getElementById("footerDate");
    footerDate.textContent = new Date().getFullYear().toString();
}

// Load saved theme automatically on load
function loadTheme() {
    var theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-bs-theme', theme)
}

// Set the theme using the navbar item
function chooseTheme(theme){
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme);
}