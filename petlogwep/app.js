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
  const HOVER_SELECTORS = 'a, button, [role="button"], .btn-premium, .btn-cta-white, .header-nav-btn, .small-feature-pill, .big-feature-card, .cta-card, .footer-nav a, .problem-card, .persona-card, .ai-usage-card, .prompt-card, .tech-card, .hitl-box, .flow-node';

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

(() => {
  const RECEIPT_FILE_NAME = "petlog-test-receipt.png";
  const receiptLines = [
    { text: "전시용 TEST RECEIPT", x: 300, y: 70, size: 30, weight: 800, anchor: "middle" },
    { text: "SAMPLE / 개인정보 없음", x: 300, y: 112, size: 30, weight: 800, anchor: "middle" },
    { text: "----------------------------------------", x: 300, y: 154, size: 22, anchor: "middle" },
    { text: "해오름동물의료센터", x: 300, y: 210, size: 38, weight: 800, anchor: "middle" },
    { text: "사업자번호: 123-45-67890", x: 52, y: 258 },
    { text: "전화: 042-123-4567", x: 52, y: 295 },
    { text: "주소: 대전광역시 서구 둔산로 100", x: 52, y: 332 },
    { text: "----------------------------------------", x: 300, y: 370, size: 22, anchor: "middle" },
    { text: "영수증번호: 20260601-017", x: 52, y: 410 },
    { text: "방문일시: 2026-06-01 14:32", x: 52, y: 447 },
    { text: "보호자: 박주은", x: 52, y: 484 },
    { text: "환자명: 토리", x: 52, y: 521 },
    { text: "종: 강아지 / 나이: 4세 / 성별: M", x: 52, y: 558 },
    { text: "----------------------------------------", x: 300, y: 598, size: 22, anchor: "middle" },
    { text: "No.", x: 58, y: 636 },
    { text: "항목", x: 135, y: 636 },
    { text: "금액(원)", x: 520, y: 636, anchor: "end" },
    { text: "----------------------------------------", x: 300, y: 672, size: 22, anchor: "middle" },
    { text: "1.", x: 60, y: 710 },
    { text: "진찰/상담", x: 137, y: 710 },
    { text: "20,000", x: 520, y: 710, anchor: "end" },
    { text: "2.", x: 60, y: 747 },
    { text: "혈액검사", x: 137, y: 747 },
    { text: "45,000", x: 520, y: 747, anchor: "end" },
    { text: "3.", x: 60, y: 784 },
    { text: "엑스레이", x: 137, y: 784 },
    { text: "35,000", x: 520, y: 784, anchor: "end" },
    { text: "4.", x: 60, y: 821 },
    { text: "처치/주사", x: 137, y: 821 },
    { text: "25,000", x: 520, y: 821, anchor: "end" },
    { text: "5.", x: 60, y: 858 },
    { text: "약제/조제", x: 137, y: 858 },
    { text: "18,000", x: 520, y: 858, anchor: "end" },
    { text: "----------------------------------------", x: 300, y: 897, size: 22, anchor: "middle" },
    { text: "소계", x: 52, y: 934 },
    { text: "143,000", x: 520, y: 934, anchor: "end" },
    { text: "공급가액", x: 52, y: 971 },
    { text: "130,000", x: 520, y: 971, anchor: "end" },
    { text: "부가세", x: 52, y: 1008 },
    { text: "13,000", x: 520, y: 1008, anchor: "end" },
    { text: "할인", x: 52, y: 1045 },
    { text: "-3,000", x: 520, y: 1045, anchor: "end" },
    { text: "========================================", x: 300, y: 1084, size: 22, anchor: "middle" },
    { text: "총 결제금액", x: 52, y: 1132, size: 28, weight: 800 },
    { text: "140,000", x: 520, y: 1132, size: 32, weight: 800, anchor: "end" },
    { text: "----------------------------------------", x: 300, y: 1172, size: 22, anchor: "middle" },
    { text: "결제수단", x: 52, y: 1212 },
    { text: "카드", x: 520, y: 1212, anchor: "end" },
    { text: "승인번호", x: 52, y: 1249 },
    { text: "538291", x: 520, y: 1249, anchor: "end" },
    { text: "----------------------------------------", x: 300, y: 1290, size: 22, anchor: "middle" },
    { text: "펫로그 전시 테스트용 영수증", x: 300, y: 1342, size: 25, anchor: "middle" },
    { text: "실제 결제용 아님", x: 300, y: 1384, size: 25, anchor: "middle" },
  ];

  function escapeSvgText(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildReceiptSvg() {
    const textNodes = receiptLines.map((line) => {
      const anchor = line.anchor || "start";
      const weight = line.weight || 500;
      const size = line.size || 24;
      return `<text x="${line.x}" y="${line.y}" text-anchor="${anchor}" font-size="${size}" font-weight="${weight}">${escapeSvgText(line.text)}</text>`;
    }).join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="1450" viewBox="0 0 600 1450">
      <rect width="600" height="1450" fill="#f8f5ee"/>
      <filter id="paperNoise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.09"/>
        </feComponentTransfer>
      </filter>
      <rect width="600" height="1450" filter="url(#paperNoise)" opacity="0.25"/>
      <g fill="#151515" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', Arial, sans-serif">${textNodes}</g>
    </svg>`;
  }

  function downloadUrl(url, fileName) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function downloadTestReceipt() {
    const svg = buildReceiptSvg();
    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 1450;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(svgUrl);

      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          downloadUrl(URL.createObjectURL(svgBlob), "petlog-test-receipt.svg");
          return;
        }

        const pngUrl = URL.createObjectURL(pngBlob);
        downloadUrl(pngUrl, RECEIPT_FILE_NAME);
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1000);
      }, "image/png");
    };

    image.onerror = () => {
      downloadUrl(svgUrl, "petlog-test-receipt.svg");
      setTimeout(() => URL.revokeObjectURL(svgUrl), 1000);
    };

    image.src = svgUrl;
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".download-receipt-btn");
    if (!button) return;
    downloadTestReceipt();
  });
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

  // 6. Sticky Story Logic - Removed in favor of Pipeline Diagram

  // Collapsible elements are handled by native HTML5 details/summary tags.
});
