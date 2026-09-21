// partials/script.js

// Header aur Footer load karne ka function
function loadPartial(url, placeholderId, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            const el = document.getElementById(placeholderId);
            if (!el) return;
            el.innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Partial load error:', error));
}

// Header load karo (absolute path use kiya)
loadPartial('/partials/header.html', 'header-placeholder', initHeader);

// Footer load karo
loadPartial('/partials/footer.html', 'footer-placeholder');

// Header related JavaScript functions
function initHeader() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile nav toggle
    const hamburger = document.getElementById('hamburger');
    const navMobile = document.getElementById('navMobile');
    const overlayBackdrop = document.getElementById('overlayBackdrop');

    if (hamburger && navMobile && overlayBackdrop) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMobile.classList.toggle('open');
            overlayBackdrop.classList.toggle('visible');
            document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
        });

        overlayBackdrop.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMobile.classList.remove('open');
            overlayBackdrop.classList.remove('visible');
            document.body.style.overflow = '';
        });

        // Mobile nav links par click karne se menu band ho jaye
        document.querySelectorAll('.nav-mobile a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMobile.classList.remove('open');
                overlayBackdrop.classList.remove('visible');
                document.body.style.overflow = '';
            });
        });
    }

    // Current page ke hisaab se active menu link set karo
    let currentPath = window.location.pathname;
    if (currentPath === '' || currentPath === '/') currentPath = '/index.html';
    document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
        const linkPath = new URL(link.href, window.location.origin).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}