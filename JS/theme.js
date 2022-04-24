if (window.addEventListener) // W3C standard
{
  window.addEventListener('load', themeButtons, false);
} 
else if (window.attachEvent) // Microsoft
{
  window.attachEvent('onload', themeButtons);
}

function themeButtons() {
    showTheme();

    var lightButton = document.getElementById("lightTheme");
    var roseButton = document.getElementById("roseTheme");
    var darkButton = document.getElementById("darkTheme");
    var blackButton = document.getElementById("blackTheme");
    var neonButton = document.getElementById("neonTheme");

    lightButton.onclick = function() {
        chooseTheme("");
        return false;
    }

    roseButton.onclick = function() {
        chooseTheme("/CSS/rose.css");
        return false;
    }

    darkButton.onclick = function() {
        chooseTheme("/CSS/dark.css");
        return false;
    }

    blackButton.onclick = function() {
        chooseTheme("/CSS/black.css");
        return false;
    }

    neonButton.onclick = function() {
        chooseTheme("/CSS/neon.css");
        return false;
    }
}
function swapStyleSheet(sheet) {
    document.getElementById("pagestyle").setAttribute("href", sheet);
}
function getTheme(){
    var value = localStorage.getItem('theme');
    return value;
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
  