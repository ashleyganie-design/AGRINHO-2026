// ==========================================================================
// AGRO FORTE - JavaScript Completo e Otimizado
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. NAVEGAÇÃO E MENU
    // ==========================================================================
    
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('header nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const navLinks = document.querySelectorAll('header nav ul li a');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        const isExpanded = navMenu.classList.contains('active');
        
        icon.classList.toggle('fa-bars', !isExpanded);
        icon.classList.toggle('fa-times', isExpanded);
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', toggleMenu);
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Highlight do link ativo no menu
    const sections = document.querySelectorAll('section[id]');

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
    highlightActiveLink();

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight + 10;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ==========================================================================
    // 2. BARRA DE PROGRESSO DE SCROLL
    // ==========================================================================
    
    const progressBar = document.querySelector('.scroll-progress-bar');

    function updateProgressBar() {
        if (progressBar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            
            progressBar.style.width = scrollPercentage + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(scrollPercentage));
        }
    }

    window.addEventListener('scroll', updateProgressBar);

    // ==========================================================================
    // 3. BOTÃO VOLTAR AO TOPO
    // ==========================================================================
    
    const backToTopBtn = document.querySelector('.back-to-top');

    function toggleBackToTop() {
        if (backToTopBtn) {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
                backToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                backToTopBtn.classList.remove('show');
                backToTopBtn.setAttribute('aria-hidden', 'true');
            }
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // 4. CONTADORES ANIMADOS (STATS)
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
                const statCard = counter.closest('.stat-card');
                const target = parseFloat(statCard.getAttribute('data-count'));
                const suffix = statCard.getAttribute('data-suffix') || '';
                const isDecimal = target % 1 !== 0;
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        if (isDecimal) {
                            counter.innerText = current.toFixed(1);
                        } else if (target >= 1000000) {
                            counter.innerText = (current / 1000000).toFixed(1);
                        } else {
                            counter.innerText = Math.floor(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (isDecimal) {
                            counter.innerText = target.toFixed(1);
                        } else if (target >= 1000000) {
                            counter.innerText = (target / 1000000).toFixed(1);
                        } else {
                            counter.innerText = target;
                        }
                        
                        if (suffix) {
                            const suffixEl = counter.nextElementSibling;
                            if (suffixEl && suffixEl.classList.contains('suffix')) {
                                suffixEl.innerText = suffix;
                            }
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
    // 5. SCROLL REVEAL (Animação ao rolar)
    // ==========================================================================
    
    const revealElements = document.querySelectorAll(
        '.data-card, .case-card, .tech-showcase-item, .solution-card, ' +
        '.stat-card, .answer-card, .chart-card, .icon-box, .flashcard, ' +
        '.resource-card, .multimedia-card, .podcast-card, .glossary-item'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('revealed');
                }, index * 100);
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
    // 6. FORMULÁRIO DE CONTATO COM VALIDAÇÃO
    // ==========================================================================
    
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Validação em tempo real
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        // Validação do formulário
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contactForm.reset();
            } else {
                showToast('Por favor, corrija os erros no formulário.', 'error');
            }
        });
    }

    function validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        let isValid = true;
        let errorMessage = '';

        // Remove classe de erro anterior
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }

        // Validação de campo obrigatório
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Validação de email
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um e-mail válido';
            }
        }

        // Validação de telefone (formato brasileiro)
        if (field.type === 'tel' && field.value.trim()) {
            const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(field.value)) {
                // Formata o telefone
                formatPhone(field);
            }
        }

        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        }

        return isValid;
    }

    function formatPhone(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.length <= 10) {
            value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        } else {
            value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
        }
        
        input.value = value;
    }

    // Sistema de Toast Notifications
    function showToast(message, type = 'success') {
        // Remove toast anterior se existir
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ==========================================================================
    // 7. FLASHCARDS INTERATIVOS
    // ==========================================================================
    
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        // Clique para virar
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });

        // Teclado (Enter ou Espaço)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });

        // Efeito hover
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = 'scale(1.03)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // ==========================================================================
    // 8. GLOSSÁRIO - BUSCA E FILTRO
    // ==========================================================================
    
    const glossarySearch = document.getElementById('glossarySearch');
    const glossaryItems = document.querySelectorAll('.glossary-item');

    if (glossarySearch) {
        glossarySearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            glossaryItems.forEach(item => {
                const term = item.querySelector('.term').textContent.toLowerCase();
                const content = item.querySelector('.term-content').textContent.toLowerCase();
                
                if (term.includes(searchTerm) || content.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // ==========================================================================
    // 9. MODAIS (Cases e Tecnologias)
    // ==========================================================================
    
    const modalContainer = document.getElementById('modalContainer');

    // Função global para abrir modal de cases
    window.openCaseModal = function(caseId) {
        const cases = {
            'caso1': {
                title: 'Família Silva - Fazenda São Francisco',
                location: 'Sorriso, Mato Grosso',
                content: `
                    <h3>História de Sucesso</h3>
                    <p>A Família Silva administra 2.500 hectares de terra em Sorriso, MT, há mais de 30 anos. Em 2020, decidiram investir em tecnologia de ponta para aumentar a produtividade de forma sustentável.</p>
                    
                    <h4>Tecnologias Implementadas:</h4>
                    <ul>
                        <li><strong>Irrigação por Pivô Central:</strong> 12 pivôs automatizados com sensores de umidade</li>
                        <li><strong>Drones:</strong> Monitoramento semanal de 100% da área</li>
                        <li><strong>Agricultura de Precisão:</strong> Aplicação de fertilizantes em taxa variável</li>
                        <li><strong>Sensores IoT:</strong> 50 estações meteorológicas distribuídas pela propriedade</li>
                    </ul>

                    <h4>Resultados Alcançados (2020-2024):</h4>
                    <ul>
                        <li>✓ Produtividade da soja: +45% (de 55 para 80 sacas/hectare)</li>
                        <li>✓ Consumo de água: -30%</li>
                        <li>✓ Uso de defensivos: -25%</li>
                        <li>✓ Redução de custos operacionais: 20%</li>
                        <li>✓ Aumento da matéria orgânica do solo: 15%</li>
                    </ul>

                    <blockquote>
                        "A tecnologia nos permitiu produzir mais preservando os recursos naturais. 
                        Hoje somos referência em sustentabilidade na região e nossos filhos têm 
                        futuro garantido no campo."
                    </blockquote>
                    <cite>— João Silva, produtor rural</cite>
                `
            },
            'caso2': {
                title: 'Cooperativa Agropecuária Vale Verde',
                location: 'Cascavel, Paraná',
                content: `
                    <h3>Revolução da Energia Solar</h3>
                    <p>A Cooperativa Vale Verde reúne 450 produtores rurais do oeste do Paraná. Em 2019, iniciaram um projeto ambicioso de transição para energia renovável.</p>
                    
                    <h4>Projeto Implementado:</h4>
                    <ul>
                        <li><strong>5.000 painéis solares</strong> instalados nas sedes e propriedades</li>
                        <li><strong>Capacidade total:</strong> 2.5 MW de potência instalada</li>
                        <li><strong>Investimento:</strong> R$ 12 milhões (financiamento coletivo)</li>
                        <li><strong>Payback:</strong> 4.5 anos</li>
                    </ul>

                    <h4>Impactos e Resultados:</h4>
                    <ul>
                        <li>✓ Economia anual: R$ 2.3 milhões</li>
                        <li>✓ Redução de CO₂: 1.800 toneladas/ano</li>
                        <li>✓ 100% da energia consumida é renovável</li>
                        <li>✓ Recursos economizados reinvestidos em assistência técnica</li>
                    </ul>

                    <blockquote>
                        "A energia solar transformou nossa cooperativa. Além da economia, 
                        nos tornamos exemplo de sustentabilidade e atraímos jovens para o campo."
                    </blockquote>
                    <cite>— Maria Oliveira, diretora da cooperativa</cite>
                `
            },
            'caso3': {
                title: 'Pedro Henrique - AgroTech Startup',
                location: 'Rio Verde, Goiás',
                content: `
                    <h3>Inovação e Juventude no Campo</h3>
                    <p>Pedro Henrique, 28 anos, é a terceira geração de produtores em sua família. Formado em Agronomia e Ciência da Computação, desenvolveu uma plataforma digital que revolucionou a gestão da propriedade.</p>
                    
                    <h4>Plataforma Desenvolvida:</h4>
                    <ul>
                        <li><strong>App AgroTech:</strong> Integração de dados de satélite, sensores IoT e IA</li>
                        <li><strong>Machine Learning:</strong> Previsão de produtividade com 92% de precisão</li>
                        <li><strong>Automação:</strong> Irrigação e aplicação de insumos automatizadas</li>
                        <li><strong>Dashboard:</strong> Gestão em tempo real via smartphone</li>
                    </ul>

                    <h4>Resultados em 2 Anos:</h4>
                    <ul>
                        <li>✓ Eficiência operacional: +60%</li>
                        <li>✓ Redução de desperdícios: 40%</li>
                        <li>✓ Aumento de produtividade: 35%</li>
                        <li>✓ Plataforma licenciada para 50 propriedades</li>
                    </ul>

                    <blockquote>
                        "O futuro do agro é digital. Unimos tradição familiar com inovação 
                        tecnológica para criar um modelo de negócio sustentável e escalável."
                    </blockquote>
                    <cite>— Pedro Henrique, jovem produtor e desenvolvedor</cite>
                `
            }
        };

        const caseData = cases[caseId];
        if (caseData) {
            openModal(caseData.title, caseData.content);
        }
    };

    // Função global para abrir modal de tecnologias
    window.openTechModal = function(techId) {
        const technologies = {
            'drones': {
                title: 'Drones Agrícolas - Tecnologia em Alta',
                content: `
                    <h3>Revolução dos Drones no Agronegócio</h3>
                    <p>Os drones se tornaram ferramentas essenciais para o agronegócio moderno, oferecendo monitoramento preciso e aplicação eficiente de insumos.</p>
                    
                    <h4>Principais Aplicações:</h4>
                    <ul>
                        <li><strong>Mapeamento Aéreo:</strong> Imagens de alta resolução para análise de NDVI</li>
                        <li><strong>Pulverização:</strong> Aplicação localizada de defensivos (redução de 40% no uso)</li>
                        <li><strong>Monitoramento:</strong> Detecção precoce de pragas e doenças</li>
                        <li><strong>Contagem de Plantas:</strong> Estimativa precisa de estande</li>
                        <li><strong>Topografia:</strong> Mapeamento 3D do terreno</li>
                    </ul>

                    <h4>Dados de Mercado:</h4>
                    <ul>
                        <li>✓ Crescimento de 200% no uso em 2 anos (2022-2024)</li>
                        <li>✓ ROI médio: 6-12 meses</li>
                        <li>✓ Redução de custos: 30-40% em defensivos</li>
                        <li>✓ Precisão: até 2cm de resolução</li>
                    </ul>

                    <h4>Equipamentos Mais Usados:</h4>
                    <p>DJI Agras, SenseFly eBee, DJI Phantom 4 Multispectral</p>
                `
            },
            'iot': {
                title: 'Internet das Coisas (IoT) no Campo',
                content: `
                    <h3>Conectividade e Automação Rural</h3>
                    <p>A IoT permite que equipamentos e sensores se comuniquem em tempo real, automatizando processos e otimizando decisões no campo.</p>
                    
                    <h4>Dispositivos e Aplicações:</h4>
                    <ul>
                        <li><strong>Sensores de Solo:</strong> Umidade, temperatura, nutrientes e pH</li>
                        <li><strong>Estações Meteorológicas:</strong> Dados climáticos em tempo real</li>
                        <li><strong>Atuadores:</strong> Válvulas de irrigação automáticas</li>
                        <li><strong>Colares GPS:</strong> Monitoramento de gado</li>
                        <li><strong>Silos Inteligentes:</strong> Controle de temperatura e umidade</li>
                    </ul>

                    <h4>Benefícios Comprovados:</h4>
                    <ul>
                        <li>✓ Economia de água: 30-40%</li>
                        <li>✓ Redução de mão de obra: 25%</li>
                        <li>✓ Aumento de produtividade: 15-20%</li>
                        <li>✓ Decisões baseadas em dados em tempo real</li>
                    </ul>

                    <h4>Conectividade:</h4>
                    <p>LoRaWAN, NB-IoT, 4G/5G rural, satélite Starlink</p>
                `
            },
            'ia': {
                title: 'Inteligência Artificial no Agronegócio',
                content: `
                    <h3>IA Transformando o Campo</h3>
                    <p>A Inteligência Artificial analisa grandes volumes de dados para fornecer insights precisos e automatizar decisões complexas no agronegócio.</p>
                    
                    <h4>Aplicações Práticas:</h4>
                    <ul>
                        <li><strong>Visão Computacional:</strong> Detecção automática de doenças e pragas</li>
                        <li><strong>Machine Learning:</strong> Previsão de produtividade e clima</li>
                        <li><strong>Recomendação:</strong> Prescrição de fertilizantes e defensivos</li>
                        <li><strong>Processamento de Linguagem:</strong> Chatbots para assistência técnica</li>
                        <li><strong>Robótica:</strong> Colheita automatizada e capina seletiva</li>
                    </ul>

                    <h4>Cases de Sucesso:</h4>
                    <ul>
                        <li>✓ Precisão na detecção de doenças: 95%</li>
                        <li>✓ Previsão de safra: 92% de acurácia</li>
                        <li>✓ Redução de perdas: 20-30%</li>
                        <li>✓ Otimização de insumos: 25% de economia</li>
                    </ul>

                    <h4>Plataformas Líderes:</h4>
                    <p>IBM Watson, Google Cloud AI, Microsoft Azure FarmBeats, startups brasileiras</p>
                `
            }
        };

        const techData = technologies[techId];
        if (techData) {
            openModal(techData.title, techData.content);
        }
    };

    function openModal(title, content) {
        if (!modalContainer) return;

        modalContainer.innerHTML = `
            <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <button class="modal-close" onclick="closeModal()" aria-label="Fechar modal">
                    <i class="fas fa-times"></i>
                </button>
                <h2 id="modalTitle">${title}</h2>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;

        modalContainer.classList.add('active');
        modalContainer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Fechar ao clicar fora
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', handleEscKey);
    }

    window.closeModal = function() {
        if (!modalContainer) return;
        
        modalContainer.classList.remove('active');
        modalContainer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscKey);
    };

    function handleEscKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }

    // ==========================================================================
    // 10. ANIMAÇÃO DOS GRÁFICOS
    // ==========================================================================
    
    const chartBars = document.querySelectorAll('.chart-bar, .timeline-bar');

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-out';
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });

    // ==========================================================================
    // 11. LAZY LOADING DE IMAGENS
    // ==========================================================================
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('loading' in HTMLImageElement.prototype) {
        // Browser suporta lazy loading nativo
        lazyImages.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para browsers antigos
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ==========================================================================
    // 12. ACELERADOR DE PERFORMANCE
    // ==========================================================================
    
    // Debounce para scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Otimização de eventos de scroll
    const optimizedScroll = debounce(() => {
        updateProgressBar();
        toggleBackToTop();
        highlightActiveLink();
        animateCounters();
    }, 10);

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // ==========================================================================
    // 13. COMPARTILHAMENTO SOCIAL
    // ==========================================================================
    
    // Adicionar botões de compartilhamento dinamicamente
    function addShareButtons() {
        const shareButtons = document.querySelectorAll('.share-buttons');
        
        shareButtons.forEach(container => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            container.innerHTML = `
                <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" 
                   target="_blank" rel="noopener" class="share-btn" aria-label="Compartilhar no Facebook">
                    <i class="fab fa-facebook"></i>
                </a>
                <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" 
                   target="_blank" rel="noopener" class="share-btn" aria-label="Compartilhar no Twitter">
                    <i class="fab fa-twitter"></i>
                </a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}" 
                   target="_blank" rel="noopener" class="share-btn" aria-label="Compartilhar no LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://wa.me/?text=${title}%20${url}" 
                   target="_blank" rel="noopener" class="share-btn" aria-label="Compartilhar no WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            `;
        });
    }

    addShareButtons();

    // ==========================================================================
    // 14. IMPRESSÃO OTIMIZADA
    // ==========================================================================
    
    // Adicionar estilos de impressão
    const printStyles = document.createElement('style');
    printStyles.media = 'print';
    printStyles.textContent = `
        @media print {
            header, footer, .back-to-top, .mobile-menu-btn, .scroll-progress-bar {
                display: none !important;
            }
            body {
                padding-top: 0 !important;
            }
            section {
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyles);

    // ==========================================================================
    // 15. ANALYTICS E TRACKING (Exemplo)
    // ==========================================================================
    
    // Tracking de cliques em links externos
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Link externo clicado:', link.href);
            // Aqui você pode integrar com Google Analytics, etc.
        });
    });

    // ==========================================================================
    // 16. SERVICE WORKER (PWA - Opcional)
    // ==========================================================================
    
    // Registrar Service Worker para funcionar offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // navigator.serviceWorker.register('/sw.js').then(registration => {
            //     console.log('ServiceWorker registrado:', registration.scope);
            // }).catch(error => {
            //     console.log('ServiceWorker falhou:', error);
            // });
        });
    }

    // ==========================================================================
    // INICIALIZAÇÃO
    // ==========================================================================
    
    console.log('%c🌱 Agro Forte - Site Carregado com Sucesso!', 'color: #52b788; font-size: 16px; font-weight: bold;');
    console.log('%cDados reais, tecnologia e sustentabilidade para o agronegócio brasileiro.', 'color: #2d6a4f; font-size: 12px;');
});
