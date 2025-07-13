document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        // Set active class
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
  
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  
    // Scroll-to-top button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
      } else {
        scrollToTopBtn.style.display = 'none';
      }
    });
  
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Animate progress bars and scale-in elements when in view
    const animatedElements = document.querySelectorAll('.progress-bar, .scale-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('progress-bar')) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          } else if (entry.target.classList.contains('scale-in')) {
            entry.target.classList.add('visible');
          }
        }
      });
    }, { threshold: 0.3 });
  
    animatedElements.forEach(element => observer.observe(element));
  
    // Typing animation for hero subtitle
    const typingElement = document.querySelector('.typing');
    const phrases = ['Android Developer', 'React Native Enthusiast', 'Mobile App Innovator'];
    let phraseIndex = 0;
    let letterIndex = 0;
    let currentPhrase = '';
    let isDeleting = false;
  
    function type() {
      if (phraseIndex >= phrases.length) {
        phraseIndex = 0;
      }
      currentPhrase = phrases[phraseIndex];
  
      if (!isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
      } else {
        typingElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
      }
  
      if (!isDeleting && letterIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        setTimeout(type, 200);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    }
  
    type();
  });