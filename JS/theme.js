window.onload = function() {
    showTheme()

    var lightButton = document.getElementById("lightTheme");
    var roseButton = document.getElementById("roseTheme");
    var darkButton = document.getElementById("darkTheme");
    var blackButton = document.getElementById("blackTheme");

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
  