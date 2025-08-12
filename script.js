document.addEventListener('DOMContentLoaded', function() {
    // Toggle de tema claro/escuro
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Verificar preferência do sistema ou armazenamento local
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
        document.body.classList.add('light-mode');
    }
    
    // Alternar tema
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
    
    // Animações ao rolar
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkScroll() {
        animateOnScrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
                
                // Se for uma barra de habilidades, animar
                if (element.querySelector('.skill-level')) {
                    animateSkillBars(element);
                }
            }
        });
        
        // Botão "voltar ao topo"
        const backToTop = document.querySelector('.back-to-top');
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar na carga inicial
    
    // Animação dos números estatísticos
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 50; // Controla a velocidade da animação
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = Math.round(current);
            }, 20);
        });
    }
    
    // Animação das barras de habilidades
    function animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = `${level}%`;
            }, 100);
        });
    }
    
    // Iniciar animação dos stats quando a seção for visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.querySelector('#sobre');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('formMessage');
            
            submitBtn.classList.add('loading');
            
            // Simulação de envio (substitua por código real de envio)
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                formMessage.textContent = 'Mensagem enviada com sucesso!';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, 1500);
            
            // Para envio real usando FormSubmit.co (descomente e substitua pelo seu email)
            /*
            fetch('https://formsubmit.co/ajax/seu-email@exemplo.com', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.classList.remove('loading');
                formMessage.textContent = 'Mensagem enviada com sucesso!';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            })
            .catch(error => {
                submitBtn.classList.remove('loading');
                formMessage.textContent = 'Erro ao enviar mensagem. Tente novamente.';
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            });
            */
        });
    }
    
    // Botão "voltar ao topo"
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});