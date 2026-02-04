document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-button');
    themeToggle.addEventListener('click', toggleTheme);
    loadSavedTheme();
});

let themeLink = document.getElementById('theme-link') || createThemeLink();

function createThemeLink() {
    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = `/assets/css/lighttheme.css`;
    document.head.appendChild(link);
    return link;
}

function toggleTheme() {
    const currentTheme = themeLink.href.includes('lighttheme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const filename = newTheme === 'light' ? `/assets/css/lighttheme.css` : `/assets/css/darktheme.css`;

    const themeToggle = document.getElementById('theme-button');
    themeToggle.innerText = newTheme === 'light' ? 'light' : 'dark';
    
    themeLink.href = filename;
    localStorage.setItem('theme', newTheme);
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const filename = savedTheme === 'light' ? `/assets/css/lighttheme.css` : `/assets/css/darktheme.css`;

    const themeToggle = document.getElementById('theme-button');
    themeToggle.innerText = savedTheme === 'light' ? 'light' : 'dark';

    themeLink.href = filename;
}
