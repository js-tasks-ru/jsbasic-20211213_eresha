import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;
    this.render();
    this.initCarousel();
  }

  render() {
    this.elem = createElement(this._createCarouselMarkup(this.slides));
  }

  _createSlidesMarkup(slides) {
    return slides.map((slide) => {
      return `<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price.toFixed(2)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    }).join('\n');
  }

  _createCarouselMarkup(slides) {
    return `<div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    ${this._createSlidesMarkup(slides)}
      </div>
    </div>`;
  }

  initCarousel() {
    const arrowRight = this.elem.querySelector(`.carousel__arrow_right`);
    const arrowLeft = this.elem.querySelector(`.carousel__arrow_left`);
    let carouselInner = this.elem.querySelector(`.carousel__inner`);

    const carouselAddButtons = this.elem.querySelectorAll(`.carousel__button`);
    // let widthSlide = carouselInner.offsetWidth;

    console.log(this.elem.offsetWidth)
    console.log(arrowLeft.offsetParent)
    console.log(arrowRight.offsetWidth)
    //не понимаю, почему не работает offsetWidth???
    // Почему offsetParent null?

    let widthSlide = 988; // добавила, чтобы слайды сдвигались

    let index = 0;
    arrowLeft.style.display = 'none';

    const moveSlide = (n) => {
      carouselInner.style.transform = `translateX(-${widthSlide * n}px)`;
      arrowLeft.style.display = arrowRight.style.display = '';
      if (n === 0) {
        arrowLeft.style.display = 'none';
      }
      if (n === this.slides.length - 1) {
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

    carouselAddButtons.forEach((btn) => {
      btn.addEventListener('click', this.onClick);
    });
  }

  onClick = (evt) => {
    let slideId = evt.target.closest('.carousel__slide').dataset.id;
    let customEvent = new CustomEvent("product-add", {
      detail: slideId,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
    console.log(slideId);
  }
}
