/**
 * BAO Insurtech - Mobile Navigation Handler
 * Handles mobile menu toggle and responsive behavior
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get elements
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNavMenu = document.querySelector('.mobile-nav-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileNavMenu.classList.toggle('active');

    // Prevent body scroll when menu is open
    if (mobileNavMenu.classList.contains('active')) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileNavMenu.classList.remove('active');
    body.style.overflow = '';
  }

  // Event listener for mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', function () {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    const isClickInsideMenu = mobileNavMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      mobileNavMenu.classList.contains('active')
    ) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Close mobile menu if window is resized to desktop view
      if (
        window.innerWidth > 768 &&
        mobileNavMenu.classList.contains('active')
      ) {
        closeMobileMenu();
      }
    }, 250);
  });

  // Smooth scroll for anchor links
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Only prevent default for valid anchor links
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Add scroll effect to header (optional enhancement)
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow on scroll
    if (scrollTop > 10) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }

    lastScrollTop = scrollTop;
  });
});
