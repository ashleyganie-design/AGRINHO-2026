// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navegação Suave (Smooth Scroll)
    // Faz com que o clique nos links do menu deslize suavemente até a seção
    const linksMenu = document.querySelectorAll('nav ul li a');

    linksMenu.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70, // Desconto da altura do cabeçalho fixo
                behavior: 'smooth'
            });
        });
    });

    // 2. Validação e Envio do Formulário
    const formulario = document.querySelector('form');
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        // Captura os valores
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Lógica simples de validação
        if (nome === '' || email === '' || mensagem === '') {
            alert('Por favor, preencha todos os campos obrigatórios para cultivarmos esse contato!');
            return;
        }

        if (!email.includes('@')) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        // Simulação de sucesso
        console.log('Dados enviados:', { nome, email, mensagem });
        alert(`Obrigado, ${nome}! Sua mensagem sobre o agronegócio sustentável foi enviada com sucesso.`);
        formulario.reset();
    });

    // 3. Efeito de Revelação ao Rolar (Scroll Reveal)
    // Faz as seções aparecerem conforme o usuário desce a página
    const secoes = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.1 // Dispara quando 10% da seção estiver visível
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    secoes.forEach(secao => {
        // Estilo inicial via JS para garantir que apareça se o JS falhar
        secao.style.opacity = '0';
        secao.style.transform = 'translateY(20px)';
        secao.style.transition = 'all 0.6s ease-out';
        observer.observe(secao);
    });

    // 4. Interatividade nos Artigos de Tecnologia
    // Adiciona um efeito visual simples ao passar o mouse nos artigos de produção
    const cardsTecnologia = document.querySelectorAll('article');
    
    cardsTecnologia.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.backgroundColor = '#f0fdf4'; // Um tom de verde bem leve
        });
        card.addEventListener('mouseleave', () => {
            card.style.backgroundColor = 'transparent';
        });
    });
    
    // 5. Flashcards Interativos
    // Animação ao passar o mouse e suporte a teclado para acessibilidade
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(card => {
        // Efeito visual ao passar o mouse
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });

        // Suporte para teclado (acessibilidade)
        // Permite virar o card com Enter ou Espaço
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
});
