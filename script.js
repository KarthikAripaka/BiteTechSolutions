// Scroll-triggered animations for service cards
const animateOnScroll = () => {
  const cards = document.querySelectorAll('.service-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card) => observer.observe(card));
};

// Mobile Menu Toggle
const mobileMenuToggle = () => {
  const nav = document.querySelector('nav');
  const navbar = document.querySelector('.navbar');
  
  // Create mobile menu button if it doesn't exist
  if (!document.querySelector('.mobile-menu-btn')) {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuBtn.style.cssText = 'display: none; background: none; border: none; color: #222; font-size: 1.5rem; cursor: pointer; margin-left: auto;';
    navbar.appendChild(menuBtn);
    
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
      menuBtn.innerHTML = nav.classList.contains('mobile-active') 
        ? '<i class="fa-solid fa-times"></i>' 
        : '<i class="fa-solid fa-bars"></i>';
    });
  }
  
  // Show/hide menu button based on screen size
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const checkScreenSize = () => {
    if (window.innerWidth <= 768) {
      menuBtn.style.display = 'block';
      nav.style.display = 'none';
    } else {
      menuBtn.style.display = 'none';
      nav.style.display = 'block';
      nav.classList.remove('mobile-active');
    }
  };
  
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
};

// Initialize scroll animations after DOM loads
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  mobileMenuToggle();
});

// Also trigger on window load for already visible elements
window.addEventListener('load', () => {
  const visibleCards = document.querySelectorAll('.service-card');
  visibleCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.style.animationPlayState = 'running';
    }
  });
});

// Start at top or last section
window.addEventListener("load", () => {
  const lastSection = sessionStorage.getItem('lastSection');
  if (lastSection) {
    sessionStorage.removeItem('lastSection');
    const element = document.getElementById(lastSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    window.scrollTo(0, 0);
  }
});


function typeWriter() {
  if (i < text.length) {
    tagline.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

// Active nav highlight
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  let maxRatio = 0;
  let activeEntry = null;

  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
      maxRatio = entry.intersectionRatio;
      activeEntry = entry;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    link.classList.remove("active-home");
  });

  if (activeEntry) {
    navLinks.forEach(link => {
      if (link.getAttribute("href") === `#${activeEntry.target.id}`) {
        if (activeEntry.target.id === 'home') {
          link.classList.add("active-home");
        } else {
          link.classList.add("active");
        }
      }
    });
  }
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Get directions with user location
function getDirections() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=Visakhapatnam, Andhra Pradesh, India`;
      window.open(url, '_blank');
    }, () => {
      // Fallback if location denied
      const url = `https://www.google.com/maps/dir/?api=1&destination=Visakhapatnam, Andhra Pradesh, India`;
      window.open(url, '_blank');
    });
  } else {
    // Fallback
    const url = `https://www.google.com/maps/dir/?api=1&destination=Visakhapatnam, Andhra Pradesh, India`;
    window.open(url, '_blank');
  }
}
