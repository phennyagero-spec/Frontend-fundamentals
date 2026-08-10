document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");
    const backdrop = document.getElementById("navBackdrop");

    if (!hamburger || !navLinks || !backdrop) return;

    function openMenu() {
        navLinks.classList.add("active");
        backdrop.classList.add("active");
        hamburger.classList.add("active");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        navLinks.classList.remove("active");
        backdrop.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    backdrop.addEventListener("click", closeMenu);

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

});