// Start at top
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// Typing effect
const text = "Innovating the Future of Technology";
const tagline = document.querySelector(".tagline");
let i = 0;

function typeWriter() {
  if (i < text.length) {
    tagline.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Active nav highlight
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));
