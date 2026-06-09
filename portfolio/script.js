/**
 * script.js — Client-side interactivity for the Diego Caputi Personal Portfolio.
 *
 * Usage:
 *   <script src="script.js"></script>
 *   Include at the end of <body> in index.html, about.html, resume.html, and
 *   any future pages that share these behaviors.
 *
 * Modules (in order):
 *   1. Scroll-in animations  — fades elements up as they enter the viewport
 *   2. Mobile nav toggle     — hamburger button opens/closes the nav dropdown
 *   3. Contact form handler  — async Formspree submission without page reload
 *
 * Dependencies:
 *   - IntersectionObserver API (supported in all modern browsers)
 *   - fetch API (supported in all modern browsers)
 *   - DOM IDs: nav-toggle, nav-links, contact-form, form-btn, form-success, form-error
 *   - CSS class: .fade-up (defined in styles.css) — toggled to .fade-up.visible
 *
 * Author: Diego Caputi
 */


/* ─────────────────────────────────────────────────────────────
   MODULE 1: SCROLL-IN ANIMATIONS
───────────────────────────────────────────────────────────── */

/**
 * Animate elements with the '.fade-up' class into view as the user scrolls.
 *
 * Uses the browser's native IntersectionObserver API to watch each element.
 * When an element reaches 10% visibility in the viewport, the 'visible'
 * class is added, triggering the CSS opacity + translateY transition defined
 * in the .fade-up rule in styles.css.
 *
 * Elements in the same callback batch are staggered 80ms apart so they
 * cascade in sequentially rather than all appearing at once.
 *
 * Once an element becomes visible it is unobserved, so the callback never
 * fires again for that element (avoids re-triggering on scroll back up).
 *
 * @type {IntersectionObserver}
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger each element in the batch by 80ms — creates a wave effect
      // when multiple .fade-up elements enter the viewport simultaneously
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target); // stop watching once visible
    }
  });
}, {
  threshold: 0.1 // fire when 10% of the element is in view
});

// Observe every element that should animate in on scroll
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


/* ─────────────────────────────────────────────────────────────
   MODULE 2: MOBILE NAV TOGGLE
───────────────────────────────────────────────────────────── */

/**
 * Toggle the mobile navigation dropdown open and closed.
 *
 * Toggling the 'open' class on the button drives the 3-bar → X CSS animation.
 * Toggling it on the nav-links list switches it from display:none to
 * display:flex via the .nav-links.open rule in the ≤900px media query.
 *
 * A second listener on each individual nav link closes the menu automatically
 * after the user taps a destination — prevents the overlay from staying open
 * while the page scrolls to the target section.
 */
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close the dropdown when the user selects any nav link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


/* ─────────────────────────────────────────────────────────────
   MODULE 3: CONTACT FORM HANDLER
───────────────────────────────────────────────────────────── */

/**
 * Submit the contact form asynchronously via Formspree.
 *
 * Intercepts the native form POST so the page never navigates away.
 * Sends the form data as multipart/form-data via fetch(). The
 * 'Accept: application/json' header tells Formspree to return JSON
 * instead of redirecting, which is what lets us detect success/failure
 * and update the UI in-place.
 *
 * Success path:
 *   - Resets the form fields (clears all inputs)
 *   - Hides the submit button (prevents duplicate submissions)
 *   - Shows the success message
 *
 * Failure path (network error or non-2xx HTTP response):
 *   - Shows the error message with the fallback email address
 *   - Re-enables the button so the user can try again
 *
 * NOTE: The form action must point to a live Formspree endpoint
 * (replace YOUR_FORM_ID) for submissions to actually be delivered.
 *
 * @param {SubmitEvent} e - The native form submit event
 * @returns {Promise<void>}
 */
const form    = document.getElementById('contact-form');
const btn     = document.getElementById('form-btn');
const success = document.getElementById('form-success');
const error   = document.getElementById('form-error');

// Guard: #contact-form only exists on index.html — on about.html and resume.html
// these elements are absent, so without this check the code throws TypeError on load.
// btn/success/error are only accessed inside the handler, so one guard is sufficient.
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop the browser from navigating to the action URL

    // Provide immediate feedback that something is happening
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Reset any previous result messages before each attempt
    success.style.display = 'none';
    error.style.display   = 'none';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' } // tells Formspree to return JSON, not redirect
      });

      if (res.ok) {
        form.reset();             // clear all fields
        btn.style.display = 'none'; // prevent re-submission
        success.style.display = 'block';
      } else {
        // Formspree returned a 4xx/5xx — treat as failure
        throw new Error('Non-2xx response');
      }
    } catch (_) {
      // Covers both network failures and the thrown error above
      error.style.display  = 'block';
      btn.textContent      = 'Send Message →';
      btn.disabled         = false; // let the user retry
    }
  });
}
