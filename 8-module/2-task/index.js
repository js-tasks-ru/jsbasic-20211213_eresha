import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';
import products from './products.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(this._createProductsGridMarkup());
    this._createCards(this.products);
  }

  _createProductsGridMarkup() {
    return `<div class="products-grid">
    <div class="products-grid__inner">
    </div>
  </div>`;
  }

  _createCards(products) {
    this.gridInner = this.elem.querySelector('.products-grid__inner');
    products.forEach((product) => {
      let productCard = new ProductCard(product);
      this.gridInner.append(productCard.elem);
    });
  }

  _createFilterCards(products, filters) {
    this.gridInner.innerHTML = '';

    for (let product of products) {
      if (product.nuts && filters.noNuts) {
        continue;
      }
      if (!product.vegeterian && filters.vegeterianOnly) {
        continue;
      }
      if (
        product.spiciness > filters.maxSpiciness &&
        filters.maxSpiciness
      ) {
        continue;
      }
      if (product.category !== filters.category && filters.category) {
        continue;
      }
      let card = new ProductCard(product);
      this.gridInner.append(card.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this._createFilterCards(this.products, this.filters);
  }
}
