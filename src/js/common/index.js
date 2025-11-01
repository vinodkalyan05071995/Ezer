window.addEventListener('DOMContentLoaded', function () {
  // Make header transparent when the page is at the top, solid background when scrolled
  window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 0) {
      header.classList.remove('header--transparent');
    } else {
      header.classList.add('header--transparent');
    }
  });

  // EmailJS form submission handler
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && typeof emailjs !== 'undefined') {
    // Initialize EmailJS with your public key
    // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('X3FblCXeZ8HtDbEQ8');

    document.getElementById('contact-form')
      .addEventListener('submit', function (event) {
        event.preventDefault();

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formMessage.style.display = 'none';

        const serviceID = 'service_bhil0bh';
        const templateID = 'template_7w2nm24';

        emailjs.sendForm(serviceID, templateID, this)
          .then(() => {
            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.border = '1px solid #c3e6cb';
            formMessage.textContent = 'Thank you! Your message has been sent successfully.';

            // Reset form
            contactForm.reset();

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
          }, (err) => {

            formMessage.style.display = 'block';
            formMessage.style.backgroundColor = '#f8d7da';
            formMessage.style.color = '#721c24';
            formMessage.style.border = '1px solid #f5c6cb';
            formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
            alert(JSON.stringify(err));
          });
      });

  }
});


