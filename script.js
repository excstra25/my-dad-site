/* =========================================
   GREEN AWARENESS
   JavaScript
========================================= */


/* ---------- Mobile Navigation ---------- */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("open");

        const isOpen = navLinks.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";

    });


    /* Close menu after clicking a link */

    const links = navLinks.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });

}


/* ---------- Current Year ---------- */

const yearElement = document.getElementById("year");


if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* ---------- Header Scroll Effect ---------- */

const header = document.querySelector(".header");


if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.style.boxShadow =
                "0 8px 30px rgba(0, 0, 0, .15)";

        } else {

            header.style.boxShadow = "none";

        }

    });

}


/* ---------- Simple Reveal Animation ---------- */

const revealElements = document.querySelectorAll(
    ".info-card, .effect, .prevention-item, .author-card, .contact-item"
);


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });

}


/* ---------- Render User Posts (from localStorage) ---------- */

function renderUserPosts() {
    const container = document.getElementById('userPosts');
    if (!container) return;

    let posts = [];
    try {
        posts = JSON.parse(localStorage.getItem('userPosts') || '[]');
    } catch (e) { posts = []; }

    if (!posts.length) {
        container.innerHTML = '<p style="color:var(--muted);">No contributions yet.</p>';
        return;
    }

    container.innerHTML = posts.map(p => {
        const img = p.image ? `<img src="${p.image}" alt="${p.title}" style="max-width:220px; border-radius:8px; margin-top:8px;">` : '';
        const vid = p.video ? `<div style="margin-top:8px;"><a href="${p.video}" target="_blank" rel="noopener">▶ Watch video</a></div>` : '';
        return `
            <article class="info-card">
                <h3>${p.title || 'Untitled'}</h3>
                <p style="color:var(--muted);">${p.writeup || ''}</p>
                ${img}
                ${vid}
            </article>
        `;
    }).join('');
}

document.addEventListener('DOMContentLoaded', renderUserPosts);