function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            const navMenu = document.getElementById('navMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});