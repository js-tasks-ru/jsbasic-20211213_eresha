import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this.items = this.elem.querySelectorAll('.ribbon__item');

    this.ribbonArrowLeft.addEventListener('click', this._scrollRibbonLeft);

    this.ribbonArrowRight.addEventListener('click', this._scrollRibbonRight);

    this.ribbonInner.addEventListener('scroll', this._scrollRibbonInner);

    this._getActiveItem();
  }

  render() {
    this.elem = createElement(this._createRibbonMarkup(this.categories));
  }

  _createLinksMarkup(categories) {
    return categories.map((category, i) => {
      return `<a href="#" class="ribbon__item ${i === 0 ? `ribbon__item_active` : ``}" data-id="${category.id}">${category.name}</a>`;
    }).join(`\n`);
  }

  _createRibbonMarkup(categories) {
    return `<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner">
    ${this._createLinksMarkup(categories)}
    </nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`;
  }

  _scrollRibbonLeft = () => {
    this.ribbonInner.scrollBy(-350, 0);
  }

  _scrollRibbonRight = () => {
    this.ribbonInner.scrollBy(350, 0);
  }

  _scrollRibbonInner = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight === 0) {
      this.ribbonArrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.ribbonArrowRight.classList.add('ribbon__arrow_visible');
    }
    if (scrollLeft === 0) {
      this.ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    }

  }

  _getActiveItem = () => {
    this.items.forEach(item => {
      item.addEventListener('click', this.onClick);
    });
  }

  onClick = (evt) => {
    evt.preventDefault();
    this.items.forEach(item => {
      if (item !== evt.target) {
        item.classList.remove('ribbon__item_active');
      }
    });
    evt.target.classList.add('ribbon__item_active');

    let activeItemId = evt.target.dataset.id;
    let customEvent = new CustomEvent('ribbon-select', {
      detail: activeItemId,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }
}

