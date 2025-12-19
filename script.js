import { ModelViewerElement } from 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';

// Плавное раскрытие ответов в FAQ
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const faqItem = item.parentElement;
        const answer = item.nextElementSibling;

        faqItem.classList.toggle('active');
        answer.style.maxHeight = faqItem.classList.contains('active') ? `${answer.scrollHeight}px` : null;
    });
});

// Плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        const offset = 127;
        // Если цель — главная, прокручиваем до самого верха без отступа
        const targetPosition = targetId === "#home"
            ? 0
            : target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


// Бургер-меню
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('nav ul');
    const body = document.body;

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});

// Проверка устройства и настройка модели
const modelViewer = document.getElementById('desktop-model');
if (modelViewer && !/Mobi|Android/i.test(navigator.userAgent)) {
    modelViewer.setAttribute('src', 'quake.glb');
    modelViewer.style.display = 'block';

    modelViewer.addEventListener('load', () => {
        // Убираем класс "hidden" у всех элементов с классом "Hotspot"
        document.querySelectorAll('.Hotspot').forEach(hotspot => {
            hotspot.classList.remove('hidden');
        });
    });
} else if (modelViewer) {
    modelViewer.style.display = 'none';
}

// Вращение модели с учетом скролла
modelViewer.setAttribute('auto-rotate', '');
const baseRotationSpeed = 2;
let rotationSpeed = baseRotationSpeed;
let lastScrollTop = window.pageYOffset;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const deltaScroll = scrollTop - lastScrollTop;
    if (deltaScroll !== 0) {
        rotationSpeed += deltaScroll * 0.2;
    }
    lastScrollTop = scrollTop;
});

// Анимация вращения
function animate() {
    modelViewer.setAttribute('rotation-per-second', `${rotationSpeed}deg`);
    rotationSpeed += (baseRotationSpeed - rotationSpeed) * 0.02;
    requestAnimationFrame(animate);
}
animate();
