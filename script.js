// MOBILE NAVIGATION MENU
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

// TYPEWRITER EFFECT IN HERO
const phrases = [
    "Software Developer",
    "Full-Stack Development",
    "Artificial Intelligence",
    "Cloud Computing",
    "ServiceNow Developer"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70;
const deletingSpeed = 40;
const pauseDelay = 2000;
const typingTextElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingTextElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, pauseDelay);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 300);
    } else {
        setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

// ABOUT SECTION TABS SWITCHER
function switchTab(event, tabId) {
    const parentContainer = event.currentTarget.closest('.about-tabs');
    if (!parentContainer) return;

    // Remove active class from all tab buttons inside this tabs widget
    const tabButtons = parentContainer.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Remove active class from all tab contents inside this tabs widget
    const tabContents = parentContainer.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to current button and corresponding content
    event.currentTarget.classList.add('active');
    const targetContent = parentContainer.querySelector(`#${tabId}`);
    if (targetContent) {
        targetContent.classList.add('active');
    }
}

// PROJECT CASE STUDY DEEP DIVE TOGGLE
function toggleDeepDive(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.classList.toggle('open');
    const triggerIcon = container.querySelector('.deep-dive-trigger span.icon');
    
    // Set max height dynamically for transition if open
    const content = container.querySelector('.deep-dive-content');
    if (container.classList.contains('open')) {
        content.style.maxHeight = content.scrollHeight + "px";
        if (triggerIcon) triggerIcon.textContent = '▲';
    } else {
        content.style.maxHeight = '0px';
        if (triggerIcon) triggerIcon.textContent = '▼';
    }
}

// SCROLL REVEAL ANIMATIONS USING INTERSECTION OBSERVER
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });
}

// CONTACT FORM INTERACTIVE HANDLER
function handleContactSubmit(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const msgInput = document.getElementById('contactMsg');
    const toast = document.getElementById('successToast');

    if (!nameInput || !emailInput || !msgInput) return;

    // Simulate sending progress
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Reset form inputs
        nameInput.value = '';
        emailInput.value = '';
        msgInput.value = '';
        
        // Restore button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Show Success Toast Notification
        if (toast) {
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3000);
        }
    }, 1200);
}

// ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
window.addEventListener('scroll', () => {
    let currentSection = "";
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
});
