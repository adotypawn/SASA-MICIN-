document.addEventListener('DOMContentLoaded', function() {

    // --- 1. INISIALISASI AOS & LIGHTGALLERY ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    const galleryEl = document.getElementById('lightgallery');
    if (galleryEl && typeof lightGallery !== 'undefined') {
        lightGallery(galleryEl, {
            speed: 500,
            download: false,
            selector: '.lg-item'
        });
    }

    // --- 2. FITUR KOTAK MISTERIUS + PUTAR LAGU (KLIK PERTAMA) ---
    const mysteryBox = document.getElementById('mystery-box');
    const content1 = document.getElementById('hero-content-1');
    const content2 = document.getElementById('hero-content-2');
    const content3 = document.getElementById('hero-content-3');
    const bgMusic = document.getElementById('bg-music');

    // --- animasi burst hati/sparkle saat kotak dibuka ---
    function spawnBurst() {
        const emojis = ['💖', '✨', '💕', '🌸', '💗'];
        const total = 18;
        for (let i = 0; i < total; i++) {
            const el = document.createElement('div');
            el.className = 'burst-particle';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = (Math.PI * 2 * i) / total + (Math.random() * 0.5 - 0.25);
            const dist = 110 + Math.random() * 170;
            el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
            el.style.animationDelay = (Math.random() * 80) + 'ms';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 1100);
        }
    }

    if (mysteryBox) {
        mysteryBox.addEventListener('click', function() {
            this.style.pointerEvents = 'none';
            this.classList.add('box-open-anim');
            spawnBurst();
            setTimeout(() => { this.style.display = 'none'; }, 500);

            if (bgMusic) {
                bgMusic.play().catch(error => {
                    console.log("Autoplay dicegah oleh browser:", error);
                });
            }

            // mulai hitung progress lagu sejak kotak dibuka
            if (typeof setPlaying === 'function') setPlaying(true);

            if (content1) content1.style.opacity = '1';
            setTimeout(() => { if (content2) content2.style.opacity = '1'; }, 200);
            setTimeout(() => { if (content3) content3.style.opacity = '1'; }, 400);
        });
    }

    // --- 3. NAVIGASI BERGILIR ---
    const headerHero = document.querySelector('header');
    const btnOpenLetter = document.getElementById('btn-open-letter');
    const letterSection = document.getElementById('letter-section');

    const btnNext1 = document.getElementById('btn-next-1');
    const memoriesSection = document.getElementById('memories-section');

    const btnNext2 = document.getElementById('btn-next-2');
    const finaleSection = document.getElementById('finale-section');

    if (btnOpenLetter && letterSection) {
        btnOpenLetter.addEventListener('click', function(e) {
            e.preventDefault();
            if (headerHero) headerHero.style.display = 'none';
            letterSection.classList.remove('hidden-section');
            letterSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (btnNext1 && memoriesSection && letterSection) {
        btnNext1.addEventListener('click', function(e) {
            e.preventDefault();
            letterSection.classList.remove('show-section');
            letterSection.classList.add('hidden-section');
            memoriesSection.classList.remove('hidden-section');
            memoriesSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const playerSection = document.getElementById('player-section');
    const btnNext3 = document.getElementById('btn-next-3');
    const btnRestart = document.getElementById('btn-restart');

    if (btnNext2 && playerSection && memoriesSection) {
        btnNext2.addEventListener('click', function(e) {
            e.preventDefault();
            memoriesSection.classList.remove('show-section');
            memoriesSection.classList.add('hidden-section');
            playerSection.classList.remove('hidden-section');
            playerSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (btnNext3 && finaleSection && playerSection) {
        btnNext3.addEventListener('click', function(e) {
            e.preventDefault();
            playerSection.classList.remove('show-section');
            playerSection.classList.add('hidden-section');
            finaleSection.classList.remove('hidden-section');
            finaleSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- KEMBALI KE AWAL (tombol di slide terakhir) ---
    if (btnRestart) {
        btnRestart.addEventListener('click', function(e) {
            e.preventDefault();

            // sembunyikan semua section lanjutan
            [letterSection, memoriesSection, playerSection, finaleSection].forEach(function(sec) {
                if (sec) {
                    sec.classList.remove('show-section');
                    sec.classList.add('hidden-section');
                }
            });

            // tampilkan kembali header (hero) awal
            if (headerHero) headerHero.style.display = '';

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. ANIMASI KELOPAK SAKURA ---
    const canvas = document.getElementById('sakura-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let petals = [];
        const numPetals = 50;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function Petal() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 25 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 40;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
            }
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.bezierCurveTo(this.x + this.w / 2, this.y - this.h / 2, this.x + this.w, this.y, this.x + this.w / 2, this.y + this.h / 2);
            ctx.bezierCurveTo(this.x, this.y + this.h, this.x - this.w / 2, this.y, this.x, this.y);
            ctx.closePath();
            ctx.fillStyle = '#FFB7C5';
            ctx.fill();
        }

        Petal.prototype.update = function() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.draw();
        }

        function createPetals() {
            petals = [];
            for (let i = 0; i < numPetals; i++) petals.push(new Petal());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => { petal.update(); });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }

    // --- 5. PEMUTAR MUSIK PINK (di dalam slide "Our Song") ---
    const DURATION = 252; // 4:12
    let current = 0, playing = false, timer = null, startTimestamp = 0;

    // elemen pemutar di slide "Our Song" (slide sebelum terakhir)
    const slideArt = document.getElementById('slideArt');
    const slidePlayBtn = document.getElementById('slidePlayBtn');
    const slidePlayIcon = document.getElementById('slidePlayIcon');
    const slideFill = document.getElementById('slideProgressFill');
    const slideTrack = document.getElementById('slideProgressTrack');
    const slideCur = document.getElementById('slideCurTime');
    const slideDur = document.getElementById('slideDurTime');

    function fmt(s){ s = Math.max(0, Math.floor(s)); const m = Math.floor(s/60), r = s%60; return m + ':' + (r<10?'0':'') + r; }

    function renderPlayer(){
      const pct = (current/DURATION)*100;
      if (slideFill) slideFill.style.width = pct + '%';
      if (slideCur) slideCur.textContent = fmt(current);
      if (slideDur) slideDur.textContent = fmt(DURATION);
    }

    function setPlaying(v){
      playing = v;
      if (slideArt) slideArt.classList.toggle('playing', v);
      const playSvg = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
      const pauseAsPlay = '<path d="M8 5.5v13l11-6.5z"/>';
      if (slidePlayIcon) slidePlayIcon.innerHTML = v ? playSvg : pauseAsPlay;
      if(v){
        startTimestamp = performance.now() - current * 1000;
        timer = setInterval(step, 250);
      } else {
        clearInterval(timer);
      }
    }

    function step(){
      current = (performance.now() - startTimestamp) / 1000;
      if(current >= DURATION){
        current = 0;
        startTimestamp = performance.now();
      }
      renderPlayer();
    }

    function seekFromEvent(track, e){
      const rect = track.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const pct = Math.min(1, Math.max(0, x / rect.width));
      current = pct * DURATION;
      startTimestamp = performance.now() - current * 1000;
      renderPlayer();
    }
    let dragging = false;
    if (slideTrack) {
      slideTrack.addEventListener('pointerdown', (e) => { dragging = true; seekFromEvent(slideTrack, e); });
      window.addEventListener('pointermove', (e) => { if(dragging) seekFromEvent(slideTrack, e); });
      window.addEventListener('pointerup', () => { dragging = false; });
    }

    // tombol play di slide "Our Song"
    if (slidePlayBtn) {
      slidePlayBtn.addEventListener('click', () => setPlaying(!playing));
    }

    renderPlayer();
});
