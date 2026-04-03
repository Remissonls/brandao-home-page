const carousels = document.querySelectorAll(".carousel");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const nextBtn = carousel.querySelector(".carousel-btn.next");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const dots = Array.from(carousel.querySelectorAll(".dot"));

  if (!track || slides.length === 0 || !nextBtn || !prevBtn) return;

  let currentIndex = 0;
  let autoPlay;

  function updateCarousel(index) {
    track.style.transform = `translateX(-${index * 100}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    updateCarousel(nextIndex);
  }

  function prevSlide() {
    const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    updateCarousel(prevIndex);
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlay = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    if (autoPlay) {
      clearInterval(autoPlay);
    }
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      updateCarousel(index);
      startAutoPlay();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  updateCarousel(0);
  startAutoPlay();
});

/* LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const zoomableImages = document.querySelectorAll(".zoomable");

if (lightbox && lightboxImage && lightboxClose && zoomableImages.length > 0) {
  zoomableImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightboxImage.src = "";
    lightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}