import createElement from '../../assets/lib/create-element.js';


export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.addEventListener('click', this._onCoordsClick);
    this.thumb.addEventListener('pointerdown', this._onThumbPoinerdown);
  }

  render() {
    this.elem = createElement(this._createSliderMarkup());
    this._createSliderStepsMarkup(this.steps);
    this._changeSliderProgress(this.value);
    this._getActiveSliderStep(this.value);
  }

  _createSliderMarkup() {
    return `<div class="slider">

      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb">
        <span class="slider__value">0</span>
      </div>

      <!--Полоска слайдера-->
      <div class="slider__progress"></div>

      <!-- Шаги слайдера (вертикальные чёрточки) -->
      <div class="slider__steps">
      </div>
    </div>`;
  }

  _createSliderStepsMarkup = (steps) => {
    const sliderStepsElem = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      const spanElem = createElement('<span></span>');
      sliderStepsElem.append(spanElem);
    }
    return sliderStepsElem;
  }

  _getSliderValue = () => {
    this.elem.querySelector(".slider__value").textContent = this.value;
  }

  _getActiveSliderStep = (value) => {
    let stepsSpanAll = this.elem.querySelectorAll('.slider__steps span');
    stepsSpanAll.forEach((step, index) => {
      if (index === value) {
        step.classList.add('slider__step-active');
      } else {
        step.classList.remove('slider__step-active');
      }
    });
  }

  _getLeftCoords = (coordX) => {
    let coords = coordX - this.elem.getBoundingClientRect().left;
    let left = coords / this.elem.offsetWidth;
    return left;
  }

  _changeValue = (leftCoords) => {
    let segments = this.steps - 1;
    let approximateValue = leftCoords * segments;
    return Math.round(approximateValue);
  }

  _changeSliderProgress(percents) {
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.thumb.style.left = `${percents}%`;
    this.progress.style.width = `${percents}%`;
  }

  _initCustomEvent = () => {
    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }

  _onThumbPoinerdown = (evt) => {
    this.thumb.ondragstart = () => false;

    const onThumbPoinermove = (moveEvt) => {
      this.elem.classList.add('slider_dragging');

      let pageX = moveEvt.pageX;
      let leftRelative = this._getLeftCoords(pageX);

      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }

      let roundValue = this._changeValue(leftRelative);
      let valuePercents = leftRelative * 100;
      this.value = roundValue;

      this._changeSliderProgress(valuePercents);
      this._getSliderValue();
      this._getActiveSliderStep(this.value);

    };

    const onThumbPoinerup = () => {
      this.elem.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', onThumbPoinermove);
      document.removeEventListener('pointerup', onThumbPoinerup);
      this._initCustomEvent();
    };

    document.addEventListener('pointermove', onThumbPoinermove);
    document.addEventListener('pointerup', onThumbPoinerup);
  }

  _onCoordsClick = (evt) => {
    let pageX = evt.clientX;

    let coordsThumb = this._getLeftCoords(pageX);
    let roundValue = this._changeValue(coordsThumb);

    let valuePercents = (roundValue / (this.steps - 1)) * 100;
    this.value = roundValue;

    this._changeSliderProgress(valuePercents);
    this._getSliderValue();
    this._getActiveSliderStep(this.value);
    this._initCustomEvent();
  }
}
