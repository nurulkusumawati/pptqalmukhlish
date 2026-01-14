// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  });
});

// Collapse mobile nav on link click
const navbarCollapse = document.querySelector('.navbar-collapse');
document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none' && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {toggle:false});
      bsCollapse.hide();
    }
  });
});

// Active nav link based on current file
(function setActiveNav(){
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(a=>{
    const href = a.getAttribute('href');
    if(!href) return;
    if(href === current || (href === 'index.html' && current === '') || (href === current)){
      a.classList.add('active');
    }
  });
})();

// Reveal on scroll (intersection observer)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('reveal-active');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Optional: simple form confirmation
const contactForm = document.querySelector('form[action^="mailto:"]');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    alert('Terima kasih, pesan Anda akan dikirim melalui email.');
  });
}