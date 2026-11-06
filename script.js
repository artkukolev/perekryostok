// Основной скрипт сайта туристического клуба

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.feature-card, .tour-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Мобильное меню (базовое)
    const navToggle = document.createElement('div');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    navToggle.style.display = 'none';
    navToggle.style.cursor = 'pointer';
    navToggle.style.position = 'absolute';
    navToggle.style.right = '20px';
    navToggle.style.top = '20px';
    navToggle.style.zIndex = '1000';
    
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.position = 'relative';
        navLinks.parentElement.style.position = 'relative';
        navLinks.parentElement.style.right = '0';
        navLinks.parentElement.appendChild(navToggle);
        
        navToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    // Плавный скролл к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Форма связи (базовая валидация)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const inputs = form.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#e74c3c';
                }
            });
            if (!valid) {
                e.preventDefault();
                alert('Пожалуйста, заполните все обязательные поля');
            }
        });
    });
});
