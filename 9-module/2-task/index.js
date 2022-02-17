import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);
  }

  async render() {
    this.renderCarousel();
    this.renderRibbonMenu();
    this.renderStepSlider();
    this.renderCartIcon();

    this.products = await this.getProducts();
    this.renderProductsGrid(this.products);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', evt => {
      this.cart.addProduct(this.products.find(product => product.id === evt.detail));
    });

    document.body.addEventListener('slider-change', evt => {
      this.productsGrid.updateFilter({
        maxSpiciness: evt.detail
      });
    });

    document.body.addEventListener('ribbon-select', evt => {
      this.productsGrid.updateFilter({
        category: evt.detail
      });
    });

    document.querySelector('#nuts-checkbox').addEventListener('change', evt => {
      this.productsGrid.updateFilter({
        noNuts: evt.target.checked
      });
    });

    document.querySelector('#vegeterian-checkbox').addEventListener('change', evt => {
      this.productsGrid.updateFilter({
        vegeterianOnly: evt.target.checked
      });
    });
  }

  renderCarousel() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
  }

  renderRibbonMenu() {
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  }

  renderStepSlider() {
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
  }

  renderCartIcon() {
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);
  }

  renderProductsGrid(products) {
    let productsGridContainer = document.querySelector('[data-products-grid-holder]');
    this.productsGrid = new ProductsGrid(products);
    productsGridContainer.innerHTML = '';
    productsGridContainer.append(this.productsGrid.elem);


  }

  async getProducts() {
    let response = await fetch('products.json');
    return response.json();
  }
}
