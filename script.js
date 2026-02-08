/* ============================================
   ADVENTURE TIME VALENTINE'S DAY
   Theme: AT aesthetic | Subject: YOU (the viewer)
   ============================================ */

// === STATE ===
let currentPage = 1;
const totalPages = 8;
let noClickCount = 0;
let isTransitioning = false;
let mouseX = 0;
let mouseY = 0;

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    createBackgroundHearts();
    createStars();
    setupCursorSparkle();
    trackMouse();
});

// === BACKGROUND HEARTS ===
function createBackgroundHearts() {
    const container = document.getElementById('heartsBg');
    const hearts = ['💖', '💗', '💕', '💓', '♥', '❤'];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'bg-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (12 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(heart);
    }
}

// === STAR BACKGROUND ===
function createStars() {
    const container = document.getElementById('starsBg');
    for (let i = 0; i < 30; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 3) + 's';
        star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        container.appendChild(star);
    }
}

// === CURSOR SPARKLE ===
function setupCursorSparkle() {
    let lastSparkle = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 120) return;
        lastSparkle = now;

        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.textContent = ['✨', '💖', '⭐', '💗'][Math.floor(Math.random() * 4)];
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.setProperty('--tx', (Math.random() * 40 - 20) + 'px');
        sparkle.style.setProperty('--ty', (Math.random() * -40 - 10) + 'px');
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });
}

// === MOUSE TRACKING (for No button escape) ===
function trackMouse() {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

// === PAGE NAVIGATION ===
function nextPage() {
    if (isTransitioning) return;
    if (currentPage >= totalPages) return;

    isTransitioning = true;
    const current = document.getElementById('page' + currentPage);
    const next = document.getElementById('page' + (currentPage + 1));

    // Exit current page
    current.classList.remove('active');
    current.classList.add('exit-left');

    // Enter next page
    setTimeout(() => {
        current.classList.remove('exit-left');
        current.style.opacity = '0';
        current.style.visibility = 'hidden';

        next.style.opacity = '1';
        next.style.visibility = 'visible';
        next.classList.add('active');

        currentPage++;
        isTransitioning = false;

        // Trigger page-specific animations
        onPageEnter(currentPage);
    }, 500);
}

function onPageEnter(pageNum) {
    // Re-trigger bounce animations
    const page = document.getElementById('page' + pageNum);
    const bounceElements = page.querySelectorAll('.bounce-in');
    bounceElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = '';
    });

    // Re-trigger fade animations
    const fadeElements = page.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = '';
    });

    // Page 7: Setup No button escape behavior
    if (pageNum === 7) {
        setupNoButtonEscape();
    }
}

// === THE "NO" BUTTON MECHANICS ===
// Progressive difficulty - gets harder and harder to click "No"

const noResponses = [
    "Are you sure? 🥺",
    "Really?? That hurt a little ... 😢",
    "Think again, please! 💔",
    "My heart just cracked a little ... 😭",
    "Jake is running away but I'm not giving up! 😤",
    "You're breaking my heart here ... 💔😢",
    "Please reconsider... for me? 🥺👉👈",
    "I promise I'll make you smile every day! 😊",
    "Even Finn wouldn't give up on Fiona! 🗡️",
    "PLEASE! I'll go on any adventure for you! ⚔️",
    "Jake keeps running... just like my hope 🐕💨",
    "I'll share my last slice of everything burrito! 🌯",
    "Okay this is getting desperate... 😅",
    "You're really gonna do this to me ?! 💔",
    "Fine... just click BMO already! 😤💖",
];

const noBtnBehaviors = [
    // Click 1: Button wiggles, text changes
    () => {
        const noBtn = document.getElementById('noBtn');
        noBtn.classList.add('wiggle');
        setTimeout(() => noBtn.classList.remove('wiggle'), 400);
    },
    // Click 2: Button teleports to random position
    () => {
        teleportNoButton();
    },
    // Click 3: Button shrinks 20% + teleports
    () => {
        shrinkNoButton(0.8);
        teleportNoButton();
    },
    // Click 4: Button spins + teleports
    () => {
        const noBtn = document.getElementById('noBtn');
        noBtn.classList.add('spin');
        setTimeout(() => {
            noBtn.classList.remove('spin');
            teleportNoButton();
        }, 500);
        shrinkNoButton(0.65);
    },
    // Click 5: Button becomes absolute positioned and flees
    () => {
        makeNoButtonRunAway();
        shrinkNoButton(0.5);
        growYesButton(1.15);
    },
    // Click 6+: Button keeps fleeing and shrinking
    () => {
        teleportNoButton();
        shrinkNoButton(0.4);
        growYesButton(1.3);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.3);
        growYesButton(1.45);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.22);
        growYesButton(1.6);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.16);
        growYesButton(1.75);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.1);
        growYesButton(1.9);
    },
    // Click 11+: Microscopic button
    () => {
        teleportNoButton();
        shrinkNoButton(0.07);
        growYesButton(2.0);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.04);
        growYesButton(2.15);
    },
    () => {
        teleportNoButton();
        shrinkNoButton(0.02);
        growYesButton(2.3);
    },
    () => {
        // Basically invisible at this point
        teleportNoButton();
        shrinkNoButton(0.01);
        growYesButton(2.5);
    },
    () => {
        // Gone! Hide the No button completely
        const noBtn = document.getElementById('noBtn');
        noBtn.style.display = 'none';
        growYesButton(2.8);
    }
];

function sayNo() {
    const responseText = document.getElementById('noResponseText');

    // Update response text
    const responseIndex = Math.min(noClickCount, noResponses.length - 1);
    responseText.textContent = noResponses[responseIndex];
    responseText.classList.remove('shake');
    void responseText.offsetHeight;
    responseText.classList.add('shake');

    // Execute behavior for this click count
    const behaviorIndex = Math.min(noClickCount, noBtnBehaviors.length - 1);
    noBtnBehaviors[behaviorIndex]();

    noClickCount++;

    // Screen shake effect
    document.body.style.animation = 'none';
    void document.body.offsetHeight;
    document.body.style.animation = 'screenShake 0.3s ease';
}

// Add screen shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes screenShake {
        0%, 100% { transform: translate(0, 0); }
        20% { transform: translate(-3px, 2px); }
        40% { transform: translate(3px, -2px); }
        60% { transform: translate(-2px, 3px); }
        80% { transform: translate(2px, -3px); }
    }
`;
document.head.appendChild(shakeStyle);

function teleportNoButton() {
    const noBtn = document.getElementById('noBtn');
    const container = document.getElementById('page7');
    const containerRect = container.getBoundingClientRect();

    // Calculate safe bounds
    const btnRect = noBtn.getBoundingClientRect();
    const padding = 20;
    const maxX = containerRect.width - btnRect.width - padding;
    const maxY = containerRect.height - btnRect.height - padding;

    // Random position away from the Yes button
    const yesBtn = document.getElementById('yesBtn');
    const yesRect = yesBtn.getBoundingClientRect();
    let newX, newY;
    let attempts = 0;

    do {
        newX = padding + Math.random() * maxX;
        newY = padding + Math.random() * maxY;
        attempts++;
    } while (
        attempts < 20 &&
        Math.abs(newX - (yesRect.left - containerRect.left)) < 150 &&
        Math.abs(newY - (yesRect.top - containerRect.top)) < 100
    );

    // Make button fixed position if not already
    if (!noBtn.classList.contains('running-away')) {
        noBtn.classList.add('running-away');
    }

    noBtn.classList.add('teleport');
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    setTimeout(() => noBtn.classList.remove('teleport'), 50);
}

function shrinkNoButton(scale) {
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('shrinking');
    noBtn.style.transform = `scale(${scale})`;
}

function growYesButton(scale) {
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = `scale(${Math.min(scale, 2.8)})`;
    yesBtn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
}

function makeNoButtonRunAway() {
    const noBtn = document.getElementById('noBtn');
    noBtn.classList.add('running-away');
    teleportNoButton();
}

// Make the No button run away from cursor on page 7
function setupNoButtonEscape() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;

    document.getElementById('page7').addEventListener('mousemove', (e) => {
        if (noClickCount < 5) return; // Only after 5 clicks
        if (!noBtn.classList.contains('running-away')) return;

        const btnRect = noBtn.getBoundingClientRect();
        const btnCenterX = btnRect.left + btnRect.width / 2;
        const btnCenterY = btnRect.top + btnRect.height / 2;

        const dx = btnCenterX - e.clientX;
        const dy = btnCenterY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If mouse gets within 100px, button runs away
        if (distance < 120) {
            const angle = Math.atan2(dy, dx);
            const pushDistance = 150;
            let newX = btnCenterX + Math.cos(angle) * pushDistance - btnRect.width / 2;
            let newY = btnCenterY + Math.sin(angle) * pushDistance - btnRect.height / 2;

            // Keep within viewport
            const padding = 10;
            newX = Math.max(padding, Math.min(window.innerWidth - btnRect.width - padding, newX));
            newY = Math.max(padding, Math.min(window.innerHeight - btnRect.height - padding, newY));

            noBtn.style.transition = 'left 0.2s ease, top 0.2s ease';
            noBtn.style.left = newX + 'px';
            noBtn.style.top = newY + 'px';
        }
    });
}

// === SAY YES! ===
function sayYes() {
    // Screen flash
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // Transition to celebration page
    setTimeout(() => {
        nextPage();

        // Launch confetti
        setTimeout(() => {
            createConfetti();
            createCelebrationBurst();
        }, 300);
    }, 200);
}

// === CONFETTI ===
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FF6B9D', '#42A5F5', '#FFD700', '#CE93D8', '#4CAF50', '#FF1493', '#FF8A80', '#AB47BC'];
    const shapes = ['square', 'circle', 'triangle'];

    // Initial burst
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            spawnConfetti(container, colors, shapes);
        }, i * 30);
    }

    // Continuous confetti
    let confettiInterval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
            spawnConfetti(container, colors, shapes);
        }
    }, 200);

    // Stop after 8 seconds
    setTimeout(() => clearInterval(confettiInterval), 8000);
}

function spawnConfetti(container, colors, shapes) {
    const confetti = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    confetti.className = `confetti ${shape}`;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = (6 + Math.random() * 10) + 'px';
    confetti.style.height = (6 + Math.random() * 10) + 'px';
    confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
    confetti.style.animationDelay = Math.random() * 0.5 + 's';

    if (shape === 'triangle') {
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderBottomColor = color;
    }

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

function createCelebrationBurst() {
    // Create a burst of emojis from the center
    const emojis = ['💖', '💗', '💕', '⭐', '✨', '🎉', '🎊', '👑', '🍬', '💎'];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('span');
            emoji.className = 'sparkle';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.left = centerX + 'px';
            emoji.style.top = centerY + 'px';
            emoji.style.fontSize = '24px';

            const angle = (Math.PI * 2 / 20) * i;
            const distance = 100 + Math.random() * 150;
            emoji.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            emoji.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            emoji.style.animationDuration = '1.5s';

            document.body.appendChild(emoji);
            setTimeout(() => emoji.remove(), 1500);
        }, i * 50);
    }
}

// === RESTART ===
function restart() {
    // Reset state
    noClickCount = 0;
    currentPage = 1;
    isTransitioning = false;

    // Reset No button
    const noBtn = document.getElementById('noBtn');
    noBtn.style = '';
    noBtn.className = 'valentine-btn jake-no-btn';
    noBtn.style.display = '';

    // Reset Yes button
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style = '';

    // Reset response text
    const responseText = document.getElementById('noResponseText');
    responseText.textContent = '';

    // Clear confetti
    const confettiContainer = document.getElementById('confettiContainer');
    confettiContainer.innerHTML = '';

    // Hide all pages
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById('page' + i);
        page.classList.remove('active', 'exit-left', 'enter-right');
        page.style.opacity = '0';
        page.style.visibility = 'hidden';
    }

    // Show first page
    const firstPage = document.getElementById('page1');
    firstPage.style.opacity = '1';
    firstPage.style.visibility = 'visible';
    firstPage.classList.add('active');

    // Re-trigger animations
    onPageEnter(1);
}

// === KEYBOARD SUPPORT ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
        // Only for non-question pages
        if (currentPage < 7) {
            nextPage();
        }
    }
});

// === TOUCH SUPPORT for mobile ===
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Swipe left to go forward
    if (diff > 50 && currentPage < 7) {
        nextPage();
    }
});
