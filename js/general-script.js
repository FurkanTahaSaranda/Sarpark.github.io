document.addEventListener("DOMContentLoaded", function () {
  function setupDropdowns() {
      document.querySelectorAll(".nav-item.dropdown > a").forEach(function (dropdownToggle) {
          dropdownToggle.removeEventListener("click", toggleDropdown);
          dropdownToggle.addEventListener("click", toggleDropdown);
      });

      document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
          dropdown.removeEventListener("mouseenter", openDropdown);
          dropdown.removeEventListener("mouseleave", closeDropdown);

          if (window.innerWidth > 1200) {
              dropdown.addEventListener("mouseenter", openDropdown);
              dropdown.addEventListener("mouseleave", closeDropdown);
          }
      });

      // Sayfa dışında tıklayınca dropdownları kapat
      document.removeEventListener("click", closeAllDropdowns);
      document.addEventListener("click", closeAllDropdowns);
  }

  function toggleDropdown(event) {
      if (window.innerWidth <= 1200) {
          event.preventDefault();
          let dropdownMenu = this.nextElementSibling;
          let parentDropdown = this.parentElement;

          // Açık olan diğer dropdownları kapat
          document.querySelectorAll(".nav-item.dropdown").forEach(item => {
              if (item !== parentDropdown) {
                  item.classList.remove("open");
              }
          });

          // Menü aç/kapat
          parentDropdown.classList.toggle("open");
      }
  }

  function openDropdown() {
      if (window.innerWidth > 1200) {
          this.classList.add("show");
          this.querySelector(".dropdown-menu").classList.add("show");
      }
  }

  function closeDropdown() {
      if (window.innerWidth > 1200) {
          this.classList.remove("show");
          this.querySelector(".dropdown-menu").classList.remove("show");
      }
  }

  function closeAllDropdowns(event) {
      if (window.innerWidth <= 1200) {
          if (!event.target.closest(".nav-item.dropdown")) {
              document.querySelectorAll(".nav-item.dropdown").forEach(item => item.classList.remove("open"));
          }
      }
  }

  function resetDropdowns() {
      document.querySelectorAll(".nav-item.dropdown").forEach(item => item.classList.remove("open"));
      setupDropdowns();
  }

  setupDropdowns();
  window.addEventListener("resize", resetDropdowns);

  // Navbar scroll efekti
  window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 50) {
          navbar.classList.add("scrolled");
      } else {
          navbar.classList.remove("scrolled");
      }
  });
});
