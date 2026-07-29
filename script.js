document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. MENU MOBILE (Responsividade Total)
    // =========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('header nav');
    const overlay = document.querySelector('.mobile-overlay');

    function toggleMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden'; // Evita scroll com menu aberto
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // =========================================================================
    // 2. BARRA DE PROGRESSO DE SCROLL
    // =========================================================================
    const progressBar = document.querySelector('.scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
        progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
    });

    // =========================================================================
    // 3. FLASHCARDS INTERATIVOS (Clique para revelar com animação fluida)
    // =========================================================================
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        // Acessibilidade: permite virar com Tecla Enter ou Espaço
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });

    // =========================================================================
    // 4. VALIDAÇÃO DO FORMULÁRIO COM ANIMAÇÕES FLUIDAS
    // =========================================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const validateField = (input, errorId, condition, message) => {
                const errorElement = document.getElementById(errorId);
                if (!condition) {
                    errorElement.textContent = message;
                    errorElement.classList.add('show');
                    input.style.borderColor = 'var(--terracota)';
                    isValid = false;
                } else {
                    errorElement.classList.remove('show');
                    input.style.borderColor = 'var(--cinza-claro)';
                }
            };

            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const assunto = document.getElementById('assunto');
            const mensagem = document.getElementById('mensagem');
            const privacidade = document.getElementById('privacidade');

            validateField(nome, 'nomeError', nome.value.trim().length >= 3, 'Insira seu nome completo (mín. 3 caracteres).');
            validateField(email, 'emailError', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Insira um e-mail válido.');
            validateField(assunto, 'assuntoError', assunto.value !== '', 'Selecione um assunto.');
            validateField(mensagem, 'mensagemError', mensagem.value.trim().length >= 10, 'A mensagem deve ter pelo menos 10 caracteres.');
            validateField(privacidade, 'privacidadeError', privacidade.checked, 'Você deve concordar com a política de privacidade.');

            if (isValid) {
                // Animação de envio
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        // Limpar erro em tempo real ao digitar
        contactForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                input.style.borderColor = 'var(--cinza-claro)';
                const errorSpan = input.parentElement.querySelector('.error-message');
                if (errorSpan) errorSpan.classList.remove('show');
            });
        });
    }

    // =========================================================================
    // 5. MODAL DE VÍDEOS (Resolve "vídeos não aparecendo")
    // =========================================================================
    const playButtons = document.querySelectorAll('.play-button, .play-button-large');
    const modalContainer = document.getElementById('modalContainer');

    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video') || 'dQw4w9WgXcQ'; // ID padrão se não houver
            const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            
            modalContainer.innerHTML = `
                <div class="modal-content video-modal">
                    <button class="modal-close" aria-label="Fechar modal">&times;</button>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
                        <iframe src="${videoUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                </div>
            `;
            modalContainer.classList.add('active');
            modalContainer.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fechar modal
    const closeModal = () => {
        modalContainer.classList.remove('active');
        modalContainer.setAttribute('aria-hidden', 'true');
        modalContainer.innerHTML = ''; // Limpa o iframe para parar o áudio
        document.body.style.overflow = '';
    };

    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer || e.target.classList.contains('modal-close')) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer?.classList.contains('active')) {
            closeModal();
        }
    });

    // =========================================================================
    // 6. ANIMAÇÃO DOS CONTADORES (Estatísticas)
    // =========================================================================
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const parent = counter.parentElement.parentElement;
            const target = parseFloat(parent.getAttribute('data-count'));
            const count = parseFloat(counter.innerText) || 0;
            const inc = target / 100;

            if (count < target) {
                const nextVal = count + inc;
                counter.innerText = Number.isInteger(target) ? Math.ceil(nextVal) : nextVal.toFixed(1);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    const statsSection = document.querySelector('.stats-container');
    let counted = false;
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                animateCounters();
                counted = true;
            }
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // =========================================================================
    // 7. BUSCA NO GLOSSÁRIO
    // =========================================================================
    const glossarySearch = document.getElementById('glossarySearch');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    if (glossarySearch) {
        glossarySearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            glossaryItems.forEach(item => {
                item.style.display = item.textContent.toLowerCase().includes(term) ? 'block' : 'none';
            });
        });
    }

    // =========================================================================
    // 8. TOAST NOTIFICATION (Animação fluida de feedback)
    // =========================================================================
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
});
