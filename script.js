(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Mobile nav */
  var nav = document.querySelector(".navbar");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function closeNav() {
    if (!nav || !toggle || !menu) return;
    nav.classList.remove("is-open");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && menu && nav) {
    toggle.addEventListener("click", function () {
      var open = !menu.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 769px)").matches) {
        closeNav();
      }
    });
  }

  /* Smooth scroll offset for sticky header */
  var header = document.querySelector(".site-header");
  var headerOffset = header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = this.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 8;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Contact form */
  var form = document.getElementById("contact-form");
  var statusEl = document.getElementById("form-status");

  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusEl.classList.remove("is-success", "is-error");
      var name = form.elements.name && form.elements.name.value.trim();
      var email = form.elements.email && form.elements.email.value.trim();
      var message = form.elements.message && form.elements.message.value.trim();

      if (!name || !email || !message) {
        statusEl.textContent = "Please fill in all fields.";
        statusEl.classList.add("is-error");
        return;
      }

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        statusEl.textContent = "Please enter a valid email address.";
        statusEl.classList.add("is-error");
        return;
      }

      statusEl.textContent =
        "Thanks — your message is ready to send. Connect this form to a backend or form service to deliver it.";
      statusEl.classList.add("is-success");
      form.reset();
    });
  }
})();
