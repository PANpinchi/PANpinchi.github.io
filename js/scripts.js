/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

/* contact-form */
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    statusEl.textContent = 'Sending...';

    const endpoint = 'https://formspree.io/f/xrbldeeq';
    const data = new FormData(form);

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
        });

        if (res.ok) {
            statusEl.textContent = '✅ Message sent successfully!';
            form.reset();
        } else {
            const err = await res.json().catch(() => ({}));
            const errorMsg = err?.errors?.[0]?.message || '❌ Failed to send. Please try again later.';
            statusEl.textContent = errorMsg;

            setTimeout(() => {
                statusEl.textContent = 'Send';
                submitBtn.disabled = false;
            }, 3000);
        }
    } catch (err) {
        statusEl.textContent = '❌ Network error. Please check your connection.';
        
        setTimeout(() => {
            statusEl.textContent = 'Send';
            submitBtn.disabled = false;
        }, 3000);
    }
});

