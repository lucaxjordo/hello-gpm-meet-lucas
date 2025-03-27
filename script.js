document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    
    // Abrir/fechar menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Adiciona evento para fechar menu com a tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Fechar menu ao clicar no overlay
    sidebarOverlay.addEventListener('click', function() {
        closeMenu();
    });
    
    // Fechar menu ao clicar em um item (exceto Contato)
    document.querySelectorAll('.sidebar ul li:not(:last-child) a').forEach(item => {
        item.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Comportamento especial para o link de Contato
    const contactLink = document.querySelector('.sidebar ul li:last-child a');
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
            
            // Rolar suavemente até o footer
            const footer = document.querySelector('.site-footer');
            if (!footer) {
                loadFooter();
            }
            
            setTimeout(() => {
                const footerElement = document.querySelector('.site-footer');
                if (footerElement) {
                    window.scrollTo({
                        top: footerElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
        
        const hamburger = menuToggle.querySelector('.hamburger');
        if (menuToggle.classList.contains('active')) {
            hamburger.style.transform = 'rotate(45deg)';
            hamburger.style.backgroundColor = 'transparent';
            // Atualiza aria-expanded para acessibilidade
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            hamburger.style.transform = '';
            hamburger.style.backgroundColor = '';
            // Atualiza aria-expanded para acessibilidade
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    function closeMenu() {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        
        const hamburger = menuToggle.querySelector('.hamburger');
        hamburger.style.transform = '';
        hamburger.style.backgroundColor = '';
        
        // Atualiza aria-expanded para acessibilidade
        menuToggle.setAttribute('aria-expanded', 'false');
    }

    // Inicialização do atributo aria-expanded
    menuToggle.setAttribute('aria-expanded', 'false');

    // Slider functionality
    let items = document.querySelectorAll('.slider .item');
    let next = document.getElementById('next');
    let prev = document.getElementById('prev');
    
    let active = 0;
    function loadShow() {
        let stt = 0;
        items[active].style.transform = 'none';
        items[active].style.zIndex = 1;
        items[active].style.filter = 'none';
        items[active].style.opacity = 1;
        
        for(let i = active + 1; i < items.length; i++) {
            stt++;
            items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
        
        stt = 0;
        for(let i = active - 1; i >= 0; i--) {
            stt++;
            items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
            items[i].style.zIndex = -stt;
            items[i].style.filter = 'blur(5px)';
            items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    }
    
    loadShow();
    
    // Adicionando suporte a navegação por teclado para o slider
    next.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            nextSlide();
        }
    });
    
    prev.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            prevSlide();
        }
    });
    
    // Funções para navegar nos slides
    function nextSlide() {
        active = active + 1 < items.length ? active + 1 : active;
        loadShow();
    }
    
    function prevSlide() {
        active = active - 1 >= 0 ? active - 1 : active;
        loadShow();
    }
    
    next.onclick = nextSlide;
    prev.onclick = prevSlide;
    
    // Adicionar suporte para gestos em dispositivos touch
    let touchstartX = 0;
    let touchendX = 0;
    
    const slider = document.querySelector('.slider');
    
    slider.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
    });
    
    function handleGesture() {
        if (touchendX < touchstartX) {
            nextSlide();
        }
        
        if (touchendX > touchstartX) {
            prevSlide();
        }
    }

    // Infinite scroll functionality for footer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !document.querySelector('.site-footer')) {
                loadFooter();
            }
        });
    }, { threshold: 0.1 });

    const footerTrigger = document.querySelector('#footerTrigger');
    if (footerTrigger) {
        observer.observe(footerTrigger);
    }

    function loadFooter() {
        const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <p class="footer-title">Contatos</p>
            <div class="social-links">
                <a href="https://www.instagram.com/lucaxjordo" target="_blank" class="social-link" aria-label="Meu perfil no Instagram"><img src="assets/instagram-32.png" alt="Instagram"></a>
                <a href="https://www.linkedin.com/in/lucasxoliva/" target="_blank" class="social-link" aria-label="Meu perfil no LinkedIn"><img src="assets/linkedin-6-32.png" alt="LinkedIn"></a>
                <a href="https://github.com/lucaxjordo" target="_blank" class="social-link" aria-label="Meu perfil no GitHub"><img src="assets/github-8-32.png" alt="GitHub"></a>
                <a href="https://w.app/obfdn8" target="_blank" class="social-link" aria-label="Meu contato no WhatsApp"><img src="assets/whatsapp-32.png" alt="WhatsApp"></a>
            </div>
        </div>
    `;
    document.body.appendChild(footer);
        
        // Remove o observador após carregar o footer
        observer.unobserve(footerTrigger);
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contact') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Revela elementos quando ficam visíveis durante o scroll
    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealOnScroll, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });
    
    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
});
