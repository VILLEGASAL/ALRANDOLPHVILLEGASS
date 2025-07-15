// Add click effect to hero image
const heroImage = document.querySelector('.hero-image');
heroImage.addEventListener('click', function() {
    this.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        this.style.animation = 'float 6s ease-in-out infinite';
    }, 600);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('mobile-open');
    // Change button text based on menu state
    if (navLinks.classList.contains('mobile-open')) {
        mobileMenuToggle.textContent = '✕'; // Close icon
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
    } else {
        mobileMenuToggle.textContent = '☰'; // Hamburger icon
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('mobile-open');
        mobileMenuToggle.textContent = '☰'; // Reset to hamburger icon
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Smooth scrolling for navigation links with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        const headerOffset = document.querySelector('header').offsetHeight; // Get dynamic header height
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });

        // Manually set active class immediately after clicking a nav link
        // This will override the scroll-based active class for a moment
        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Add active class to current section
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const headerHeight = document.querySelector('header').offsetHeight;

    let current = '';
    // Iterate through sections from bottom to top
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        // Adjust sectionTop to account for header height
        // We add a small offset (e.g., headerHeight + 5) to make sure the section is clearly below the header
        // before it becomes active. This helps with sections that are very short or at the bottom.
        const sectionTop = section.offsetTop - headerHeight - 1;

        // Check if the current scroll position is at or past the section's adjusted top
        // AND if the section itself is visible on screen.
        // The `scrollY + window.innerHeight / 2` checks if the middle of the viewport is within the section.
        if (window.scrollY >= sectionTop - 10 && (section.getBoundingClientRect().top <= window.innerHeight / 2 && section.getBoundingClientRect().bottom >= window.innerHeight / 2)) {
                current = section.getAttribute('id');
                break; // Found the current section, no need to check further
        }
        // Fallback for contact section at the very bottom
        if (section.id === 'contact' && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            current = 'contact';
            break;
        }
    }


    // Special handling for the "home" (hero) section when at the very top
    if (window.scrollY < headerHeight + 50) { // If near the top, make sure 'home' is active
        current = 'home';
    }


    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Initial call to set active nav
updateActiveNav();

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = '#222831'; /* Stay dark */
    } else {
        header.style.background = '#222831'; /* Stay dark */
    }
});

// --- Scroll Reveal Animation Logic ---
const scrollRevealSections = document.querySelectorAll('section');

const revealSection = () => {
    const windowHeight = window.innerHeight;
    scrollRevealSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        // Adjust this value to control when the animation triggers
        // For example, 150 means when 150px of the section is visible
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('visible');
        } else {
            // Optional: remove 'visible' class if you want the animation to re-play on scroll up
            // section.classList.remove('visible');
        }
    });
};

// Run on scroll
window.addEventListener('scroll', revealSection);

// Run on page load to reveal sections already in view
revealSection();

// Ensure hero section is visible on load
document.querySelector('#home').classList.add('visible');

// Force scroll to top on page load/refresh
window.onload = function() {
    // Scroll the entire document to the top
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE
    document.body.scrollTop = 0;           // For Safari

    // Add a slight delay to ensure it overrides browser scroll restoration
    setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 1); // A minimal delay of 1ms is often enough
};