/* ===========================================================
   HAPPY 16TH BIRTHDAY — SCRIPT.JS
   Vanilla JS, no dependencies. Organized top-to-bottom to match
   the page flow. Edit the CONFIG block below to personalize.
   =========================================================== */

/* ===========================================================
   🎨 CONFIG — EDIT EVERYTHING BELOW TO PERSONALIZE THE SITE
   =========================================================== */
const CONFIG = {
  // The name shown in the hero and final screen
  friendName: "Ananya", // 🎨 CHANGE THIS to your friend's real name

  // Birthday math — do not need to change these for this build
  birthDate: new Date(2012, 5, 23),         // 22 Nov 2010 (month is 0-indexed, so 10 = November)
  birthdayTarget: new Date(2026, 5, 23, 0, 0, 0), // 22 Nov 2026, midnight

  // Personal letter — shown with a typewriter effect
  message: `My dearest friend,

Sixteen years ago, the world got brighter the day you arrived in it. And somewhere along the way, I got lucky enough to call you my friend.

Today isn't just about cake and candles — it's about celebrating every bit of who you are: your laugh, your heart, your ideas, and the way you make ordinary days feel a little more magical.

Here's to forteen, and to every beautiful chapter still waiting to be written. I'm so grateful I get to read this story with you.

Happy Birthday. Dear Ananya.`,

  // 16 things you appreciate — edit freely, keep it to 16 for the "16" theme
  appreciations: [
    "Your laugh that makes everyone laugh too",
    "How you always show up when it matters",
    "Your honesty, even when it's hard",
    "Your endless curiosity about the world",
    "How calm and understood I feel around you",
    "Your fierce loyalty to the people you love",
    "The way you turn bad days into inside jokes",
    "Your courage to be exactly yourself",
    "How you celebrate other people's wins like your own",
    "Your patience, even when I don't deserve it",
    "Your big dreams and bigger heart",
    "How you make every plan more fun",
    "Your kindness towards people no one else notices",
    "Simply... being you",
  ],

  // Gallery photos — drop real files into assets/photos/ with these
  // exact names, or change the paths below. If a file is missing,
  // a placeholder is shown automatically so nothing ever looks broken.
  photos: [
    { src: "assets/photos/photo1.jpg", caption: "Radhe Radhe" },
    { src: "assets/photos/photo2.jpg", caption: "Radhe Radhe" },
    { src: "assets/photos/photo3.jpg", caption: "Radhe Radhe" },
    { src: "assets/photos/photo4.jpg", caption: "Radhe Radher" },
    { src: "assets/photos/photo5.jpg", caption: "Radhe Radhe" },
    { src: "assets/photos/photo6.jpg", caption: "Radhe Radhe" },
  ],

  // Gift box reveal message
  giftMessage: "Surprise! 🎁 This little site is your gift — built late at night, with every section made just for you. There's more coming your way in person too, but I wanted today to start with something that's only yours. Happy Birthday! 💜",

  // Friendship timeline — from birth year to this birthday
  timeline: [
    { year: "2012", title: "The Year It Began", text: "The year you were born — the world had no idea who was coming." },
    { year: "2022", title: "Somewhere In Between", text: "This is our 6th class we met each other." },
    { year: "2023", title: "Inside A New Era", text: "I like You but never told you, i think you might get hurt." },
    { year: "2024", title: "The moments of 8th", text: "This is the year of joy and happiness." },
    { year: "2025", title: "Through The Hard Days", text: "Missing you whole year." },
    { year: "2026", title: "Sixteen", text: "And now, here we are — celebrating sixteen years of you." },
  ],

  // Short messages hidden inside the balloons
  balloonMessages: [
    "You light up every world you walk into ✨",
    "14 years, you are amazing 🎉",
    "Here's to the best year yet 💫",
    "You deserve every good thing coming your way 🌟",
    "Never stop being exactly you 💜",
    "Today is all about YOU 🎂",
    "Your friendship is a gift I never take for granted 🎈",
    "May this year be as bright as your smile ✨",
    "Fourteen candles, a thousand reasons to smile 🕯️",
    "You make ordinary days feel magical 🪄",
    "Cheers to you, today and always 🥂",
    "This is just the beginning of something amazing 🌈",
  ],
};

/* ===========================================================
   UTILITIES
   =========================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $all = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const PALETTE = ["#9b5de5", "#ff6fb5", "#5b7fff", "#f4c95d"];
const pad = (n) => String(n).padStart(2, "0");

let toastTimer;
function showToast(msg, duration = 2600) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), duration);
}

/* Tiny WebAudio sound effects — no audio files needed, fails silently */
let _audioCtx;
function getAudioCtx() {
  if (!_audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    _audioCtx = new AC();
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}
function playTone(freq = 440, duration = 0.15, type = "sine", gain = 0.06) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g).connect(ctx.destination);
    osc.start();
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration + 0.02);
  } catch (e) { /* audio not available, ignore */ }
}
const sfx = {
  pop: () => playTone(880, 0.12, "triangle", 0.05),
  blow: () => playTone(220, 0.25, "sine", 0.04),
  chime: () => { playTone(660, 0.18, "sine", 0.05); setTimeout(() => playTone(880, 0.25, "sine", 0.05), 120); },
  ding: () => playTone(990, 0.15, "sine", 0.05),
};

/* Generic scroll-reveal observer for elements with class "reveal" */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
);

/* ===========================================================
   1. LOADING SCREEN
   =========================================================== */
function initLoadingScreen() {
  const screen = $("#loading-screen");
  const minDelay = 1100;
  const start = Date.now();
  const hide = () => {
    const elapsed = Date.now() - start;
    const wait = Math.max(0, minDelay - elapsed);
    setTimeout(() => screen.classList.add("hidden"), wait);
  };
  if (document.readyState === "complete") hide();
  else window.addEventListener("load", hide);
}

/* ===========================================================
   2. AMBIENT STARFIELD (background canvas)
   =========================================================== */
function initStarfield() {
  const canvas = $("#particle-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = window.innerWidth < 500 ? 60 : 100;
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.2,
      twinkleSpeed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  function draw(t) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((s) => {
      const alpha = REDUCED_MOTION ? s.baseAlpha : s.baseAlpha + Math.sin(t * s.twinkleSpeed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(247, 243, 255, ${Math.max(0, alpha)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!REDUCED_MOTION) requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

/* ===========================================================
   3. SCROLL PROGRESS + AURORA BACKGROUND
   =========================================================== */
function initScrollEffects() {
  const bar = $("#scroll-progress");
  const root = document.documentElement;
  // hue stops the page drifts through as you scroll: purple -> pink -> blue -> gold
  const hueStops = [265, 330, 225, 42];

  function onScroll() {
    const max = document.body.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    bar.style.width = `${progress * 100}%`;

    const segment = progress * (hueStops.length - 1);
    const i = Math.min(Math.floor(segment), hueStops.length - 2);
    const localT = segment - i;
    const hue = hueStops[i] + (hueStops[i + 1] - hueStops[i]) * localT;
    root.style.setProperty("--aurora-hue", `${hue}deg`);
    root.style.setProperty("--aurora-y", `${20 + progress * 40}%`);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ===========================================================
   4. HERO — start celebration button
   =========================================================== */
function initHero() {
  $("#friend-name-hero").textContent = CONFIG.friendName;
  $("#friend-name-final").textContent = CONFIG.friendName;
  $("#start-celebration").addEventListener("click", () => {
    $("#age").scrollIntoView({ behavior: "smooth" });
  });
}

/* ===========================================================
   5. AGE / COUNTDOWN
   =========================================================== */
function animateValue(el, end, duration = 1400) {
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = end.toLocaleString();
  }
  if (REDUCED_MOTION) el.textContent = end.toLocaleString();
  else requestAnimationFrame(tick);
}

function getAgeStats() {
  const now = new Date();
  const birth = CONFIG.birthDate;
  const totalMs = now - birth;
  const totalDays = Math.floor(totalMs / 86400000);
  const totalHours = Math.floor(totalMs / 3600000);

  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  if (now.getDate() < birth.getDate()) months -= 1;
  if (months < 0) { years -= 1; months += 12; }
  const totalMonths = years * 12 + months;

  return { totalDays, totalHours, years, totalMonths };
}

function initCountdown() {
  const els = {
    days: $("#cd-days"), hours: $("#cd-hours"), mins: $("#cd-mins"), secs: $("#cd-secs"),
    label: $("#countdown-label"),
  };

  function tick() {
    const now = new Date();
    const diff = CONFIG.birthdayTarget - now;

    if (diff <= 0) {
      els.days.textContent = "00"; els.hours.textContent = "00";
      els.mins.textContent = "00"; els.secs.textContent = "00";
      els.label.textContent = "🎉 The big day has arrived!";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.days.textContent = pad(d); els.hours.textContent = pad(h);
    els.mins.textContent = pad(m); els.secs.textContent = pad(s);
    els.label.textContent = "until the big day";
  }

  tick();
  setInterval(tick, 1000);

  // Animate the "lived" stats once, when the section scrolls into view
  const statsSection = $("#age");
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const stats = getAgeStats();
        animateValue($("#stat-years"), stats.years);
        animateValue($("#stat-months"), stats.totalMonths);
        animateValue($("#stat-days"), stats.totalDays);
        animateValue($("#stat-hours"), stats.totalHours);
        statObserver.unobserve(statsSection);
      }
    });
  }, { threshold: 0.3 });
  statObserver.observe(statsSection);
}

/* ===========================================================
   6. CONFETTI (reusable canvas burst, used by several sections)
   =========================================================== */
const confettiCanvas = document.getElementById("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiParticles = [];
let confettiRunning = false;

function resizeConfettiCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  confettiCanvas.width = window.innerWidth * dpr;
  confettiCanvas.height = window.innerHeight * dpr;
  confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resizeConfettiCanvas);
resizeConfettiCanvas();

function burstConfetti(x, y, count = 60) {
  if (REDUCED_MOTION) return;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 3;
    confettiParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: Math.random() * 6 + 4,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      rotation: Math.random() * Math.PI,
      rotationSpeed: (Math.random() - 0.5) * 0.3,
      life: 1,
      decay: Math.random() * 0.012 + 0.008,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    });
  }
  if (!confettiRunning) { confettiRunning = true; requestAnimationFrame(runConfetti); }
}

function runConfetti() {
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confettiParticles.forEach((p) => {
    p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.rotation += p.rotationSpeed; p.life -= p.decay;
    confettiCtx.save();
    confettiCtx.globalAlpha = Math.max(p.life, 0);
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.rotation);
    confettiCtx.fillStyle = p.color;
    if (p.shape === "rect") confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    else { confettiCtx.beginPath(); confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2); confettiCtx.fill(); }
    confettiCtx.restore();
  });
  confettiParticles = confettiParticles.filter((p) => p.life > 0 && p.y < window.innerHeight + 40);

  if (confettiParticles.length > 0) requestAnimationFrame(runConfetti);
  else { confettiRunning = false; confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight); }
}

/* ===========================================================
   7. BALLOON CELEBRATION
   =========================================================== */
function initBalloons() {
  const field = $("#balloon-field");
  const gradients = [
    "linear-gradient(135deg,#ff6fb5,#ff9bd1)",
    "linear-gradient(135deg,#5b7fff,#8fa6ff)",
    "linear-gradient(135deg,#9b5de5,#c79bff)",
    "linear-gradient(135deg,#f4c95d,#ffe19c)",
  ];

  function resetBalloon(b) {
    const left = Math.random() * 84 + 4;
    const duration = Math.random() * 6 + 10;
    const delay = -Math.random() * duration;
    b.style.left = `${left}%`;
    b.style.background = gradients[Math.floor(Math.random() * gradients.length)];
    b.style.animationDuration = `${duration}s`;
    b.style.animationDelay = `${delay}s`;
    b.classList.remove("popped");
  }

  function popBalloon(b) {
    if (b.classList.contains("popped")) return;
    const rect = b.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 36);
    sfx.pop();
    b.classList.add("popped");
    const msg = CONFIG.balloonMessages[Math.floor(Math.random() * CONFIG.balloonMessages.length)];
    showToast(msg);
    setTimeout(() => resetBalloon(b), 1400 + Math.random() * 1200);
  }

  const total = 10;
  for (let i = 0; i < total; i++) {
    const b = document.createElement("div");
    b.className = "balloon";
    b.setAttribute("role", "button");
    b.setAttribute("tabindex", "0");
    b.setAttribute("aria-label", "Pop balloon");
    resetBalloon(b);
    b.addEventListener("click", () => popBalloon(b));
    b.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); popBalloon(b); } });
    field.appendChild(b);
  }
}

/* ===========================================================
   8. BIRTHDAY CAKE
   =========================================================== */
function initCake() {
  const candlesWrap = $("#candles");
  const cakeVisual = $("#cake-visual");
  const cutBtn = $("#cut-cake-btn");
  const instruction = $("#cake-instruction");
  const totalCandles = 14;
  let outCount = 0;

  for (let i = 0; i < totalCandles; i++) {
    const candle = document.createElement("button");
    candle.type = "button";
    candle.className = "candle";
    candle.setAttribute("aria-label", `Candle ${i + 1}, tap to blow out`);
    const flame = document.createElement("span");
    flame.className = "flame";
    candle.appendChild(flame);
    candle.addEventListener("click", () => {
      if (candle.classList.contains("out")) return;
      candle.classList.add("out");
      const smoke = document.createElement("span");
      smoke.className = "smoke";
      candle.appendChild(smoke);
      sfx.blow();
      outCount++;
      if (outCount < totalCandles) {
        instruction.textContent = `${totalCandles - outCount} candle${totalCandles - outCount === 1 ? "" : "s"} left to blow out`;
      } else {
        instruction.textContent = "All candles out! Now cut the cake 🍰";
        cutBtn.disabled = false;
      }
    });
    candlesWrap.appendChild(candle);
  }

  cutBtn.addEventListener("click", () => {
    if (cakeVisual.classList.contains("is-cut")) return;
    cakeVisual.classList.add("is-cutting");
    sfx.chime();
    setTimeout(() => {
      cakeVisual.classList.add("is-cut");
      const rect = cakeVisual.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 140);
      showToast("Happy Birthday! Make a wish 🌟");
      cutBtn.textContent = "Wish Made ✨";
      cutBtn.disabled = true;
    }, 700);
  });
}

/* ===========================================================
   9. PERSONAL MESSAGE — typewriter
   =========================================================== */
function initTypewriter() {
  const textEl = $("#typewriter-text");
  const cursor = $("#typewriter-cursor");
  const fullText = CONFIG.message;
  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !started) {
        started = true;
        if (REDUCED_MOTION) { textEl.textContent = fullText; return; }
        let i = 0;
        const speed = 22;
        function typeChar() {
          if (i <= fullText.length) {
            textEl.textContent = fullText.slice(0, i);
            i++;
            setTimeout(typeChar, speed);
          } else {
            cursor.classList.add("done-blink");
          }
        }
        typeChar();
        observer.unobserve($("#message"));
      }
    });
  }, { threshold: 0.3 });
  observer.observe($("#message"));
}

/* ===========================================================
   10. MEMORY GALLERY + LIGHTBOX
   =========================================================== */
function initGallery() {
  const grid = $("#gallery-grid");
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxCaption = $("#lightbox-caption");

  CONFIG.photos.forEach((photo) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View photo: ${photo.caption}`);

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";

    const icon = document.createElement("span");
    icon.className = "placeholder-icon";
    icon.textContent = "";
    icon.hidden = true;

    img.addEventListener("error", () => {
      img.hidden = true;
      icon.hidden = false;
      item.dataset.missing = "true";
    }, { once: true });

    const caption = document.createElement("p");
    caption.className = "gallery-caption";
    caption.textContent = photo.caption;

    item.append(img, icon, caption);

    function open() {
      if (item.dataset.missing === "true") {
        lightboxImg.hidden = true;
        lightboxCaption.textContent = `📷 Add a photo at ${photo.src} — ${photo.caption}`;
      } else {
        lightboxImg.hidden = false;
        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.caption;
        lightboxCaption.textContent = photo.caption;
      }
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }
    item.addEventListener("click", open);
    item.addEventListener("keydown", (e) => { if (e.key === "Enter") open(); });

    grid.appendChild(item);
  });

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  $("#lightbox-close").addEventListener("click", close);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
}

/* ===========================================================
   11. 16 THINGS I APPRECIATE
   =========================================================== */
function initAppreciate() {
  const grid = $("#appreciate-grid");
  const icons = ["✨", "💜", "🌟", "🎈", "🦋", "🌈", "🔥", "🌙", "💫", "🎀", "🌸", "⭐", "🍃", "💎", "🪐", "❤️"];

  CONFIG.appreciations.forEach((text, idx) => {
    const card = document.createElement("div");
    card.className = "glass-card appreciate-card reveal";
    card.style.transitionDelay = `${(idx % 4) * 70}ms`;
    card.innerHTML = `
      <span class="num">#${idx + 1}</span>
      <span class="icon" aria-hidden="true">${icons[idx % icons.length]}</span>
      <span class="text">${text}</span>
    `;
    grid.appendChild(card);
    revealObserver.observe(card);
  });
}

/* ===========================================================
   12. SURPRISE GIFT BOX
   =========================================================== */
function initGiftBox() {
  const box = $("#gift-box");
  const reveal = $("#gift-reveal");
  const hint = $("#gift-hint");
  $("#gift-message").textContent = CONFIG.giftMessage;

  box.addEventListener("click", () => {
    if (box.classList.contains("is-open")) return;
    box.classList.add("is-open");
    sfx.chime();
    const rect = box.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top, 50);
    hint.textContent = "🎁 Opened with love";
    reveal.hidden = false;
    requestAnimationFrame(() => reveal.classList.add("is-visible"));
  });
}

/* ===========================================================
   13. WISH WALL (localStorage)
   =========================================================== */
function initWishWall() {
  const form = $("#wish-form");
  const list = $("#wish-list");
  const STORAGE_KEY = "birthdayWishes";

  const seedWishes = [
    { name: "A Friend", text: "Wishing you the happiest 16th birthday — here's to an incredible year ahead! 🎉" },
  ];

  function loadWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) { localStorage.setItem(STORAGE_KEY, JSON.stringify(seedWishes)); return seedWishes; }
      return JSON.parse(raw);
    } catch (e) { return seedWishes; }
  }

  function saveWishes(wishes) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes)); } catch (e) { /* storage unavailable */ }
  }

  function renderWishes() {
    const wishes = loadWishes();
    list.innerHTML = "";
    wishes.forEach((w) => {
      const card = document.createElement("div");
      card.className = "wish-card";
      const name = document.createElement("p");
      name.className = "wish-name";
      name.textContent = w.name;
      const text = document.createElement("p");
      text.className = "wish-text";
      text.textContent = w.text;
      card.append(name, text);
      list.appendChild(card);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = $("#wish-name");
    const textInput = $("#wish-text");
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    if (!name || !text) return;

    const wishes = loadWishes();
    wishes.unshift({ name, text });
    saveWishes(wishes);
    renderWishes();
    sfx.ding();
    showToast("Your wish has been posted! 💌");
    form.reset();
  });

  renderWishes();
}

/* ===========================================================
   14. FRIENDSHIP TIMELINE
   =========================================================== */
function initTimeline() {
  const list = $("#timeline-list");
  CONFIG.timeline.forEach((entry, idx) => {
    const item = document.createElement("div");
    item.className = "timeline-item reveal";
    item.style.transitionDelay = `${idx * 80}ms`;
    item.innerHTML = `
      <p class="timeline-year">${entry.year}</p>
      <p class="timeline-title">${entry.title}</p>
      <p class="timeline-text">${entry.text}</p>
    `;
    list.appendChild(item);
    revealObserver.observe(item);
  });
}

/* ===========================================================
   15. FINALE — fireworks + floating hearts
   =========================================================== */
function initFinale() {
  const canvas = $("#fireworks-canvas");
  const ctx = canvas.getContext("2d");
  const section = $("#finale");
  let particles = [];
  let active = false;
  let spawnTimer = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = section.clientWidth * dpr;
    canvas.height = section.clientHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function launchFirework() {
    const w = section.clientWidth, h = section.clientHeight;
    const x = w * (0.25 + Math.random() * 0.5);
    const y = h * (0.25 + Math.random() * 0.35);
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const count = 34;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 3 + 2;
      particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, decay: 0.012 + Math.random() * 0.01, color, size: Math.random() * 2 + 1.5,
      });
    }
  }

  function render() {
    ctx.clearRect(0, 0, section.clientWidth, section.clientHeight);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.03; p.life -= p.decay;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    particles = particles.filter((p) => p.life > 0);
    if (active || particles.length > 0) requestAnimationFrame(render);
  }

  function startFireworks() {
    if (active) return;
    active = true;
    requestAnimationFrame(render);
    if (!REDUCED_MOTION) {
      launchFirework();
      spawnTimer = setInterval(launchFirework, 900);
    } else {
      launchFirework();
    }
  }
  function stopFireworks() {
    active = false;
    clearInterval(spawnTimer);
  }

  const heartsField = $("#hearts-field");
  let heartTimer = null;
  function spawnHeart() {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💜", "✨"][Math.floor(Math.random() * 3)];
    heart.style.left = `${Math.random() * 90 + 5}%`;
    heart.style.setProperty("--drift", `${(Math.random() - 0.5) * 80}px`);
    heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
    heart.addEventListener("animationend", () => heart.remove());
    heartsField.appendChild(heart);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startFireworks();
        if (!heartTimer) heartTimer = setInterval(spawnHeart, REDUCED_MOTION ? 4000 : 550);
      } else {
        stopFireworks();
        clearInterval(heartTimer);
        heartTimer = null;
      }
    });
  }, { threshold: 0.4 });
  observer.observe(section);
}

/* ===========================================================
   16. FINAL SCREEN — share, replay, easter egg
   =========================================================== */
function initFinalScreen() {
  $("#share-btn").addEventListener("click", async () => {
    const shareData = {
      title: `Happy 16th Birthday ${CONFIG.friendName}! 🎂`,
      text: `A little celebration made just for ${CONFIG.friendName} ✨`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard! 🔗");
      } catch (e) {
        showToast("Copy the link from your address bar to share 🔗");
      }
    }
  });

  $("#replay-btn").addEventListener("click", () => {
    resetCelebration();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Let's celebrate again! 🎉");
  });

  // Easter egg: tap the "Made with..." line 5 times quickly
  const eggEl = $("#easter-egg-trigger");
  let eggCount = 0;
  let eggTimer = null;
  eggEl.addEventListener("click", () => {
    eggCount++;
    clearTimeout(eggTimer);
    eggTimer = setTimeout(() => (eggCount = 0), 1400);
    if (eggCount === 5) {
      eggCount = 0;
      showToast("🌟 Secret found: you make every room brighter. Always have. 🌟", 4000);
      burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 100);
    }
  });
}

function resetCelebration() {
  // candles
  $all(".candle.out").forEach((c) => {
    c.classList.remove("out");
    c.querySelector(".smoke")?.remove();
  });
  $("#cake-visual").classList.remove("is-cutting", "is-cut");
  const cutBtn = $("#cut-cake-btn");
  cutBtn.disabled = true;
  cutBtn.textContent = "Cut The Cake 🍰";
  $("#cake-instruction").textContent = "Tap all 16 candles, then cut the cake";

  // balloons
  $all(".balloon.popped").forEach((b) => b.classList.remove("popped"));

  // gift box
  $("#gift-box").classList.remove("is-open");
  const reveal = $("#gift-reveal");
  reveal.classList.remove("is-visible");
  reveal.hidden = true;
  $("#gift-hint").textContent = "Tap the box ✨";
}

/* ===========================================================
   17. MUSIC TOGGLE
   =========================================================== */
function initMusic() {
  const btn = $("#music-toggle");
  const icon = $("#music-icon");
  const audio = $("#bg-music");

  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        icon.textContent = "🎶";
        btn.classList.add("playing");
        btn.setAttribute("aria-pressed", "true");
      }).catch(() => {
        showToast("Add your music file at assets/music.mp3 🎵");
      });
    } else {
      audio.pause();
      icon.textContent = "🎵";
      btn.classList.remove("playing");
      btn.setAttribute("aria-pressed", "false");
    }
  });
}

/* ===========================================================
   INIT — run everything once the DOM is ready
   =========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initStarfield();
  initScrollEffects();
  initHero();
  initCountdown();
  initBalloons();
  initCake();
  initTypewriter();
  initGallery();
  initAppreciate();
  initGiftBox();
  initWishWall();
  initTimeline();
  initFinale();
  initFinalScreen();
  initMusic();
});

/* PWA — register service worker if supported (no-op on file:// or unsupported browsers) */
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support unavailable, ignore */ });
  });
}
