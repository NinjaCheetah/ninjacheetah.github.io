window.addEventListener('load', themeButtons, false);

function themeButtons() {
    showTheme();

    let lightButton = document.getElementById("lightTheme");
    let roseButton = document.getElementById("roseTheme");
    let darkButton = document.getElementById("darkTheme");
    let blackButton = document.getElementById("blackTheme");
    let neonButton = document.getElementById("neonTheme");

    lightButton.onclick = function() {
        chooseTheme("");
        return false;
    }

    roseButton.onclick = function() {
        chooseTheme("/assets/css/rose.css");
        return false;
    }

    darkButton.onclick = function() {
        chooseTheme("/assets/css/dark.css");
        return false;
    }

    blackButton.onclick = function() {
        chooseTheme("/assets/css/black.css");
        return false;
    }

    neonButton.onclick = function() {
        chooseTheme("/assets/css/neon.css");
        return false;
    }
}
function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
}
function getTheme(){
    return localStorage.getItem('theme');
}
function setTheme(theme){
    localStorage.setItem('theme', theme);
}
function chooseTheme(theme){
    swapStyleSheet(theme);
    setTheme(theme);
}
function showTheme(){
    swapStyleSheet(getTheme());
}
  