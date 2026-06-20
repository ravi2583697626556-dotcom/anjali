const pages = [
  {
    img: "img_10.webp",
    eyebrow: "Scene 1 — Wind Check",
    headline: "Hawa Bhi Confuse Hai!",
    caption: "Baal udd rahe hain, cap theek karne ki koshish ho rahi hai — phir bhi itni shaant aur pyari lag rahi ho ki paani bhi ruk ke dekh raha hai 🌬️😌"
  },
  {
    img: "img_9.webp",
    eyebrow: "Scene 2 — Water Entry",
    headline: "Paani Mein Queen Wali Entry!",
    caption: "Ek haath se paani uthaya aur poori river ne salute kar diya 🌊👑 — ise kehte hain main character energy."
  },
  {
    img: "img_8.webp",
    eyebrow: "Scene 3 — Splash Attack",
    headline: "Warning: Cute Splash Incoming!",
    caption: "Paani feka camera ki taraf, par sabse zyada toh yeh smile hi splash kar gayi 😂💦"
  },
  {
    img: "img_7.webp",
    eyebrow: "Scene 4 — Sunshine Mode",
    headline: "Suraj Bhi Jealous Ho Gaya!",
    caption: "Itni roshni toh suraj bhi nahi de pata jitni yeh smile de rahi hai ☀️✨ — official competition shuru ho chuki hai."
  },
  {
    img: "img_6.webp",
    eyebrow: "Scene 5 — Pure Joy",
    headline: "Khushi Overflow Alert!",
    caption: "Dono haath khole, paani udaya, aur ek dum free-spirited vibe — yeh moment hi sabse zyada 'real' hai 🙌💕"
  },
  {
    img: "img_5.webp",
    eyebrow: "Scene 6 — Candid Charm",
    headline: "Yeh Smile Toh Patent Karwani Chahiye!",
    caption: "Ek side-glance aur half smile — itna sukoon kisi aur frame mein nahi dikha 😍🌅"
  },
  {
    img: "img_4.webp",
    eyebrow: "Scene 7 — Cap Game Strong",
    headline: "Cuteness Certificate: Issued!",
    caption: "Cap thaam ke seedha camera mein dekha — aur instantly sabka dil bhi thaam liya 🧢💯"
  },
  {
    img: "img_3.webp",
    eyebrow: "Scene 8 — Bird's Eye View",
    headline: "Birds Bhi Fan Ban Gaye!",
    caption: "Haath uthaya aur birds udd ke poochhne lage 'yeh superstar kaun hai?' 🐦✨"
  },
  {
    img: "img_2.webp",
    eyebrow: "Scene 9 — Free Spirit",
    headline: "Energy 100, Frame Chhota Pad Gaya!",
    caption: "Baal hawa mein, haath khule, mood full carefree — camera bhi keep up nahi kar paaya 🌬️📸"
  },
  {
    img: "img_1.webp",
    eyebrow: "Final Scene — Official Verdict",
    headline: "Sabne Mil Ke Confirm Kar Diya!",
    caption: "Paani, hawa aur udte hue parinde — sabne ek saath gawahi di ki is river ki sabse cute insaan tu hi hai 🏆💕 Cuteness Meter ab officially MAXED OUT hai!"
  }
];

let current = 0;
const dotsContainer = document.getElementById('dots');
const photoEl = document.getElementById('photo');
const eyebrowEl = document.getElementById('eyebrow');
const headlineEl = document.getElementById('headline');
const captionEl = document.getElementById('caption');
const meterFill = document.getElementById('meterFill');
const meterText = document.getElementById('meterText');
const pageContent = document.getElementById('pageContent');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');

pages.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  dotsContainer.appendChild(d);
});
const dotEls = document.querySelectorAll('.dot');

function renderPage(index){
  const p = pages[index];
  photoEl.src = p.img;
  photoEl.alt = p.headline;
  eyebrowEl.textContent = p.eyebrow;
  headlineEl.textContent = p.headline;
  captionEl.textContent = p.caption;

  const pct = (index + 1) * 10;
  requestAnimationFrame(() => {
    meterFill.style.width = pct + '%';
    meterText.textContent = pct === 100 ? '100% — MAXED OUT' : pct + '%';
  });

  dotEls.forEach((d, i) => d.classList.toggle('active', i === index));

  backBtn.disabled = index === 0;
  nextBtn.textContent = index === pages.length - 1 ? '↺ Phir se dekhein' : 'Next →';

  // replay entrance animation
  pageContent.style.animation = 'none';
  void pageContent.offsetWidth;
  pageContent.style.animation = '';

  if(index === pages.length - 1){
    launchConfetti();
  }
}

function nextPage(){
  if(current === pages.length - 1){
    current = 0;
  } else {
    current++;
  }
  renderPage(current);
}

function prevPage(){
  if(current > 0){
    current--;
    renderPage(current);
  }
}

renderPage(0);

// floating background decorations
const decoEmojis = ['💖','✨','🌸','💕','⭐','💫','🦋','🌷'];
for(let i=0;i<10;i++){
  const el = document.createElement('span');
  el.className = 'float-deco';
  el.textContent = decoEmojis[Math.floor(Math.random()*decoEmojis.length)];
  el.style.left = Math.random()*100 + 'vw';
  el.style.fontSize = (18 + Math.random()*22) + 'px';
  const duration = 9 + Math.random()*10;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay = (Math.random()*duration) + 's';
  document.body.appendChild(el);
}

// lightweight confetti burst
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);

let particles = [];
let confettiRunning = false;

function launchConfetti(){
  const colors = ['#FF4F81','#7C5CFC','#FFC857','#FF8FB1','#9B8CFF'];
  particles = [];
  for(let i=0;i<110;i++){
    particles.push({
      x: canvas.width/2,
      y: canvas.height*0.35,
      vx: (Math.random()-0.5)*9,
      vy: Math.random()*-9 - 3,
      size: 5 + Math.random()*5,
      color: colors[Math.floor(Math.random()*colors.length)],
      rotation: Math.random()*360,
      rotSpeed: (Math.random()-0.5)*10,
      gravity: 0.22 + Math.random()*0.08,
      life: 0
    });
  }
  if(!confettiRunning){
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let alive = false;
  particles.forEach(p => {
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.rotSpeed;
    p.life++;
    if(p.y < canvas.height + 20 && p.life < 220){
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI/180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
      ctx.restore();
    }
  });
  if(alive){
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }
}

// Audio fallback: many browsers block autoplay until user interaction
document.body.addEventListener('click', () => {
  const bgMusic = document.getElementById('bgMusic');
  if(bgMusic && bgMusic.paused) {
    bgMusic.play().catch(e => console.log('Audio play failed:', e));
  }
}, { once: true });

const startBtn = document.getElementById('startBtn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    const overlay = document.getElementById('startOverlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(e => console.log('Audio play failed:', e));
    }
  });
}
