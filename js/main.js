/* ============================================================
   Vortex Construction Solutions — site scripts
   ------------------------------------------------------------
   ONE THING TO CHANGE BEFORE GOING LIVE:
   paste your Google Apps Script web-app URL into FORM_ENDPOINT
   below. Full instructions in apps-script/SETUP.md
   ============================================================ */

const FORM_ENDPOINT = "https://script.google.com/macros/s/PASTE_YOUR_DEPLOYMENT_ID_HERE/exec";

/* ---------- Mobile navigation ---------- */
(function nav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("primary-nav");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", () => setOpen(menu.dataset.open !== "true"));

  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth <= 940) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.dataset.open === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) setOpen(false);
  });
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  items.forEach((el) => io.observe(el));
})();

/* ---------- Contact / enquiry form ---------- */
(function contactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const submit = form.querySelector("button[type='submit']");
  const submitLabel = submit ? submit.textContent : "";

  const say = (state, message) => {
    status.dataset.state = state;
    status.textContent = message;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Honeypot: real people never fill this in.
    if (form.elements.company_website && form.elements.company_website.value) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.page = window.location.pathname;
    payload.submitted_at = new Date().toISOString();

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Sending…";
    }
    say("sending", "Sending your enquiry…");

    try {
      if (FORM_ENDPOINT.includes("PASTE_YOUR_DEPLOYMENT_ID_HERE")) {
        throw new Error("endpoint-not-configured");
      }

      // text/plain keeps this a "simple request", so the browser
      // skips the CORS preflight that Apps Script cannot answer.
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || result.status !== "ok") throw new Error(result.message || "send-failed");

      form.reset();
      say("ok", "Thanks — your enquiry is with us. We'll be in touch shortly. For anything urgent, call 0426 833 505.");
    } catch (error) {
      const unconfigured = error.message === "endpoint-not-configured";
      say(
        "error",
        unconfigured
          ? "The form isn't connected yet. Add your Apps Script URL to js/main.js — see apps-script/SETUP.md."
          : "That didn't send. Please email admin@vortexconsol.com.au or call 0426 833 505 and we'll pick it up straight away."
      );
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    }
  });

  // Pre-select the enquiry type from ?type= in the URL
  const type = new URLSearchParams(window.location.search).get("type");
  const select = form.elements.enquiry_type;
  if (type && select) {
    const match = Array.from(select.options).find((o) => o.value === type);
    if (match) select.value = type;
  }
})();

/* ---------- Footer year ---------- */
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
