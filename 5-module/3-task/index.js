function initCarousel() {
  const carousel = document.querySelector(`.carousel`);

  // const carouselArrow = carousel.querySelector(`.carousel__arrow`);
  const arrowRight = carousel.querySelector(`.carousel__arrow_right`);
  const arrowLeft = carousel.querySelector(`.carousel__arrow_left`);
  const carouselInner = carousel.querySelector(`.carousel__inner`);
  const widthSlide = carouselInner.offsetWidth;
  const carouselSlides = carousel.querySelectorAll(`.carousel__slide`);

  let index = 0;
  arrowLeft.style.display = 'none';

  const moveSlide = (n) => {
    carouselInner.style.transform = `translateX(-${widthSlide * n}px)`;
    arrowLeft.style.display = arrowRight.style.display = '';
    if (n === 0) {
      arrowLeft.style.display = 'none';
    }
    if (n === carouselSlides.length - 1) {
      arrowRight.style.display = 'none';
    }
  };

  arrowRight.addEventListener('click', () => {
    index++;
    moveSlide(index);
  });

  arrowLeft.addEventListener('click', () => {
    index--;
    moveSlide(index);
  });
}
