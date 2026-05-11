/* ─── Custom Cursor ─── */
(function () {
  // Only run on pointer:fine devices (desktop)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  // Interactive elements that trigger hover state
  const HOVER_SELECTORS = 'a, button, [role="button"], .btn-premium, .btn-cta-white, .header-nav-btn, .small-feature-pill, .big-feature-card, .cta-card, .footer-nav a';

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  // Ring follows with smooth lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_SELECTORS)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER_SELECTORS)) document.body.classList.remove('cursor-hover');
  });

  // Click state
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
})();


document.addEventListener("DOMContentLoaded", () => {
  // ── Counter Animation ──

  const counters = document.querySelectorAll(".stat-num[data-target]");
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1600;
      const step = Math.ceil(target / (duration / 16));
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString();
        if (current >= target) clearInterval(timer);
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  // 1. Header Scroll Effect
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  // 2. Progress Bar
  const progressBar = document.getElementById("progress-bar");
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";
  });

  // 3. Hero Parallax / Floating Cards
  const heroScene = document.querySelector(".hero-scene");
  const floatingCards = document.querySelectorAll(".floating-card");
  
  window.addEventListener("mousemove", (e) => {
    if (!heroScene) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    floatingCards.forEach((card, idx) => {
      const depth = (idx + 1) * 0.03;
      const moveX = (clientX - centerX) * depth;
      const moveY = (clientY - centerY) * depth;
      card.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${idx === 0 ? -4 : idx === 1 ? 3 : -2}deg)`;
    });
  });

  // 4. Fade In Observer
  const faders = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.1 });
  faders.forEach(fader => observer.observe(fader));

  // 5. Before / After Comparison Scroll
  const compareSection = document.querySelector(".compare-section");
  const beforeImg = document.getElementById("compare-before");
  const afterImg = document.getElementById("compare-after");
  const compareLabel = document.getElementById("compare-label");

  window.addEventListener("scroll", () => {
    if (!compareSection) return;
    const rect = compareSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    
    if (progress > 0.4) {
      afterImg.style.opacity = 1;
      beforeImg.style.opacity = 0;
      compareLabel.innerText = "이해하기 쉬운 기록으로 (After)";
    } else {
      afterImg.style.opacity = 0;
      beforeImg.style.opacity = 1;
      compareLabel.innerText = "복잡한 영수증 (Before)";
    }
  });

  // 6. Sticky Story Logic — Rich 3-Screen
  const storySection = document.querySelector(".story-section");
  const steps        = document.querySelectorAll(".story-step");
  const screens      = [
    document.getElementById("ss-1"),
    document.getElementById("ss-2"),
    document.getElementById("ss-3"),
  ];
  const dots = [
    document.getElementById("dot-1"),
    document.getElementById("dot-2"),
    document.getElementById("dot-3"),
  ];

  let currentScreen = 0;

  function activateScreen(idx) {
    if (idx === currentScreen) return;
    // exit old
    screens[currentScreen].classList.remove("active");
    screens[currentScreen].classList.add("exit");
    dots[currentScreen].classList.remove("active");
    dots[currentScreen].style.width = "6px";
    dots[currentScreen].style.background = "#D1D5DB";

    currentScreen = idx;

    // enter new
    screens[currentScreen].classList.remove("exit");
    screens[currentScreen].classList.add("active");
    dots[currentScreen].classList.add("active");
    dots[currentScreen].style.width = "20px";
    dots[currentScreen].style.background = "#11C5A5";

    // Trigger Screen 2 animations
    if (idx === 1) {
      const bar = document.querySelector(".ai-progress-bar");
      if (bar) { bar.style.width = "0%"; setTimeout(() => { bar.style.width = "85%"; }, 100); }
      document.querySelectorAll(".ai-item").forEach(el => {
        el.style.opacity = "0"; el.style.transform = "translateX(20px)";
        setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateX(0)"; }, 200);
      });
    }
  }

  window.addEventListener("scroll", () => {
    if (!storySection) return;
    const rect     = storySection.getBoundingClientRect();
    const winH     = window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - winH)));
    const stepIdx  = Math.min(steps.length - 1, Math.floor(progress * steps.length));

    steps.forEach((step, i) => {
      step.classList.toggle("active", i === stepIdx);
    });

    activateScreen(stepIdx);
  });
});

