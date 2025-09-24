// script.js
document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById("menu-btn");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
      menu.classList.toggle("hidden");
      menu.classList.toggle("flex");
    });
  }

  // --- Ripple Effect for Buttons/Links ---
  const rippleButtons = document.querySelectorAll(".ripple-btn");
  rippleButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => ripple.remove(), 400);

      // Handle link navigation (if any)
      const href = this.getAttribute("href");
      const target = this.getAttribute("target") || "_self";
      if (href && !href.startsWith("#")) {
        window.open(href, target);
      }
    });
  });

  // --- Contact Form Submission ---
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const phone = document.getElementById("phone")?.value.trim();
      if (!phone) {
        alert("Phone number is required!");
        return;
      }

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      try {
        const res = await fetch(
          "https://lightslategray-kudu-703043.hostingersite.com/contact.php",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        const data = await res.json();
        if (res.ok) {
          alert(data.message || "Thank you! We will get back to you soon.");
          form.reset();
        } else {
          alert("Error: " + (data.message || "Something went wrong."));
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to send message. Please try again later.");
      }
    });
  }
});
