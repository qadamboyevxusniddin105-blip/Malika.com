export const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Will you be mine? 🐾💕</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Sacramento&display=swap" rel="stylesheet">
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js"></script>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
    }

    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #ffe4e6 0%, #fce7f3 45%, #fff1f2 100%);
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
      padding: 1rem;
      position: relative;
    }

    /* Floating background hearts */
    .floating-hearts-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      z-index: 1;
    }

    .bg-heart {
      position: absolute;
      bottom: -40px;
      animation: floatUp 8s linear infinite;
      color: rgba(244, 63, 94, 0.25);
      font-size: 20px;
    }

    @keyframes floatUp {
      0% {
        transform: translateY(0) scale(0.6) rotate(0deg);
        opacity: 0;
      }
      15% { opacity: 0.6; }
      85% { opacity: 0.6; }
      100% {
        transform: translateY(-110vh) scale(1.3) rotate(360deg);
        opacity: 0;
      }
    }

    /* Main Card */
    .card {
      position: relative;
      z-index: 10;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 32px;
      padding: 2.5rem 2rem;
      width: 100%;
      max-width: 460px;
      text-align: center;
      box-shadow: 0 20px 45px -10px rgba(225, 29, 72, 0.15),
                  0 8px 20px -4px rgba(0, 0, 0, 0.04),
                  inset 0 0 0 1px rgba(255, 255, 255, 0.8);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    .cat-wrapper {
      position: relative;
      width: 220px;
      height: 220px;
      margin: 0 auto 1.5rem;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 12px 25px -6px rgba(244, 63, 94, 0.2);
      background: #fdf2f8;
      border: 3px solid #fff;
    }

    .cat-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .cat-badge {
      position: absolute;
      bottom: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.9);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      color: #e11d48;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    }

    .title {
      font-family: 'Fredoka', cursive;
      font-size: 2.25rem;
      font-weight: 700;
      color: #881337;
      line-height: 1.2;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-size: 1rem;
      color: #9f1239;
      opacity: 0.85;
      font-weight: 600;
      margin-bottom: 2rem;
      min-height: 24px;
    }

    /* Buttons Container */
    .buttons-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      position: relative;
      min-height: 80px;
      flex-wrap: wrap;
    }

    /* Yes Button */
    .btn-yes {
      background: linear-gradient(135deg, #f43f5e 0%, #e11d48 50%, #be123c 100%);
      color: white;
      font-family: 'Fredoka', sans-serif;
      font-weight: 600;
      font-size: 1.25rem;
      padding: 0.85rem 2.25rem;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 10px 25px -4px rgba(225, 29, 72, 0.45);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.25s ease;
      z-index: 20;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transform-origin: center center;
    }

    .btn-yes:hover {
      box-shadow: 0 14px 30px -4px rgba(225, 29, 72, 0.6);
    }

    /* No Button */
    .btn-no {
      background: #f1f5f9;
      color: #64748b;
      font-family: 'Nunito', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      padding: 0.85rem 1.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 9999px;
      cursor: pointer;
      transition: all 0.2s ease;
      z-index: 10;
      white-space: nowrap;
    }

    .btn-no:hover {
      background: #e2e8f0;
      color: #475569;
    }

    /* Reset button (Ask again) */
    .btn-reset {
      margin-top: 1.5rem;
      background: transparent;
      color: #be123c;
      border: 1.5px dashed #f43f5e;
      border-radius: 9999px;
      padding: 0.6rem 1.5rem;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-reset:hover {
      background: #ffe4e6;
      border-style: solid;
      transform: scale(1.05);
    }

    /* Sparkles / effects */
    .hidden {
      display: none !important;
    }
  </style>
</head>
<body>

  <!-- Floating Hearts Background -->
  <div class="floating-hearts-container" id="heartsBg"></div>

  <!-- Main Romantic Card -->
  <main class="card" id="mainCard">
    <div class="cat-wrapper">
      <img
        id="catImage"
        class="cat-img"
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3A4aGhkbDN3ZXFid3lva21pNm93eDVmaG5rY3YxMTB0dWppd3NscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
        alt="Cute Cat"
      />
      <div class="cat-badge" id="catBadge">🐾 Serious Cat</div>
    </div>

    <!-- Faqat Malika uchun sarlavha -->
    <h1 class="title" id="cardTitle">Malika, will you be mine? 💕</h1>
    <p class="subtitle" id="cardSubtitle">asked by a very small, very serious cat</p>

    <!-- Interactive Buttons -->
    <div class="buttons-container" id="buttonsWrapper">
      <button class="btn-yes" id="yesBtn">Yes 💕</button>
      <button class="btn-no" id="noBtn">No</button>
    </div>

    <!-- Restart / Ask Again -->
    <div id="resetContainer" class="hidden">
      <button class="btn-reset" id="resetBtn">
        ask me again 🔄
      </button>
    </div>
  </main>

  <script>
    // State
    let noClickCount = 0;
    let isAccepted = false;

    // Cat GIFs
    const CAT_IMAGES = {
      initial: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3A4aGhkbDN3ZXFid3lva21pNm93eDVmaG5rY3YxMTB0dWppd3NscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif',
      sad1: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJ3ZnpnOXpnYnlrM2w4cGM4anl1aWp2anF4c3B0ZHA1cG40bHRsNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif',
      sad2: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnFwM2NycTZ4OTdzNXhxcmQydnZzZTVmZjFnZXVybnZjaGNsOHRrcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob50R0O79CA/giphy.gif',
      happy: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDVrMnhjNm4wNGprdW9xMmxld2phNGppMjE1dDZpZzE4eXFjc291OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/T86i6yDyOYz7J6dPhf/giphy.gif'
    };

    // Sequential "No" messages
    const NO_PHRASES = [
      "No",
      "Are you sure? 🥺",
      "Think again 🥺",
      "Last chance! 🐾",
      "Really sure? 💔",
      "Don't break my heart! 😿",
      "Look at this cute face! 🥺",
      "Just say Yes! 💖",
      "Meow? 🥺",
      "You have no choice! 😻"
    ];

    // Scale multipliers for "Yes" button
    const SCALES = [1, 1.25, 1.55, 1.9, 2.3, 2.8, 3.4, 4.0, 4.8, 5.8];

    // Elements
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const catImage = document.getElementById('catImage');
    const catBadge = document.getElementById('catBadge');
    const cardTitle = document.getElementById('cardTitle');
    const cardSubtitle = document.getElementById('cardSubtitle');
    const resetContainer = document.getElementById('resetContainer');
    const resetBtn = document.getElementById('resetBtn');
    const heartsBg = document.getElementById('heartsBg');

    // Create floating background hearts
    function createBackgroundHearts() {
      const heartSymbols = ['💖', '💕', '💗', '💓', '✨', '🐾'];
      for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (6 + Math.random() * 7) + 's';
        heart.style.animationDelay = (Math.random() * 6) + 's';
        heart.style.fontSize = (16 + Math.random() * 20) + 'px';
        heartsBg.appendChild(heart);
      }
    }

    // Launch Heart Confetti
    function triggerHeartConfetti() {
      if (typeof confetti === 'function') {
        const count = 200;
        const defaults = { origin: { y: 0.7 } };

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55, shapes: ['circle'], colors: ['#f43f5e', '#fb7185', '#fda4af'] });
        fire(0.2, { spread: 60, colors: ['#e11d48', '#ffffff', '#f43f5e'] });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 1.2, colors: ['#f43f5e', '#fecdd3', '#fda4af'] });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffe4e6', '#be123c'] });
        fire(0.1, { spread: 120, startVelocity: 45, colors: ['#fb7185'] });
      }
    }

    // When "No" button is clicked or hovered when high count
    function handleNoClick() {
      if (isAccepted) return;
      noClickCount++;

      // 1. Scale Yes button
      const scaleIndex = Math.min(noClickCount, SCALES.length - 1);
      const currentScale = SCALES[scaleIndex];
      yesBtn.style.transform = \`scale(\${currentScale})\`;

      // 2. Update No button text
      const phraseIndex = Math.min(noClickCount, NO_PHRASES.length - 1);
      noBtn.innerText = NO_PHRASES[phraseIndex];

      // 3. Update Cat Reaction GIF
      if (noClickCount >= 4) {
        catImage.src = CAT_IMAGES.sad2;
        catBadge.innerText = "😿 Heartbroken";
      } else if (noClickCount >= 1) {
        catImage.src = CAT_IMAGES.sad1;
        catBadge.innerText = "🥺 Pleading";
      }

      // 4. Subtle playful dodge if count is high
      if (noClickCount >= 6) {
        const randomX = (Math.random() - 0.5) * 80;
        const randomY = (Math.random() - 0.5) * 50;
        noBtn.style.transform = \`translate(\${randomX}px, \${randomY}px) scale(\${Math.max(0.65, 1 - noClickCount * 0.05)})\`;
      }
    }

    // When "Yes" button is clicked
    function handleYesClick() {
      isAccepted = true;

      // 1. Change Cat GIF & Badge
      catImage.src = CAT_IMAGES.happy;
      catBadge.innerText = "😻 Pure Joy!";

      // 2. Change Titles
      cardTitle.innerText = "I knew it! You're mine now, Malika 😻";
      cardSubtitle.innerText = "purr-fect decision, malikam. 🐾✨";

      // 3. Hide No button, center Yes button or show celebrated state
      noBtn.style.display = 'none';
      yesBtn.style.transform = 'scale(1.1)';
      yesBtn.innerText = "Yaaay! 💕🎉";
      yesBtn.style.pointerEvents = 'none';

      // 4. Confetti!
      triggerHeartConfetti();

      // Repeat confetti waves
      setTimeout(triggerHeartConfetti, 400);
      setTimeout(triggerHeartConfetti, 900);

      // 5. Show "Ask me again" button
      resetContainer.classList.remove('hidden');
    }

    // Reset back to initial state
    function handleReset() {
      noClickCount = 0;
      isAccepted = false;

      catImage.src = CAT_IMAGES.initial;
      catBadge.innerText = "🐾 Serious Cat";

      cardTitle.innerText = "Malika, will you be mine? 💕";
      cardSubtitle.innerText = "asked by a very small, very serious cat";

      noBtn.style.display = 'inline-block';
      noBtn.style.transform = 'translate(0, 0) scale(1)';
      noBtn.innerText = NO_PHRASES[0];

      yesBtn.style.transform = 'scale(1)';
      yesBtn.innerText = "Yes 💕";
      yesBtn.style.pointerEvents = 'auto';

      resetContainer.classList.add('hidden');
    }

    // Listeners
    noBtn.addEventListener('click', handleNoClick);
    yesBtn.addEventListener('click', handleYesClick);
    resetBtn.addEventListener('click', handleReset);

    // Initial background setup
    createBackgroundHearts();
  </script>
</body>
</html>`;
