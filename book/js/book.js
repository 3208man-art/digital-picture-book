/**
 * ほしの たび — 動くデジタル絵本
 * ページデータ・めくり操作・音声（ダミー）を管理します
 */

const pages = [
  {
    title: "おほしさまの たんじょう",
    text: "ある よる、\nそらに ちいさな ひかりが うまれました。\nなまえは 「キラ」。\nまだ ちいさくて、\nすこし こわがりさんです。",
    image: `
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff8d6"/>
            <stop offset="100%" stop-color="#ffe08a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="250" cy="48" r="34" fill="url(#moonGlow)"/>
        <circle cx="250" cy="48" r="18" fill="#fff4b8"/>
        <circle cx="258" cy="42" r="16" fill="#9ad7f0"/>
        <g fill="#fff" opacity="0.9">
          <circle cx="40" cy="36" r="2"/>
          <circle cx="70" cy="60" r="1.5"/>
          <circle cx="110" cy="28" r="2"/>
          <circle cx="160" cy="50" r="1.5"/>
          <circle cx="190" cy="22" r="2"/>
        </g>
        <ellipse cx="160" cy="210" rx="120" ry="18" fill="#7ecb9a" opacity="0.35"/>
        <path d="M40 190 C80 150, 120 170, 160 155 C200 140, 240 160, 280 145 L280 210 L40 210 Z" fill="#6fcf97"/>
        <path d="M0 200 C50 175, 90 195, 140 180 C190 165, 230 185, 320 170 L320 240 L0 240 Z" fill="#5bbf8a"/>
        <g transform="translate(150 120)">
          <polygon points="0,-28 8,-8 28,-8 12,4 18,24 0,12 -18,24 -12,4 -28,-8 -8,-8" fill="#ffd166" stroke="#f0b429" stroke-width="2"/>
          <circle cx="0" cy="0" r="10" fill="#fff6c8"/>
          <circle cx="-3" cy="-1" r="1.2" fill="#2a3340"/>
          <circle cx="3" cy="-1" r="1.2" fill="#2a3340"/>
          <path d="M-3 3 Q0 6 3 3" fill="none" stroke="#2a3340" stroke-width="1.4" stroke-linecap="round"/>
        </g>
      </svg>
    `
  },
  {
    title: "かぜに のって",
    text: "キラは かぜに のって\nたびへ でかけました。\nくもを すりぬけ、\nとりたちと あいさつ。\nせかいが どんどん\nひろがっていきます。",
    image: `
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <ellipse cx="70" cy="70" rx="42" ry="22" fill="#fff" opacity="0.85"/>
        <ellipse cx="95" cy="70" rx="28" ry="16" fill="#fff" opacity="0.85"/>
        <ellipse cx="230" cy="55" rx="50" ry="24" fill="#fff" opacity="0.75"/>
        <ellipse cx="260" cy="55" rx="30" ry="16" fill="#fff" opacity="0.75"/>
        <path d="M40 150 Q100 110 160 140 Q220 170 280 125" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 10" opacity="0.7"/>
        <g transform="translate(210 95)">
          <ellipse cx="0" cy="0" rx="22" ry="12" fill="#ff9b71"/>
          <ellipse cx="18" cy="-6" rx="14" ry="8" fill="#ffb08a"/>
          <circle cx="-8" cy="-2" r="1.5" fill="#2a3340"/>
          <path d="M-14 2 Q-8 6 -2 2" fill="none" stroke="#2a3340" stroke-width="1.3" stroke-linecap="round"/>
        </g>
        <g transform="translate(120 130)">
          <polygon points="0,-26 7,-7 26,-7 11,4 16,22 0,11 -16,22 -11,4 -26,-7 -7,-7" fill="#ffd166" stroke="#f0b429" stroke-width="2"/>
          <circle cx="0" cy="0" r="9" fill="#fff6c8"/>
          <circle cx="-3" cy="-1" r="1.1" fill="#2a3340"/>
          <circle cx="3" cy="-1" r="1.1" fill="#2a3340"/>
          <path d="M-3 3 Q0 5.5 3 3" fill="none" stroke="#2a3340" stroke-width="1.3" stroke-linecap="round"/>
        </g>
        <path d="M0 190 C60 170, 120 200, 180 175 C240 150, 280 180, 320 160 L320 240 L0 240 Z" fill="#7ecb9a"/>
        <path d="M0 210 C80 195, 140 220, 220 200 C270 188, 300 205, 320 195 L320 240 L0 240 Z" fill="#5bbf8a"/>
      </svg>
    `
  },
  {
    title: "みんなの ひかり",
    text: "よるの そらで\nおともだちの ほしが\nキラキラ まっていました。\n「おかえり！」\nキラの ひかりも\nみんなと いっしょに かがやきます。",
    image: `
      <svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="night" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#6eb6e0"/>
            <stop offset="100%" stop-color="#3d7ea6"/>
          </radialGradient>
        </defs>
        <rect width="320" height="240" fill="url(#night)"/>
        <g fill="#fff8c8">
          <polygon points="40,40 43,48 52,48 45,53 48,62 40,56 32,62 35,53 28,48 37,48"/>
          <polygon points="90,70 92,76 98,76 93,80 95,86 90,82 85,86 87,80 82,76 88,76"/>
          <polygon points="250,35 253,43 262,43 255,48 258,57 250,51 242,57 245,48 238,43 247,43"/>
          <polygon points="280,90 282,96 288,96 283,100 285,106 280,102 275,106 277,100 272,96 278,96"/>
          <polygon points="60,110 62,116 68,116 63,120 65,126 60,122 55,126 57,120 52,116 58,116"/>
        </g>
        <ellipse cx="160" cy="210" rx="130" ry="22" fill="#2f6b4f" opacity="0.55"/>
        <path d="M0 200 C70 175, 130 195, 180 180 C240 160, 280 185, 320 170 L320 240 L0 240 Z" fill="#3f8f66"/>
        <g transform="translate(160 125)">
          <polygon points="0,-34 10,-10 34,-10 14,5 22,28 0,14 -22,28 -14,5 -34,-10 -10,-10" fill="#ffd166" stroke="#f0b429" stroke-width="2.2"/>
          <circle cx="0" cy="0" r="12" fill="#fff6c8"/>
          <circle cx="-4" cy="-1" r="1.4" fill="#2a3340"/>
          <circle cx="4" cy="-1" r="1.4" fill="#2a3340"/>
          <path d="M-4 4 Q0 8 4 4" fill="none" stroke="#2a3340" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="-18" cy="-20" r="8" fill="#ffe08a" opacity="0.55"/>
          <circle cx="20" cy="-16" r="6" fill="#ffe08a" opacity="0.45"/>
        </g>
      </svg>
    `
  }
];

const pageEl = document.getElementById("page");
const pageImage = document.getElementById("pageImage");
const pageTitle = document.getElementById("pageTitle");
const pageBody = document.getElementById("pageBody");
const pageNumber = document.getElementById("pageNumber");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const audioBtn = document.getElementById("audioBtn");
const dotsEl = document.getElementById("dots");
const toastEl = document.getElementById("toast");

let currentIndex = 0;
let isAnimating = false;
let toastTimer = null;

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove("is-show");
  }, 1800);
}

function renderDots() {
  dotsEl.innerHTML = pages
    .map(
      (_, i) =>
        `<button type="button" class="dot" data-index="${i}" aria-label="${i + 1}ページ目へ" ${
          i === currentIndex ? 'aria-current="true"' : ""
        }></button>`
    )
    .join("");
}

function renderPage() {
  const page = pages[currentIndex];
  pageImage.innerHTML = page.image;
  pageTitle.textContent = page.title;
  pageBody.textContent = page.text;
  pageNumber.textContent = `${currentIndex + 1} / ${pages.length}`;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === pages.length - 1;
  renderDots();
}

function goTo(index, direction) {
  if (isAnimating) return;
  if (index < 0 || index >= pages.length || index === currentIndex) return;

  isAnimating = true;
  const exitClass = direction === "next" ? "is-exit-next" : "is-exit-prev";
  const enterClass = direction === "next" ? "is-enter-next" : "is-enter-prev";

  pageEl.classList.remove("is-enter-next", "is-enter-prev");
  pageEl.classList.add(exitClass);

  window.setTimeout(() => {
    currentIndex = index;
    renderPage();
    pageEl.classList.remove(exitClass);
    pageEl.classList.add(enterClass);

    window.setTimeout(() => {
      pageEl.classList.remove(enterClass);
      isAnimating = false;
    }, 480);
  }, 280);
}

function nextPage() {
  goTo(currentIndex + 1, "next");
}

function prevPage() {
  goTo(currentIndex - 1, "prev");
}

function playAudioDummy() {
  audioBtn.classList.add("is-playing");
  showToast("音声を再生しています…（サンプル）");

  // ブラウザ音声が使える環境では読み上げ（なければトーストのみ）
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(
      `${pages[currentIndex].title}。${pages[currentIndex].text.replace(/\n/g, " ")}`
    );
    utter.lang = "ja-JP";
    utter.rate = 0.95;
    utter.onend = () => audioBtn.classList.remove("is-playing");
    utter.onerror = () => audioBtn.classList.remove("is-playing");
    window.speechSynthesis.speak(utter);
  } else {
    window.setTimeout(() => audioBtn.classList.remove("is-playing"), 1600);
  }
}

/* --- イベント --- */
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  prevPage();
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  nextPage();
});

audioBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  playAudioDummy();
});

dotsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".dot");
  if (!btn) return;
  const index = Number(btn.dataset.index);
  goTo(index, index > currentIndex ? "next" : "prev");
});

/* ページ本体のタップでめくる（右半分＝次、左半分＝前） */
let suppressClick = false;

pageEl.addEventListener("click", (e) => {
  if (suppressClick) {
    suppressClick = false;
    return;
  }
  if (e.target.closest("button")) return;
  const rect = pageEl.getBoundingClientRect();
  const x = e.clientX - rect.left;
  if (x < rect.width / 2) {
    prevPage();
  } else {
    nextPage();
  }
});

/* スワイプ対応 */
let touchStartX = null;

pageEl.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].clientX;
  },
  { passive: true }
);

pageEl.addEventListener(
  "touchend",
  (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(dx) < 40) return;
    suppressClick = true;
    if (dx < 0) nextPage();
    else prevPage();
  },
  { passive: true }
);

/* キーボード操作 */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
});

/* 初期表示 */
renderPage();
