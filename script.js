// ========================================
// Навигация
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Изменение стиля навбара при скролле
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Мобильное меню
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Анимации при скролле
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдение за элементами
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ========================================
// Форма RSVP
// ========================================
const rsvpForm = document.getElementById('rsvpForm');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Сбор данных формы
        const formData = new FormData(this);
        const data = {
            fullName: formData.get('fullName'),
            attendance: formData.get('attendance'),
            drink: formData.get('drink'),
            comments: formData.get('comments')
        };

        // Валидация
        if (!data.fullName || !data.attendance || !data.drink) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        // Здесь должна быть отправка данных на сервер
        // Для демонстрации покажем успешное сообщение
        console.log('Данные формы:', data);

        // Показываем сообщение об успехе
        showSuccessMessage();

        // Очищаем форму
        this.reset();
    });
}

// ========================================
// Уведомления
// ========================================
function showNotification(message, type = 'success') {
    // Создание элемента уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Удаление через 3 секунды
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showSuccessMessage() {
    // Создание оверлея
    const overlay = document.createElement('div');
    overlay.className = 'form-overlay';
    
    // Создание сообщения об успехе
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.innerHTML = `
        <div class="form-success-icon">💌</div>
        <h3>Спасибо!</h3>
        <p>Ваш ответ успешно отправлен</p>
        <p style="margin-top: 10px; font-size: 0.9rem; color: #999;">Мы свяжемся с вами для подтверждения</p>
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(successMsg);
    
    // Показываем сообщение
    setTimeout(() => {
        overlay.classList.add('show');
        successMsg.classList.add('show');
    }, 10);
    
    // Закрытие через 3 секунды
    setTimeout(() => {
        overlay.classList.remove('show');
        successMsg.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
            successMsg.remove();
        }, 300);
    }, 3000);
}

// ========================================
// Параллакс эффект для героя
// ========================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ========================================
// Анимация таймлайна
// ========================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, {
    threshold: 0.3
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ========================================
// Эффект появления для секции подарков
// ========================================
const giftsContent = document.querySelector('.gifts-content');
const giftsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

if (giftsContent) {
    giftsObserver.observe(giftsContent);
}

// ========================================
// Эффект появления для формы RSVP
// ========================================
const rsvpFormElement = document.querySelector('.rsvp-form');
const rsvpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

if (rsvpFormElement) {
    rsvpObserver.observe(rsvpFormElement);
}

// ========================================
// Активная ссылка в навигации
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#8b7355';
            } else {
                navLink.style.color = '';
            }
        }
    });
});

// ========================================
// Анимация цветовых образцов
// ========================================
const colorSwatches = document.querySelectorAll('.color-swatch');

colorSwatches.forEach(swatch => {
    swatch.addEventListener('mouseenter', function() {
        const color = this.style.backgroundColor;
        this.style.boxShadow = `0 15px 35px ${color}80`;
    });
    
    swatch.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

// ========================================
// Анимация элементов подарков
// ========================================
const giftItems = document.querySelectorAll('.gift-item');

giftItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ========================================
// Добавление ключевых кадров для уведомлений
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Инициализация при загрузке
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        // Fallback для старых браузеров
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }

    // Таймер обратного отсчёта
    initCountdown();

    console.log('🎉 Сайт-приглашение на свадьбу Евгения и Валентины загружен!');
});

// ========================================
// Таймер обратного отсчёта
// ========================================
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    const weddingDate = new Date('July 13, 2026 15:00:00').getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-days').textContent = '00';
            document.getElementById('countdown-hours').textContent = '00';
            document.getElementById('countdown-minutes').textContent = '00';
            document.getElementById('countdown-seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
        document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Запускаем таймер после загрузки DOM
// initCountdown() вызывается в DOMContentLoaded

// ========================================
// Обработка изменения размера окна
// ========================================
let resizeTimer;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Пересчёт позиций при изменении размера
        console.log('Размер окна изменён');
    }, 250);
});
