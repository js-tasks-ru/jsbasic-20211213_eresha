import createElement from '../../assets/lib/create-element.js';


export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.elem.addEventListener('click', this._onCoordsClick);
  }

  render() {
    this.elem = createElement(this._createSliderMarkup());
    this._createSliderStepsMarkup(this.steps);
    this._getStartProgress();
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
      if (i === 0) {
        spanElem.classList.add('slider__step-active');
      }
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

  _getStartProgress = () => {
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.progress = this.elem.querySelector('.slider__progress');
    this.thumb.style.left = `0%`;
    this.progress.style.width = `0%`;
  }

  _onCoordsClick = (evt) => {
    let slider = this.elem.getBoundingClientRect();
    let widthSlider = slider.width;
    let leftSlider = slider.left;
    let coordsClick = evt.clientX - leftSlider;
    let coordsThumb = coordsClick / widthSlider;
    let segments = this.steps - 1;
    let approximateValue = coordsThumb * segments;
    let roundValue = Math.round(approximateValue);
    let valuePercents = (roundValue / segments) * 100;
    this.value = roundValue;
    this.thumb.style.left = `${valuePercents}%`;
    this.progress.style.width = `${valuePercents}%`;
    this._getSliderValue();
    this._getActiveSliderStep(this.value);
    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
}
