document.addEventListener('DOMContentLoaded', function() {

    // --- 1. INISIALISASI AOS & LIGHTGALLERY ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }

    const galleryEl = document.getElementById('lightgallery');
    if (galleryEl && typeof lightGallery !== 'undefined') {
        lightGallery(galleryEl, {
            speed: 500,
            download: false
        });
    }

    // --- 2. FITUR KOTAK MISTERIUS + PUTAR LAGU (KLIK PERTAMA) ---
    const mysteryBox = document.getElementById('mystery-box');
    const content1 = document.getElementById('hero-content-1');
    const content2 = document.getElementById('hero-content-2');
    const content3 = document.getElementById('hero-content-3');
    const bgMusic = document.getElementById('bg-music');

    if (mysteryBox) {
        mysteryBox.addEventListener('click', function() {
            // Kotak dipaksa hilang langsung
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
            setTimeout(() => {
                this.style.display = 'none';
            }, 300);

            // PUTAR LAGU OTOMATIS SAAT KOTAK DIKLIK
            if (bgMusic) {
                bgMusic.play().catch(error => {
                    console.log("Autoplay dicegah oleh browser:", error);
                });
            }

            // Memunculkan konten foto love dan tombol OPEN LETTER
            if (content1) content1.style.opacity = '1';
            setTimeout(() => { if (content2) content2.style.opacity = '1'; }, 200);
            setTimeout(() => { if (content3) content3.style.opacity = '1'; }, 400);
        });
    }

    // --- 3. NAVIGASI BERGILIR (SLIDE SEBELUMNYA DIJAMIN HILANG) ---
    const headerHero = document.querySelector('header'); // Slide 1 (Foto Love & Kado)
    const btnOpenLetter = document.getElementById('btn-open-letter');
    const letterSection = document.getElementById('letter-section');     // Slide 2 (Surat)
    
    const btnNext1 = document.getElementById('btn-next-1');
    const memoriesSection = document.getElementById('memories-section'); // Slide 3 (Memori)
    
    const btnNext2 = document.getElementById('btn-next-2');
    const finaleSection = document.getElementById('finale-section');

   const btnNext3 = document.getElementById('btn-next-3');
    const headerHero = document.getElementById('header');
  
    // A. Saat tombol OPEN LETTER dipencet -> Slide 1 hilang, Slide 2 muncul
    if (btnOpenLetter && letterSection) {
        btnOpenLetter.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (headerHero) {
                headerHero.style.display = 'none';
            }
            
            letterSection.classList.remove('hidden-section');
            letterSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // B. Saat tombol NEXT di surat dipencet -> Slide 2 DIJAMIN HILANG, Slide 3 muncul
    if (btnNext1 && memoriesSection && letterSection) {
        btnNext1.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Sembunyikan Slide 2 secara total menggunakan class
            letterSection.classList.remove('show-section');
            letterSection.classList.add('hidden-section');

            // Munculkan Slide 3
            memoriesSection.classList.remove('hidden-section');
            memoriesSection.classList.add('show-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // C. Saat tombol NEXT di memori dipencet -> Slide 3 DIJAMIN HILANG, Slide 4 muncul
    if (btnNext2 && finaleSection && memoriesSection) {
        btnNext2.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Sembunyikan Slide 3 secara total menggunakan class
            memoriesSection.classList.remove('show-section');
            memoriesSection.classList.add('hidden-section');

            // Munculkan Slide 4
            finaleSection.classList.remove('hidden-section');
            finaleSection.classList.add('show-section');
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
            for (let i = 0; i < numPetals; i++) {
                petals.push(new Petal());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petals.forEach(petal => { petal.update(); });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }
});
