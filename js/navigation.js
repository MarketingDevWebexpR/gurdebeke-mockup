/**
 * Gurdebeke - Navigation JavaScript
 * Handles: Sticky header, mobile menu, dropdowns
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initDropdowns();
});

/**
 * Sticky Header with scroll effect
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  const topbar = document.querySelector('.topbar');

  if (!header) return;

  const topbarHeight = topbar ? topbar.offsetHeight : 0;
  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    const currentScroll = window.scrollY;

    // Add scrolled class when past topbar
    if (currentScroll > topbarHeight) {
      header.classList.add('is-scrolled');

      // Hide topbar when scrolling down, show when scrolling up
      if (topbar) {
        if (currentScroll > lastScroll && currentScroll > 200) {
          // Scrolling down
          topbar.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up
          topbar.style.transform = 'translateY(0)';
        }
      }
    } else {
      header.classList.remove('is-scrolled');
      if (topbar) {
        topbar.style.transform = 'translateY(0)';
      }
    }

    lastScroll = currentScroll;
  }

  // Add transition to topbar
  if (topbar) {
    topbar.style.transition = 'transform 0.3s ease';
    topbar.style.position = 'fixed';
    topbar.style.top = '0';
    topbar.style.left = '0';
    topbar.style.right = '0';
    topbar.style.zIndex = '301';
  }

  // Throttled scroll handler
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateHeader();
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navList = nav?.querySelector('.nav__list');
  const body = document.body;

  if (!toggle || !navList) return;

  // Create mobile overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    z-index: 299;
  `;
  document.body.appendChild(overlay);

  // Toggle menu
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-active');

    toggle.classList.toggle('is-active');
    navList.classList.toggle('is-open');
    body.classList.toggle('menu-open');

    if (!isOpen) {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    } else {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }
  });

  // Close on overlay click
  overlay.addEventListener('click', () => {
    toggle.classList.remove('is-active');
    navList.classList.remove('is-open');
    body.classList.remove('menu-open');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('is-active')) {
      toggle.classList.remove('is-active');
      navList.classList.remove('is-open');
      body.classList.remove('menu-open');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
    }
  });

  // Add mobile styles dynamically
  addMobileStyles();
}

/**
 * Add mobile navigation styles
 */
function addMobileStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 991px) {
      .nav__toggle {
        display: flex !important;
      }

      .nav__list {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        max-width: 80vw;
        height: 100vh;
        background: var(--color-white);
        flex-direction: column;
        padding: 80px 24px 24px;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 300;
        overflow-y: auto;
      }

      .nav__list.is-open {
        transform: translateX(0);
      }

      .nav__item {
        width: 100%;
        border-bottom: 1px solid var(--color-gray-200);
      }

      .nav__link {
        width: 100%;
        padding: 16px 0;
        justify-content: space-between;
      }

      .nav__link::after {
        display: none;
      }

      .nav__dropdown {
        position: static;
        box-shadow: none;
        padding: 0;
        padding-left: 16px;
        max-height: 0;
        overflow: hidden;
        opacity: 1;
        visibility: visible;
        transform: none;
        transition: max-height 0.3s ease;
      }

      .nav__item.is-dropdown-open .nav__dropdown {
        max-height: 500px;
      }

      .nav__item.is-dropdown-open .nav__link svg {
        transform: rotate(180deg);
      }

      .nav__dropdown-link {
        padding: 12px 0;
      }

      .nav__dropdown-link:hover {
        padding-left: 8px;
      }

      body.menu-open {
        overflow: hidden;
      }
    }
  `;
  document.head.appendChild(style);
}

/**
 * Dropdown menus (desktop hover, mobile click)
 */
function initDropdowns() {
  const dropdownItems = document.querySelectorAll('.nav__item');

  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav__link');
    const dropdown = item.querySelector('.nav__dropdown');

    if (!dropdown) return;

    // Mobile: toggle on click
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        // Only prevent default if there's a dropdown
        if (dropdown) {
          e.preventDefault();
          item.classList.toggle('is-dropdown-open');

          // Close other dropdowns
          dropdownItems.forEach(other => {
            if (other !== item) {
              other.classList.remove('is-dropdown-open');
            }
          });
        }
      }
    });
  });

  // Close dropdowns when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 991) {
      if (!e.target.closest('.nav__item')) {
        dropdownItems.forEach(item => {
          item.classList.remove('is-dropdown-open');
        });
      }
    }
  });
}

/**
 * Active navigation link based on scroll position
 */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('is-active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('is-active');
          }
        });
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Resize handler for responsive behavior
 */
function initResizeHandler() {
  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reset mobile menu state on resize to desktop
      if (window.innerWidth > 991) {
        const toggle = document.getElementById('nav-toggle');
        const navList = document.querySelector('.nav__list');
        const overlay = document.querySelector('.nav-overlay');

        if (toggle) toggle.classList.remove('is-active');
        if (navList) navList.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        if (overlay) {
          overlay.style.opacity = '0';
          overlay.style.visibility = 'hidden';
        }

        // Reset dropdowns
        document.querySelectorAll('.nav__item').forEach(item => {
          item.classList.remove('is-dropdown-open');
        });
      }
    }, 250);
  });
}

// Initialize resize handler
initResizeHandler();
