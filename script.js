document.addEventListener('DOMContentLoaded', () => {
    // 1. Animasi Masuk (Cinematic Intro)
    const mainCard = document.getElementById('main-card');
    setTimeout(() => {
        mainCard.classList.add('loaded');
    }, 200);

    // ==========================================
    // 2. LOGIKA SLIDER FOTO OTOMATIS (ATAS)
    // ==========================================
    const slides = document.querySelectorAll('.slider-img');
    let currentSlide = 0;

    // Ganti foto setiap 4000 milidetik (4 detik)
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);

    // ==========================================
    // 3. LOGIKA AUDIO (AUTOPLAY 2 DETIK & TOMBOL)
    // ==========================================
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const iconPlay = document.getElementById('icon-play');
    const iconPause = document.getElementById('icon-pause');
    const btnText = document.getElementById('btn-text');
    let isPlaying = false;

    // Set volume agar tidak terlalu mengagetkan (0.5 = 50%)
    bgMusic.volume = 0.5; 

    // Fungsi untuk memperbarui tampilan tombol
    const updateUI = (playing) => {
        if (playing) {
            iconPause.classList.remove('hidden');
            iconPlay.classList.add('hidden');
            btnText.textContent = "Pause";
            musicBtn.classList.add('playing');
            isPlaying = true;
        } else {
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
            btnText.textContent = "Play Our Song";
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    };

    // --- FITUR AUTOPLAY DENGAN JEDA 2 DETIK ---
    setTimeout(() => {
        // Coba putar musik
        let playPromise = bgMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Berhasil Autoplay!
                updateUI(true);
            }).catch(error => {
                // Jika diblokir oleh browser, mainkan saat user pertama kali menyentuh layar
                console.log("Autoplay tertahan kebijakan browser. Menunggu interaksi pertama...");
                
                const playOnInteraction = () => {
                    bgMusic.play();
                    updateUI(true);
                    // Hapus pendengar event agar tidak berulang
                    document.body.removeEventListener('click', playOnInteraction);
                    document.body.removeEventListener('touchstart', playOnInteraction);
                };

                // Deteksi klik atau sentuhan pertama di layar mana saja
                document.body.addEventListener('click', playOnInteraction, { once: true });
                document.body.addEventListener('touchstart', playOnInteraction, { once: true });
            });
        }
    }, 500); // 2000 = jeda 2 detik

    // --- LOGIKA TOMBOL PLAY/PAUSE ---
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Mencegah bentrok dengan klik layar di atas
        if (isPlaying) {
            bgMusic.pause();
            updateUI(false);
        } else {
            bgMusic.play();
            updateUI(true);
        }
    });
});
