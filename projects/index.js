function fadeToPage(page) {
    fadeOut(document.getElementById("projectList"), function (){
        document.getElementById("projectList").remove();
        window.location.href = "/projects/" + page
    })
}

function fadeOut(div, _callback) {
    setInterval(fade, 50);
    function fade() {
        let opacity;
        let intervalID = 0;
        opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"));
        if (opacity > 0) {
            opacity -= 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
            _callback();
        }
    }
}

function fadeIn(div) {
    setInterval(fade, 50);
    function fade() {
        let opacity;
        let intervalID = 0;
        opacity = Number(window.getComputedStyle(div).getPropertyValue("opacity"));
        if (opacity < 1) {
            opacity += 0.1;
            div.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }
}