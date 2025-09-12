
  // Mobile menu toggle
  document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const menu = document.getElementById('menu');
    
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        menu.classList.toggle('hidden');
        menu.classList.toggle('flex');
      });
    }
    
    // Form submission
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = document.getElementById('phone').value;
        if (!phone) {
          alert('Phone number is required!');
          return;
        }
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
      });
    }
    
    // Ripple effect for buttons
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    rippleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
          const href = this.getAttribute('href');
          if (href) window.open(href, '_blank');
        }, 300);
      });
    });
  });

  // Twitter widget loader with enhanced error handling
  (function() {
    // Only load if not already loaded
    if (window.twttr) return;
    
    // Create script element
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.id = "twitter-wjs";
    
    // Error handling
    script.onerror = function() {
      console.error('Failed to load Twitter widget script');
      showTwitterFallback();
    };
    
    // Add to document
    document.body.appendChild(script);
    
    // Fallback if widget doesn't load within 8 seconds
    const fallbackTimer = setTimeout(() => {
      if (!document.querySelector('.twitter-timeline-rendered')) {
        showTwitterFallback();
      }
    }, 8000);
    
    // Clean up if loaded successfully
    window.twttrReady = window.twttrReady || [];
    window.twttrReady.push(function(twttr) {
      clearTimeout(fallbackTimer);
      twttr.events.bind('loaded', function() {
        console.log('Twitter widget loaded successfully');
      });
    });
    
    function showTwitterFallback() {
      const containers = document.querySelectorAll('.twitter-timeline-container');
      containers.forEach(container => {
        const account = container.dataset.twitterAccount || 'Options_IndiaAB';
        container.innerHTML = `
          <div class="twitter-fallback">
            <p>Unable to load Twitter feed. 
            <a href="https://twitter.com/${account}" target="_blank">
              View @${account} on Twitter
            </a></p>
          </div>
        `;
      });
    }
  })();

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
      console.log("Form submitted. Sending data to Formspree...");
    });
  });

   const form = document.getElementById("contact-form");
   form.addEventListener("submit", async (e) => {
     e.preventDefault();
     const formData = new FormData(form);
     const payload = Object.fromEntries(formData.entries());

     const res = await fetch("http://localhost:5000/contact", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(payload),
     });

     const data = await res.json();
     alert(data.message);
   });