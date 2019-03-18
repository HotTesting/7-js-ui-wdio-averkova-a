import { BasePO } from "./base";

export class ShoppingCartPO extends BasePO {
  constructor() {
    super();
  }

  open(url) {
    super.open(url);
  }

 
//Open Checkout page and Check cart block on the page
  openCart(): any {
    const openCartButton = $("#cart");
    const pageTitle = $("h2.title");
    const checkoutCart = $("#box-checkout-cart");
    openCartButton.click();
    browser.waitUntil(
      function() {
        return (
          checkoutCart.isDisplayed() && pageTitle.getText().includes("Cart")
        ); 
      },
      2000,
      "Error: Shoping cart block is not displayed"
    );
  }
//Check cart items 
  checkItems(): any {
    const cartItems = $$(".item");
    const itemQuantity = 0;
    const res = cartItems.length;
    if (res > itemQuantity) {
      return true;
    } else false;
    console.log("Items in cart:" + res);
  }
//Remove item from the cart
  deleteItem(): any {
    const deleteBtn = $('button[name*="remove"]');
    const checkoutForm = $("div#box-checkout");
    deleteBtn.click();
    browser.waitUntil(
      function() {
        return checkoutForm.getText().includes("no items");
      },
      undefined,
      "Error: After deleting, item stays visible"
    );
  }

//   increaseItemNumbers() {
//   }

//   decreaseItemNumbers(){

//   }
//Button update number
  updateItemNumbers(): any {
    const updateCartItemBtn = $('.item button[name="update_cart_item"]');
    const cartItem = $('.item')
   //const numberInput = $('.item input');
    updateCartItemBtn.click();
    browser.waitUntil(
        function() {
          return cartItem.isDisplayed();
        },
        undefined,
        "Error: After updating item numbers is not updated"
      );
    
  }
}

export const ShoppingCart = new ShoppingCartPO();
