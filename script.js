// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. NAVEGAÇÃO SUAVE (Smooth Scroll)
    // ==========================================================================
    const linksMenu = document.querySelectorAll('nav ul li a, .btn, .back-to-top');

    linksMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Só aplica smooth scroll para links internos
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Desconto da altura do cabeçalho fixo
                    const headerHeight = document.querySelector('header').offsetHeight;
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - headerHeight + 10,
                        behavior: 'smooth'
                    });
                    
                    // Fecha o menu mobile após clicar
                    const nav = document.querySelector('header nav');
                    nav.classList.remove('active');
                }
            }
        });
    });

    // ==========================================================================
    // 2. MENU MOBILE (Hamburger)
    // ==========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('header nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterna o ícone entre barras e X
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // ==========================================================================
    // 3. BARRA DE PROGRESSO DE SCROLL
    // ==========================================================================
    const progressBar = document.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', () => {
        if (progressBar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // ==========================================================================
    // 4. BOTÃO VOLTAR AO TOPO
    // ==========================================================================
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 5. MARCAÇÃO DO LINK ATIVO NO MENU
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');

    function highlightActiveLink() {
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Chama uma vez ao carregar

    // ==========================================================================
    // 6. VALIDAÇÃO E ENVIO DO FORMULÁRIO
    // ==========================================================================
    const formulario = document.querySelector('form');
    
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();

            if (nome === '' || email === '' || mensagem === '') {
                showToast('Por favor, preencha todos os campos obrigatórios!', 'error');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                showToast('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            console.log('Dados enviados:', { nome, email, mensagem });
            showToast(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, 'success');
            formulario.reset();
        });
    }

    // Função para mostrar notificações bonitas (substitui os alerts)
    function showToast(message, type = 'success') {
        // Remove toast anterior se existir
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Estilo do toast
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #2d6a4f, #52b788)' : 'linear-gradient(135deg, #e76f51, #f4a261)'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ==========================================================================
    // 7. EFEITO DE REVELAÇÃO AO ROLAR (Scroll Reveal)
    // ==========================================================================
    const revealElements = document.querySelectorAll(
        'section, .tech-card, .solution-card, .stat-card, .answer-card, .chart-card, .icon-box, .flashcard'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 8. CONTADORES ANIMADOS (Stats)
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const statsSection = document.querySelector('.stats-container');
        if (!statsSection) return;

        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;

        if (statsPosition < screenPosition) {
            countersAnimated = true;

            counters.forEach(counter => {
                const target = parseFloat(counter.parentElement.parentElement.getAttribute('data-count'));
                const isDecimal = target % 1 !== 0;
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        if (isDecimal) {
                            counter.innerText = current.toFixed(1);
                        } else if (target >= 1000000) {
                            counter.innerText = Math.floor(current / 1000000) + 'M';
                        } else {
                            counter.innerText = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isDecimal) {
                            counter.innerText = target.toFixed(1);
                        } else if (target >= 1000000) {
                            counter.innerText = '1M';
                        } else {
                            counter.innerText = target;
                        }
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    // ==========================================================================
    // 9. ANIMAÇÃO DOS GRÁFICOS DE BARRAS
    // ==========================================================================
    const chartBars = document.querySelectorAll('.chart-bar');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.style.transition = 'width 1.5s ease-out';
            }
        });
    }, { threshold: 0.3 });

    chartBars.forEach(bar => {
        bar.style.width = '0%'; // Começa em 0
        chartObserver.observe(bar);
    });

    // ==========================================================================
    // 10. FLASHCARDS INTERATIVOS
    // ==========================================================================
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        // Efeito visual ao passar o mouse
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });

        // Suporte para teclado (acessibilidade)
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Flashcard - clique para virar');

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });

    // ==========================================================================
    // 11. EFEITO PARALLAX SUAVE NO HERO
    // ==========================================================================
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');

    if (heroSection && heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroTop = heroSection.offsetTop;
            const heroHeight = heroSection.offsetHeight;
            
            // Aplica parallax apenas quando o hero está visível
            if (scrolled < heroTop + heroHeight) {
                const parallaxSpeed = 0.3;
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ==========================================================================
    // 12. EFEITO DE HOVER NOS CARDS DE TECNOLOGIA
    // ==========================================================================
    const techCards = document.querySelectorAll('.tech-card');
    
    techCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ==========================================================================
    // 13. ADICIONA CLASSE DE ANIMAÇÃO PARA O CSS
    // ==========================================================================
    // Adiciona a animação slideOutRight (usada no toast)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);

    // ==========================================================================
    // 14. EFEITO DE ESCRITA NO HERO (Opcional - Descomente se quiser)
    // ==========================================================================
    /*
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                heroSubtitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 800);
    }
    */

    console.log('🌱 Agro Forte - Site carregado com sucesso!');
});
