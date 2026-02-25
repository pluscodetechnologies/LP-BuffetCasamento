(function () {
  // ===== VARIÁVEIS GLOBAIS =====
  const WHATSAPP_NUMBER = "5511999999999";
  const WHATSAPP_MSG = "Olá, gostaria de um orçamento para meu casamento!";

  // ===== MODAL =====
  const modal = document.getElementById("modalOrcamento");
  const closeModal = document.getElementById("closeModal");
  const navOrcamentoBtn = document.getElementById("navOrcamentoBtn");
  const navOrcamentoBtnMobile = document.getElementById(
    "navOrcamentoBtnMobile",
  ); // novo botão mobile
  const btnOrcamentoHero = document.getElementById("btnOrcamentoHero");
  const btnOrcamentoFinal = document.getElementById("btnOrcamentoFinal");
  const servicoSelect = document.getElementById("servico");

  function openModal(servico = "") {
    modal.style.display = "flex";
    if (servico) {
      servicoSelect.value = servico;
    }
  }

  function closeModalFunc() {
    modal.style.display = "none";
  }

  if (navOrcamentoBtn) {
    navOrcamentoBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (navOrcamentoBtnMobile) {
    navOrcamentoBtnMobile.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (btnOrcamentoHero) {
    btnOrcamentoHero.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (btnOrcamentoFinal) {
    btnOrcamentoFinal.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  document.querySelectorAll(".card-link, [data-servico]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const servico = link.getAttribute("data-servico") || "";
      openModal(servico);
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", closeModalFunc);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModalFunc();
    });
  }

  // ===== FORMULÁRIO =====
  const form = document.getElementById("formOrcamento");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const campos = ["nome", "email", "telefone"];
      campos.forEach((id) => {
        const input = document.getElementById(id);
        const errorDiv = input.parentElement.querySelector(".error-message");
        if (!input.value.trim()) {
          input.parentElement.classList.add("error");
          errorDiv.textContent = "Campo obrigatório";
          valid = false;
        } else {
          input.parentElement.classList.remove("error");
          errorDiv.textContent = "";
        }
      });
      const email = document.getElementById("email");
      if (email && email.value && !email.value.includes("@")) {
        email.parentElement.classList.add("error");
        email.parentElement.querySelector(".error-message").textContent =
          "E-mail inválido";
        valid = false;
      }
      if (valid) {
        alert("Obrigado! Simulação de envio. Entraremos em contato em breve.");
        closeModalFunc();
        form.reset();
      }
    });
  }

  // ===== WHATSAPP =====
  function openWhatsApp() {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`,
      "_blank",
    );
  }

  document
    .querySelectorAll("#btnWhatsappHero, #btnWhatsappFinal, #whatsappFloat")
    .forEach((btn) => {
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openWhatsApp();
        });
      }
    });

  // ===== MOBILE MENU =====
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navCenter = document.getElementById("navCenter");
  if (mobileBtn && navCenter) {
    mobileBtn.addEventListener("click", () => {
      navCenter.classList.toggle("active");
      const icon = mobileBtn.querySelector("i");
      if (navCenter.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });

    navCenter.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navCenter.classList.remove("active");
        const icon = mobileBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !navCenter.contains(e.target) &&
        !mobileBtn.contains(e.target) &&
        navCenter.classList.contains("active")
      ) {
        navCenter.classList.remove("active");
        const icon = mobileBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // ===== CARROSSEL =====
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");
  let currentSlide = 0;

  if (slides.length && prevBtn && nextBtn && dotsContainer) {
    function createDots() {
      dotsContainer.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === currentSlide) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }

    function goToSlide(n) {
      slides.forEach((s) => s.classList.remove("active"));
      slides[n].classList.add("active");
      document.querySelectorAll(".dot").forEach((d, i) => {
        d.classList.toggle("active", i === n);
      });
      currentSlide = n;
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(currentSlide);
    }

    createDots();
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
  }

  // ===== GALERIA =====
  const galeriaGrid = document.getElementById("galeriaGrid");
  if (galeriaGrid) {
    const imagens = [
      "https://images.pexels.com/photos/15530616/pexels-photo-15530616.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/872831/pexels-photo-872831.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/169191/pexels-photo-169191.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1128783/pexels-photo-1128783.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/15964956/pexels-photo-15964956.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/14148081/pexels-photo-14148081.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/636006/pexels-photo-636006.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/12954022/pexels-photo-12954022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    ];

    imagens.forEach((url) => {
      const item = document.createElement("div");
      item.className = "galeria-item";
      item.style.backgroundImage = `url('${url}')`;
      item.addEventListener("click", () => window.open(url, "_blank"));
      galeriaGrid.appendChild(item);
    });

    document.querySelectorAll(".galeria-item").forEach((item) => {
      const img = new Image();
      img.src = item.style.backgroundImage.slice(5, -2);
      img.onerror = () => {
        item.style.backgroundImage =
          'url("https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1600")';
      };
    });
  }

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== ANIMAÇÕES SCROLL =====
  const faders = document.querySelectorAll(".fade-up");
  if (faders.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    faders.forEach((el) => observer.observe(el));
  }

  // ===== FALLBACK IMAGENS =====
  document
    .querySelectorAll(".card-imagem, .foto-item, .sobre-imagem")
    .forEach((el) => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg !== "none") {
        const url = bg.slice(5, -2);
        const img = new Image();
        img.src = url;
        img.onerror = () => {
          el.style.backgroundImage =
            'url("https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=1600")';
        };
      }
    });
})();
