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

  const btn = document.getElementById('scrollToTopBtn');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const statsCards = document.querySelectorAll('.stats_card-percentage');
  // Animate stat percentages only when cards enter the viewport (on intersection)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const target = parseInt(card.getAttribute('data-target'), 10);
          if (isNaN(target)) return; // Skip if no target

          let current = 0;
          // Slower the counter: increase duration (e.g. 2000ms for slow, or even 4000ms if you want)
          const duration = 1800; // 1.8 seconds (change this to 3-5s for even slower)
          const frameRate = 16;
          const totalFrames = Math.ceil(duration / frameRate);
          const increment = target / totalFrames;
          card.textContent = "0%";

          const animate = () => {
            current += increment;
            if (current >= target) {
              card.textContent = `${target}%`;
            } else {
              card.textContent = `${Math.floor(current)}%`;
              requestAnimationFrame(animate);
            }
          };
          animate();

          obs.unobserve(card); // Animate only once
        }
      });
    }, { threshold: 0.3 });

    statsCards.forEach(card => {
      if (card.hasAttribute('data-target')) {
        observer.observe(card);
      }
    });
  }

  AOS.init({
    duration: 1200,
  })
});


