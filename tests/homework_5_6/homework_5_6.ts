/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() NOT allowed, use browser.wait, browser.waitUntil
 - You SHOULD use PageObjects for this tests
 - prefer css selectors
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS to make assertions
 */

import { expect } from "chai";
import { ProductDetails } from "../../pageObjects/productDetails";
import { ShoppingCart } from '../../pageObjects/shoppingCart';
import { RegionalSettings } from "../../pageObjects";

describe("Cart", function() {
  it("adding one item to cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();

    ShoppingCart.openCart();
    expect(ShoppingCart.checkItems).not.to.equal(0);
    expect(browser.getUrl()).to.contain("checkout");
  });

  it("removing one item from cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();

    ShoppingCart.openCart();
    ShoppingCart.deleteItem();
  });

  // from 1 to 2 for example
  it("increasing item quantity in cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();
    ShoppingCart.openCart();
    expect(ShoppingCart.checkItems).not.to.equal(0);

    const itemNumbersInput = ".item input";
    const value = $(itemNumbersInput).getValue();
    expect(value).to.deep.equal(1);
    $(itemNumbersInput).addValue(value + 1);
    ShoppingCart.updateItemNumbers();

    const value2 = $(itemNumbersInput).getValue();
    expect(value2).to.deep.equal(2);
    console.log(value, value2);
  });

  // from 2 to 1 for example
  it("decreasing item quantity in cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();
    ProductDetails.addToCart();
    ShoppingCart.openCart();
    expect(ShoppingCart.checkItems).not.to.equal(0);
    
    const itemNumbersInput = ".item input";
    $(itemNumbersInput).clearValue();
    $(itemNumbersInput).addValue(1);
    const value = $(itemNumbersInput).getValue();

    expect(value).to.deep.equal(1);
  });

  afterEach(function() {
    browser.deleteCookies();
    browser.refresh();
  });
});
