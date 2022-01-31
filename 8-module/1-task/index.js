import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
    console.log(this.elem.offsetHeight)
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, { once: true });

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  _resetStyle() {
    Object.assign(this.elem.style, {
      position: '',
      top: '',
      left: '',
      zIndex: ''
    });
  }

  _addFixPositionStyles() {
    Object.assign(this.elem.style, {
      position: 'fixed',
      top: '50px',
      right: '10px',
      zIndex: 1e3,
      left: Math.min(
        document.querySelector('.container').getBoundingClientRect().right + 20,
        document.documentElement.clientWidth - this.elem.offsetWidth - 10
      ) + 'px'
    });
  }

  updatePosition() {
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    let isMobile = document.documentElement.clientWidth <= 767;
    let momentBeginningMove = window.pageYOffset > initialTopCoord;

    if (this.elem.offsetHeight) {

      if (momentBeginningMove && !isMobile) {
        this._addFixPositionStyles();
      }

      if (isMobile) {
        this._resetStyle();
      }
    }
  }
}
