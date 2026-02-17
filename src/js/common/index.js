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


    // Draw chart only when the chart is visible using Intersection Observer
    const chartCanvas = document.getElementById('insightsDoughnutChart');
    let chartInstance = null;

    if (chartCanvas) {
      const drawChart = () => {
        if (chartInstance) return; // Only draw once
        const ctx = chartCanvas.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: [
              'All Other Queries',
              'New Car Inquiry',
              'Used Cars Inquiry',
              'Bookings',
              'Service and Parts',
              'Finance and Lease'
            ],
            datasets: [{
              data: [12.02, 40, 20, 19, 9, 0.98],
              backgroundColor: [
                '#FFA726', // All Other Queries (orange)
                '#66BB6A', // New Car Inquiry (green)
                '#29B6F6', // Used Cars Inquiry (blue)
                '#AB47BC', // Bookings (purple)
                '#FF7043', // Service and Parts (red-orange)
                '#EC407A'  // Finance and Lease (pink)
              ],
              borderWidth: 2,
              borderColor: '#1c1c1c'
            }]
          },
          options: {
            responsive: false,
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
                labels: {
                  color: '#111'
                }
              },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: function (context) {
                    const label = context.label || '';
                    const value = context.parsed || 0;
                    return `${label}: ${value}%`;
                  }
                }
              },
              datalabels: {
                color: '#fff',
                font: {
                  weight: 'bold',
                  size: 16
                },
                formatter: function (value, context) {
                  return value.toFixed(1) + '%';
                }
              }
            },
            cutout: '50%',
          },
          plugins: [ChartDataLabels]
        });
      };

      // Setup Intersection Observer
      const observer = new window.IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              drawChart();
              obs.disconnect(); // Only fire once
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(chartCanvas);
    }
  });

  // Contact form handler (EmailJS + CRISP integration)
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');
  const submitBtn = document.getElementById('submit-btn');

  function pushFormDataToCrisp(form) {
    if (typeof window.$crisp === 'undefined') return;
    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const dealership = formData.get('dealership') || '';
    const message = formData.get('message') || '';

    window.$crisp.push(['set', 'user:email', [email]]);
    window.$crisp.push(['set', 'user:phone', [phone]]);
    window.$crisp.push(['set', 'user:nickname', [name]]);
    window.$crisp.push(['set', 'session:data', [[
      ['dealership', dealership],
      ['message', message]
    ]]]);
  }

  function openCrispChat() {
    if (typeof window.$crisp === 'undefined') return;
    window.$crisp.push(['do', 'chat:open']);
  }

  if (contactForm) {
    if (typeof emailjs !== 'undefined') {
      emailjs.init('X3FblCXeZ8HtDbEQ8');
    }

    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const form = event.target instanceof HTMLFormElement ? event.target : contactForm.querySelector('form');
      if (!form) return;

      // Push form data to CRISP (available when CRISP_WEBSITE_ID is loaded)
      pushFormDataToCrisp(form);

      // Disable submit button and show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      if (formMessage) formMessage.style.display = 'none';

      if (typeof emailjs !== 'undefined') {
        const serviceID = 'service_bhil0bh';
        const templateID = 'template_7w2nm24';

        emailjs.sendForm(serviceID, templateID, form)
          .then(() => {
            if (formMessage) {
              formMessage.style.display = 'block';
              formMessage.style.backgroundColor = '#d4edda';
              formMessage.style.color = '#155724';
              formMessage.style.border = '1px solid #c3e6cb';
              formMessage.textContent = 'Thank you! Your message has been sent successfully.';
            }
            form.reset();
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit';
            }
            openCrispChat();
          }, (err) => {
            if (formMessage) {
              formMessage.style.display = 'block';
              formMessage.style.backgroundColor = '#f8d7da';
              formMessage.style.color = '#721c24';
              formMessage.style.border = '1px solid #f5c6cb';
              formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            }
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = 'Submit';
            }
            openCrispChat();
            console.error('EmailJS error:', err);
          });
      } else {
        // No EmailJS: still push to CRISP and open chat
        if (formMessage) {
          formMessage.style.display = 'block';
          formMessage.style.backgroundColor = '#d4edda';
          formMessage.style.color = '#155724';
          formMessage.style.border = '1px solid #c3e6cb';
          formMessage.textContent = 'Thank you! Your message has been received. Our team will reach out shortly.';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit';
        }
        openCrispChat();
      }
    });
  }

  const btn = document.getElementById('scrollToTopBtn');
  if (btn) {
    window.addEventListener('scroll', function () {
      btn.style.display = window.scrollY > 200 ? 'block' : 'none';
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  AOS.init();

  var el1 = document.querySelector('.swiper-containe1');
  var el2 = document.querySelector('.swiper-containe2');
  if (el1 && el2 && typeof Swiper !== 'undefined') {
    var quoteSwiper = new Swiper('.swiper-containe1', { effect: 'fade' });
    var imageSwiper = new Swiper('.swiper-containe2', {
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next-testimonials',
        prevEl: '.swiper-button-prev-testimonials',
      },
    });
    quoteSwiper.controller.control = imageSwiper;
    imageSwiper.controller.control = quoteSwiper;
  }
});


