if (window.addEventListener) // W3C standard
{
  window.addEventListener('load', setFooterDate, false);
} 
else if (window.attachEvent) // Microsoft
{
  window.attachEvent('onload', setFooterDate);
}

function setFooterDate() {
    var footerDate = document.getElementById("footerDate");
    let date = new Date().getFullYear();

    footerDate.textContent = date;
    
    return;
}