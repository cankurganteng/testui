
        const slider = document.getElementById('slider');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const totalSlides = slides.length; // 5 (termasuk duplikasi)
        let autoSlideInterval;
        const video = document.getElementById('video1');
        const video2 = document.getElementById('video2');

        // Fungsi untuk slide ke slide tertentu
        function goToSlide(index, instant = false) {
            if (instant) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${index * 100}%)`;
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            } else {
                slider.style.transform = `translateX(-${index * 100}%)`;
            }
            currentSlide = index;
            // Jika di slide duplikasi (4), reset ke 0 setelah transisi
            if (index === totalSlides - 1) {
                setTimeout(() => {
                    goToSlide(0, true);
                    video.currentTime = 0;
                    video.play();
                }, 500);
            }
            // Jika kembali ke video asli (0), play video
            if (index === 0) {
                video.currentTime = 0;
                video.play();
            }
        }

        // Video play otomatis saat halaman load
        window.addEventListener('load', () => {
            video.play();
        });

        // Ketika video ended, slide ke gambar pertama dan mulai auto-slide
        video.addEventListener('ended', () => {
            video.pause();
            goToSlide(1);
            startAutoSlide();
        });

        // Fungsi untuk memulai auto-slide dari currentSlide
        function startAutoSlide() {
            clearInterval(autoSlideInterval); // Pastikan tidak ada interval sebelumnya
            autoSlideInterval = setInterval(() => {
                let nextSlide = currentSlide + 1;
                goToSlide(nextSlide);
                if (nextSlide === totalSlides - 1) {
                    clearInterval(autoSlideInterval);
                }
            }, 3000);
        }

        // Klik thumbnail: pindah slide, set active, dan mulai auto-slide dari sana
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                goToSlide(index);
                // Update active class
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                // Mulai auto-slide dari slide yang diklik
                startAutoSlide();
            });
        });

        // WhatsApp popup
        const whatsappIcon = document.getElementById('whatsappIcon');
        const popup = document.getElementById('popup');
        whatsappIcon.addEventListener('click', () => {
            popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        });

        // Klik popup untuk redirect ke WhatsApp website
        popup.addEventListener('click', () => {
            window.open('https://web.whatsapp.com', '_blank');
        });

        // Tutup popup jika klik di luar
        document.addEventListener('click', (e) => {
            if (!whatsappIcon.contains(e.target) && !popup.contains(e.target)) {
                popup.style.display = 'none';
            }
        });
