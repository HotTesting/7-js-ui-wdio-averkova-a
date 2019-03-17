import { BasePO } from "./base";

export class ShoppingCartPO extends BasePO {
  constructor() {
    super();
  }

  open(url) {
    super.open(url);
  }

  checkCart(): any {
    const openCartButton = $("#cart");
    const pageTitle = $("h2.title");
    const checkoutCart = $("#box-checkout-cart");
    openCartButton.click();
    browser.waitUntil(
      function() {
        return (
          checkoutCart.isDisplayed() && pageTitle.getText().includes("Cart")
        ); // loader пропал, а элемент появился
      },
      2000,
      "Error: Shoping cart is not displayed"
    );
  }

  checkItems(): any {
    const cartItems = $$(".item");
    const itemQuantity = 0;
    const res = cartItems.length;
    if (res > itemQuantity) {
      return true;
    } else false;
    console.log(res);
  }

  deleteItem(): any {
    const deleteBtn = $('button[name*="remove"]');
    const checkoutForm = $("div#box-checkout");
    deleteBtn.click();
    browser.waitUntil(
      function() {
        return checkoutForm.getText().includes("no items");
      },
      undefined,
      "After deleting item stays visible"
    );
  }
}

export const ShoppingCart = new ShoppingCartPO();
