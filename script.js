document.addEventListener('DOMContentLoaded', function () {

    // ========== Tema claro/escuro ==========
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || (!savedTheme && !prefersDark.matches)) {
        document.body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('light-mode');
            const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
        });
    }

    // ========== Menu hambúrguer (mobile) ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            const icon = hamburger.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Fechar menu ao clicar em link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                const icon = hamburger.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // ========== Animações ao rolar ==========
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        const windowHeight = window.innerHeight;

        scrollElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.classList.add('animated');

                const skillBars = el.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const level = bar.getAttribute('data-level');
                    bar.style.width = level + '%';
                });
            }
        });

        // Botão voltar ao topo
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    // ========== Contador de estatísticas ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            if (target === 0) return;

            let current = 0;
            const duration = 1500;
            const step = target / (duration / 20);

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(current);
            }, 20);
        });
    }

    const aboutSection = document.querySelector('#sobre');
    if (aboutSection && statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(aboutSection);
    }

    // ========== Formulário de contato ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('formMessage');

            // Validação básica
            const nome = contactForm.querySelector('[name="name"]');
            const email = contactForm.querySelector('[name="email"]');
            const mensagem = contactForm.querySelector('[name="message"]');

            if (!nome.value.trim() || !email.value.trim() || !mensagem.value.trim()) {
                showFormMessage(formMessage, 'Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            // Campo oculto para identificar a origem
            formData.append('_subject', 'Nova mensagem do portfólio!');

            fetch('https://formsubmit.co/ajax/marinoleo51@gmail.com', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === 'true' || data.success === true) {
                        window.location.href = 'obrigado.html';
                    } else {
                        throw new Error('Erro no envio');
                    }
                })
                .catch(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    showFormMessage(formMessage, 'Erro ao enviar mensagem. Tente novamente ou envie um e-mail direto para marinoleo51@gmail.com', 'error');
                });
        });
    }

    function showFormMessage(el, text, type) {
        el.textContent = text;
        el.className = 'form-message ' + type;
    }

    // ========== Botão voltar ao topo (clique suave) ==========
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
