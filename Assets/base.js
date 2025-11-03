var App = (() => {
  // src/js/common/index.js
  window.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
      var header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY > 0) {
        header.classList.remove("header--transparent");
      } else {
        header.classList.add("header--transparent");
      }
      const chartCanvas = document.getElementById("insightsDoughnutChart");
      let chartInstance = null;
      if (chartCanvas) {
        const drawChart = () => {
          if (chartInstance) return;
          const ctx = chartCanvas.getContext("2d");
          chartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: [
                "All Other Queries",
                "New Car Inquiry",
                "Used Cars Inquiry",
                "Bookings",
                "Service and Parts",
                "Finance and Lease"
              ],
              datasets: [{
                data: [12.02, 40, 20, 19, 9, 0.98],
                backgroundColor: [
                  "#FFA726",
                  // All Other Queries (orange)
                  "#66BB6A",
                  // New Car Inquiry (green)
                  "#29B6F6",
                  // Used Cars Inquiry (blue)
                  "#AB47BC",
                  // Bookings (purple)
                  "#FF7043",
                  // Service and Parts (red-orange)
                  "#EC407A"
                  // Finance and Lease (pink)
                ],
                borderWidth: 2,
                borderColor: "#1c1c1c"
              }]
            },
            options: {
              responsive: false,
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  labels: {
                    color: "#111"
                  }
                },
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: function(context) {
                      const label = context.label || "";
                      const value = context.parsed || 0;
                      return `${label}: ${value}%`;
                    }
                  }
                },
                datalabels: {
                  color: "#fff",
                  font: {
                    weight: "bold",
                    size: 16
                  },
                  formatter: function(value, context) {
                    return value.toFixed(1) + "%";
                  }
                }
              },
              cutout: "50%"
            },
            plugins: [ChartDataLabels]
          });
        };
        const observer = new window.IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                drawChart();
                obs.disconnect();
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(chartCanvas);
      }
    });
    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");
    const submitBtn = document.getElementById("submit-btn");
    if (contactForm && typeof emailjs !== "undefined") {
      emailjs.init("X3FblCXeZ8HtDbEQ8");
      document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formMessage.style.display = "none";
        const serviceID = "service_bhil0bh";
        const templateID = "template_7w2nm24";
        emailjs.sendForm(serviceID, templateID, this).then(() => {
          formMessage.style.display = "block";
          formMessage.style.backgroundColor = "#d4edda";
          formMessage.style.color = "#155724";
          formMessage.style.border = "1px solid #c3e6cb";
          formMessage.textContent = "Thank you! Your message has been sent successfully.";
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
        }, (err) => {
          formMessage.style.display = "block";
          formMessage.style.backgroundColor = "#f8d7da";
          formMessage.style.color = "#721c24";
          formMessage.style.border = "1px solid #f5c6cb";
          formMessage.textContent = "Sorry, there was an error sending your message. Please try again.";
          submitBtn.disabled = false;
          submitBtn.textContent = "Submit";
          alert(JSON.stringify(err));
        });
      });
    }
    const btn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", function() {
      if (window.scrollY > 200) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    });
    btn.addEventListener("click", function() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
//# sourceMappingURL=base.js.map
