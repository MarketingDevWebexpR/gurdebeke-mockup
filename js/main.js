/**
 * Gurdebeke - Main JavaScript
 * Handles: Swiper slider, scroll animations, counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initScrollAnimations();
  initCounters();
  initBackToTop();
  initSmoothScroll();
  initSolutionsTabs();
  initSitesMap();
});

/**
 * Hero Slider (Swiper.js)
 */
function initHeroSlider() {
  const progressBar = document.getElementById('hero-progress');
  const slideCounter = document.querySelector('.hero__nav-current');
  const totalSlides = document.querySelector('.hero__nav-total');
  const prevBtn = document.querySelector('.hero__nav-btn--prev');
  const nextBtn = document.querySelector('.hero__nav-btn--next');
  const autoplayDuration = 6000; // 6 seconds per slide

  const heroSwiper = new Swiper('#hero-slider', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 800,
    autoplay: {
      delay: autoplayDuration,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      init: function() {
        // Set total slides count
        if (totalSlides) {
          totalSlides.textContent = String(this.slides.length - 2).padStart(2, '0'); // -2 for loop duplicates
        }
        updateSlideCounter(this, slideCounter);
        animateProgressBar(progressBar, autoplayDuration);
      },
      slideChangeTransitionStart: function() {
        // Reset progress bar
        if (progressBar) {
          progressBar.style.transition = 'none';
          progressBar.style.width = '0%';
        }
        updateSlideCounter(this, slideCounter);
      },
      slideChangeTransitionEnd: function() {
        animateProgressBar(progressBar, autoplayDuration);
      }
    }
  });

  // Custom navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => heroSwiper.slidePrev());
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => heroSwiper.slideNext());
  }

  // Pause on hover
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', () => {
      heroSwiper.autoplay.stop();
      if (progressBar) {
        progressBar.style.animationPlayState = 'paused';
      }
    });

    heroSection.addEventListener('mouseleave', () => {
      heroSwiper.autoplay.start();
      if (progressBar) {
        progressBar.style.animationPlayState = 'running';
      }
    });
  }
}

/**
 * Update slide counter display
 */
function updateSlideCounter(swiper, counter) {
  if (!counter) return;
  // realIndex gives the actual slide index (works with loop)
  const currentIndex = swiper.realIndex + 1;
  counter.textContent = String(currentIndex).padStart(2, '0');
}

/**
 * Animate progress bar
 */
function animateProgressBar(progressBar, duration) {
  if (!progressBar) return;

  requestAnimationFrame(() => {
    progressBar.style.transition = `width ${duration}ms linear`;
    progressBar.style.width = '100%';
  });
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after animation (optional - keeps animation one-time)
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Animated Counters
 */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count, 10);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate a single counter
 */
function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  const startTime = performance.now();
  const startValue = 0;

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

    element.textContent = currentValue.toLocaleString('fr-FR');
    element.classList.add('is-counting');

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString('fr-FR');
      element.classList.remove('is-counting');
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');

  if (!backToTop) return;

  // Show/hide based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('is-visible');
    } else {
      backToTop.classList.remove('is-visible');
    }
  }

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        toggleBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // Skip if just "#"
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header').offsetHeight;
        const topbarHeight = document.querySelector('.topbar')?.offsetHeight || 0;
        const offset = headerHeight + topbarHeight + 20;

        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Parallax Effect (optional enhancement)
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.has-parallax');

  if (!parallaxElements.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.parallaxSpeed) || 0.5;
          const yPos = -(scrolled * speed);
          el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Lazy Loading Images (native support fallback)
 */
function initLazyLoading() {
  // Check for native lazy loading support
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback with Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('is-loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

/**
 * Solutions Tabs (Vertical tabs)
 */
function initSolutionsTabs() {
  const tabs = document.querySelectorAll('.solutions__tab');
  const panels = document.querySelectorAll('.solutions__panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.dataset.tab;

      // Remove active class from all tabs and panels
      tabs.forEach(t => t.classList.remove('is-active'));
      panels.forEach(p => p.classList.remove('is-active'));

      // Add active class to clicked tab and corresponding panel
      tab.classList.add('is-active');
      document.querySelector(`[data-panel="${targetPanel}"]`).classList.add('is-active');
    });
  });
}

/**
 * Sites Map (Leaflet.js)
 */
function initSitesMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  // Initialize map centered on Picardie region
  const map = L.map('map').setView([49.55, 2.85], 9);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  // Custom marker icons by department
  const createMarkerIcon = (color) => L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  const oiseIcon = createMarkerIcon('#70B62C'); // Green for Oise
  const sommeIcon = createMarkerIcon('#F39C12'); // Orange for Somme

  // Get site cards and add markers
  const siteCards = document.querySelectorAll('.site-card');
  const markers = [];

  siteCards.forEach((card, index) => {
    const lat = parseFloat(card.dataset.lat);
    const lng = parseFloat(card.dataset.lng);
    const title = card.querySelector('.site-card__title').textContent;
    const desc = card.querySelector('.site-card__desc').textContent;
    const image = card.dataset.image;
    const isSomme = card.classList.contains('site-card--somme');
    const markerIcon = isSomme ? sommeIcon : oiseIcon;

    if (lat && lng) {
      const popupContent = `
        <div class="site-popup">
          <img src="${image}" alt="${title}" class="site-popup__image">
          <div class="site-popup__content">
            <strong class="site-popup__title">${title}</strong>
            <p class="site-popup__desc">${desc}</p>
          </div>
        </div>
      `;

      const marker = L.marker([lat, lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(popupContent, { maxWidth: 280, className: 'site-popup-container' });

      markers.push(marker);

      // Click on card to highlight marker
      card.addEventListener('click', () => {
        map.setView([lat, lng], 12);
        marker.openPopup();

        // Highlight card
        siteCards.forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
      });

      // Click on marker to highlight card
      marker.on('click', () => {
        siteCards.forEach(c => c.classList.remove('is-active'));
        card.classList.add('is-active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  });

  // Fit map to show all markers
  if (markers.length > 0) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }
}
