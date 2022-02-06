import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = {
      product,
      count: 1,
    };
    if (product === null || product === undefined) {
      return;
    }
    if (this.cartItems.length === 0) {
      this.cartItems.push(cartItem);
    } else {
      let productToAdd = this.cartItems.find((item) => item.product.id === product.id);
      if (productToAdd) {
        cartItem = productToAdd;
        cartItem.count += 1;
      } else {
        this.cartItems.push(cartItem);
      }
    }

    this.onProductUpdate(cartItem);
  }

  onProductUpdate(cartItem) {
    // ...ваш код
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = this.bodyElem;

      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count === 0) {
        modalBody.querySelector(`[data-product-id=${cartItem.product.id}]`).remove();
      }

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    }
  }

  updateProductCount(productId, amount) {
    this.cartItems.forEach((item, i) => {
      if (item.product.id === productId) {
        item.count += amount;
        this.onProductUpdate(item);
        if (item.count <= 0) {
          item.count = 0;
          this.cartItems.splice(i, 1);
        }
      }
    });
    if (this.isEmpty()) {
      this.modal.close();
    }
  }

  isEmpty() {
    return (this.cartItems.length === 0) ? true : false;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.count);
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.count);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button"  class="cart-counter__button  cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.bodyElem = document.createElement('div');

    this.cartItems.forEach((item) => {
      this.bodyElem.append(this.renderProduct(item.product, item.count));
    });
    this.bodyElem.append(this.renderOrderForm());

    this.modal.setBody(this.bodyElem);

    const cartForm = this.modal.elem.querySelector('.cart-form');

    this.bodyElem.addEventListener('click', this.onCounterButtonClick);
    cartForm.addEventListener('submit', this.onSubmit);

    this.modal.open();
  }

  onCounterButtonClick = (evt) => {
    let target = evt.target;
    let btn = target.closest('.cart-counter__button');
    if (btn) {
      evt.preventDefault();

      let cartId = target.closest('.cart-product').dataset.productId;

      if (btn.classList.contains('cart-counter__button_plus')) {
        this.updateProductCount(cartId, 1);
      } else if (btn.classList.contains('cart-counter__button_minus')) {
        this.updateProductCount(cartId, -1);
      }
    }
  }


  onSubmit = (evt) => {
    // ...ваш код
    evt.preventDefault();
    let orderFormData = new FormData(evt.target);
    evt.target.querySelector('.cart-buttons__button').classList.add("is-loading");
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: orderFormData
    })
      .then(() => {
        this.modal.setTitle("Success!");
        this.cartItems.length = 0;
        this.modal.setBody(this.submitSuccess());
        this.cartIcon.update(this);
      });
  }

  submitSuccess() {
    return createElement(`<div class="modal__body-inner"><p>Order successful! Your order is being cooked :) <br>We’ll notify you about delivery time shortly.<br><img src="../../assets/images/delivery.gif"></p></div>`);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }


}

