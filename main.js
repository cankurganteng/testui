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

        // Data dari product-card untuk sharing
        const brand = productCard.getAttribute('data-brand');
        const price = productCard.getAttribute('data-price');
        const title = productCard.querySelector('h3').textContent;
        const link = '/detail.html'; // Link ke detail.html
        // console.log('Generated link:', window.location.origin + '/' + link);
        const message = `Check out this ${brand} ${title} for Rp${price}. Includes video, images, and full description. Link: ${window.location.origin}/${link}`;

        // Fungsi untuk membuka sharing URL
        function shareTo(platform, url) {
            window.open(url, '_blank');
            closePopup(); // Tutup pop-up setelah klik
        }

        // Event listener untuk tombol Detail
        btnDetail.addEventListener('click', () => {
            window.location.href = 'detail.html'; // Arahkan ke detail.html
        });

        // Event listener untuk tombol Share
        btnShare.addEventListener('click', () => {
            sharePopup.style.display = 'block';
            overlay1.style.display = 'block';
        });

        // Event listener untuk ikon sosial media
        document.getElementById('share-whatsapp').addEventListener('click', () => {
            const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
            shareTo('WhatsApp', url);
        });

        document.getElementById('share-tiktok').addEventListener('click', () => {
            const url = 'https://www.tiktok.com/'; // Buka halaman utama TikTok (tidak ada sharing langsung)
            shareTo('TikTok', url);
        });

        document.getElementById('share-instagram').addEventListener('click', () => {
            const url = 'https://www.instagram.com/'; // Buka halaman utama Instagram (tidak ada sharing langsung)
            shareTo('Instagram', url);
        });

        document.getElementById('share-telegram').addEventListener('click', () => {
            const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin + '/' + link)}&text=${encodeURIComponent(message)}`;
            shareTo('Telegram', url);
        });

        // Fungsi untuk menutup pop-up
        function closePopup() {
            sharePopup.style.display = 'none';
            overlay1.style.display = 'none';
        }

        // Tutup pop-up saat klik overlay
        overlay1.addEventListener('click', closePopup);




