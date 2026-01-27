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
