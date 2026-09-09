document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Inisialisasi AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- 2. Inisialisasi LightGallery ---
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            speed: 500,
            download: false
        });
    }

    // --- 3. Efek Buka Kotak Misterius di Slide Pertama ---
document.addEventListener('DOMContentLoaded', function() {
    
    // --- Efek Buka Kotak Misterius ---
    const mysteryBox = document.getElementById('mystery-box');
    const content1 = document.getElementById('hero-content-1');
    const content2 = document.getElementById('hero-content-2');
    const content3 = document.getElementById('hero-content-3');

    if (mysteryBox) {
        mysteryBox.addEventListener('click', () => {
            // Sembunyikan kotak dan matikan fungsi kliknya secara permanen
            mysteryBox.classList.add('hidden-box');

            // Munculkan isi konten di baliknya
            if (content1) content1.style.opacity = '1';
            setTimeout(() => { if (content2) content2.style.opacity = '1'; }, 300);
            setTimeout(() => { if (content3) content3.style.opacity = '1'; }, 600);
        });
    }

    // --- Tombol Open Letter ---
    const btnOpenLetter = document.getElementById('btn-open-letter');
    const letterSection = document.getElementById('letter-section');

    if (btnOpenLetter && letterSection) {
        btnOpenLetter.addEventListener('click', (e) => {
            e.preventDefault();
            letterSection.style.display = 'block';
            letterSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Tombol Next 1 & 2 ---
    const btnNext1 = document.getElementById('btn-next-1');
    const memoriesSection = document.getElementById('memories-section');
    if (btnNext1 && memoriesSection) {
        btnNext1.addEventListener('click', (e) => {
            e.preventDefault();
            memoriesSection.style.display = 'block';
            memoriesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const btnNext2 = document.getElementById('btn-next-2');
    const finaleSection = document.getElementById('finale-section');
    if (btnNext2 && finaleSection) {
        btnNext2.addEventListener('click', (e) => {
            e.preventDefault();
            finaleSection.style.display = 'flex';
            finaleSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

    // --- 5. Video Uploader (Opsional) ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if (videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }

    // --- 6. Animasi Kelopak Sakura ---
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
            this.flip = Math.random();
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flipSpeed = Math.random() * 0.03;
        }

        Petal.prototype.draw = function() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
                this.xSpeed = 1.5 + Math.random() * 2;
                this.ySpeed = 1 + Math.random() * 1;
                this.flip = Math.random();
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
            this.flip += this.flipSpeed;
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
            petals.forEach(petal => {
                petal.update();
            });
            requestAnimationFrame(animate);
        }

        createPetals();
        animate();
    }
});
