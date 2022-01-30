export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      this.onProductUpdate(cartItem);
    } else {
      let productToAdd = this.cartItems.find((item) => item.product.id === product.id);
      if (productToAdd) {
        cartItem = productToAdd;
        cartItem.count += 1;
        this.onProductUpdate(cartItem);
      } else {
        this.cartItems.push(cartItem);
        this.onProductUpdate(cartItem);
      }
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
          console.log(this.cartItems)
        }
      }
    });
  }

  isEmpty() {
    // ваш код
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

