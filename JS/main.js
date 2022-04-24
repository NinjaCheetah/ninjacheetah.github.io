window.addEventListener('load', setFooterDate, false);

function setFooterDate() {
    let footerDate = document.getElementById("footerDate");
    let date = new Date().getFullYear();

    footerDate.textContent = date.toString();
}