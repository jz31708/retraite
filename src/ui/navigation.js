export function initialiseNavigation() {
  const toggle = document.querySelector("#menuToggle");
  const nav = document.querySelector("#mainNav");
  if (!toggle || !nav) return;

  const close = ({ returnFocus = false } = {}) => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") close({ returnFocus: true });
  });
  window.matchMedia("(min-width: 741px)").addEventListener("change", () => close());

  const links = [...nav.querySelectorAll("a[href^='#']")];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => link.removeAttribute("aria-current"));
        nav.querySelector(`a[href="#${entry.target.id}"]`)?.setAttribute("aria-current", "location");
      }
    }, { rootMargin: "-18% 0px -72% 0px" });
    sections.forEach((section) => observer.observe(section));
  }
}
