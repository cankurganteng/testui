 // Toggle Sidebar
        const hamburger = document.getElementById('hamburger');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });

        // JavaScript untuk Pencarian dan Filter (Desktop dan Mobile)
        const searchInput = document.getElementById('search');
        const brandFilter = document.getElementById('brand-filter');
        const priceRange = document.getElementById('price-range');

        const searchMobile = document.getElementById('search-mobile');
        const brandFilterMobile = document.getElementById('brand-filter-mobile');
        const priceRangeMobile = document.getElementById('price-range-mobile');
        const filterBtnMobile = document.getElementById('filter-btn-mobile');

        const productList = document.getElementById('product-list');
        const products = productList.getElementsByClassName('product-card');

        function filterProducts(query, brand, priceRangeValue) {
            Array.from(products).forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                const productBrand = product.getAttribute('data-brand');
                const price = parseInt(product.getAttribute('data-price'));

                const matchesQuery = title.includes(query);
                const matchesBrand = !brand || productBrand === brand;

                let matchesPrice = true;
                if (priceRangeValue) {
                    const [min, max] = priceRangeValue.split('-').map(v => parseInt(v) || Infinity);
                    if (priceRangeValue.includes('+')) {
                        matchesPrice = price > 1000000000;
                    } else {
                        matchesPrice = price >= min && (max === Infinity || price <= max);
                    }
                }

                if (matchesQuery && matchesBrand && matchesPrice) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        // Desktop: Filter otomatis
        function applyFilter() {
            const query = searchInput.value.toLowerCase();
            const brand = brandFilter.value;
            const range = priceRange.value;
            filterProducts(query, brand, range);
        }

        searchInput.addEventListener('input', applyFilter);
        brandFilter.addEventListener('change', applyFilter);
        priceRange.addEventListener('change', applyFilter);

        // Mobile: Filter hanya saat tombol diklik
        filterBtnMobile.addEventListener('click', () => {
            const query = searchMobile.value.toLowerCase();
            const brand = brandFilterMobile.value;
            const range = priceRangeMobile.value;
            filterProducts(query, brand, range);
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
        });



        // JavaScript untuk Slider Kontinyu
        const slider = document.getElementById('slider');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        let currentIndex = 0;
        const totalSlides = 4; // Jumlah slide asli (tanpa duplikat)

        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * (100 / 5)}%)`; // 5 adalah total elemen (4 asli + 1 duplikat)
        }

        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateSlider();
            if (currentIndex === totalSlides) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    updateSlider();
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex === 0) {
                slider.style.transition = 'none';
                currentIndex = totalSlides;
                updateSlider();
                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                    currentIndex--;
                    updateSlider();
                }, 50);
            } else {
                currentIndex--;
                updateSlider();
            }
        });

        // Auto-slide (opsional, hapus jika tidak diinginkan)
        setInterval(() => {
            currentIndex++;
            updateSlider();
            if (currentIndex === totalSlides) {
                setTimeout(() => {
                    slider.style.transition = 'none';
                    currentIndex = 0;
                    updateSlider();
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                    }, 50);
                }, 500);
            }
        }, 3000);


        
        // Ambil elemen
        const btnDetail = document.getElementById('btn-detail');
        const btnShare = document.getElementById('btn-share');
        const sharePopup = document.getElementById('share-popup');
        const overlay1 = document.getElementById('overlay');
        const productCard = document.querySelector('.product-card');

        // Data dari product-card
        const brand = productCard.getAttribute('data-brand');
        const price = productCard.getAttribute('data-price');
        const title = productCard.querySelector('h3').textContent;
        const link = 'detail.html'; // Link ke detail.html

        // URL konten dari detail.html (hardcode berdasarkan kode Anda)
        // const videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Video utama
        const imageUrl = 'https://via.placeholder.com/800x400?text=Car+Image+1'; // Gambar utama
        const text = `Check out this ${brand} ${title} for Rp${price}. Includes video and images from ${window.location.origin}/${link}`;

        // Fungsi untuk fetch file sebagai blob
        async function fetchAsBlob(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch file');
            return await response.blob();
        }

        // Fungsi untuk share menggunakan Web Share API
        async function shareContent(platform, fileUrl, fileType) {
            if (!navigator.share) {
                // Fallback: Buka URL sharing jika Web Share tidak didukung
                alert('Browser Anda tidak mendukung sharing langsung. Menggunakan fallback.');
                const fallbackUrls = {
                    whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.origin + '/' + link)}`,
                    telegram: `https://t.me/share/url?url=${encodeURIComponent(window.location.origin + '/' + link)}&text=${encodeURIComponent(text)}`,
                    tiktok: 'https://www.tiktok.com/',
                    instagram: 'https://www.instagram.com/'
                };
                window.open(fallbackUrls[platform], '_blank');
                closePopup();
                return;
            }

            try {
                const blob = await fetchAsBlob(fileUrl);
                const file = new File([blob], `${title}.${fileType}`, { type: blob.type });

                await navigator.share({
                    title: title,
                    text: text,
                    files: [file] // Share file langsung
                });
                closePopup();
            } catch (error) {
                console.error('Error sharing:', error);
                alert('Gagal membagikan konten. Coba lagi.');
            }
        }

        // Event listener untuk tombol Detail
        btnDetail.addEventListener('click', () => {
            window.location.href = 'detail.html';
        });

        // Event listener untuk tombol Share
        btnShare.addEventListener('click', () => {
            sharePopup.style.display = 'block';
            overlay1.style.display = 'block';
        });

        // Event listener untuk ikon sosial media
        document.getElementById('share-whatsapp').addEventListener('click', () => {
            shareContent('whatsapp', imageUrl, 'png', 'jpeg', 'jpg'); // Share video
        });

        document.getElementById('share-tiktok').addEventListener('click', () => {
            // TikTok tidak mendukung sharing langsung; buka halaman utama
            window.open('https://www.tiktok.com/', '_blank');
            closePopup();
        });

        document.getElementById('share-instagram').addEventListener('click', () => {
            // Instagram tidak mendukung sharing langsung; buka halaman utama
            window.open('https://www.instagram.com/', '_blank');
            closePopup();
        });

        document.getElementById('share-telegram').addEventListener('click', () => {
            shareContent('telegram', imageUrl, 'jpg'); // Share gambar (Telegram mendukung file)
        });

        // Fungsi untuk menutup pop-up
        function closePopup() {
            sharePopup.style.display = 'none';
            overlay1.style.display = 'none';
        }

        // Tutup pop-up saat klik overlay
        overlay1.addEventListener('click', closePopup);


