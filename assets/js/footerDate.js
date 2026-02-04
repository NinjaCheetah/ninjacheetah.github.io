window.addEventListener('load', setFooterDate, false);

function setFooterDate() {
    let footerDate = document.getElementById("footer-date");
    footerDate.textContent = new Date().getFullYear().toString();
}
