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
import { ProductDetails } from '../../pageObjects/productDetails';
import { ShoppingCart } from '../../pageObjects/shoppingCart';
import { RegionalSettings} from "../../pageObjects";

describe("Cart", function() {
  it("adding one item to cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();

    ShoppingCart.checkCart();
    expect(browser.getUrl()).to.contain("checkout");  
  });

  it("removing one item from cart should be successful", function() {
    ProductDetails.open("/rubber-ducks-c-1/red-duck-p-3");
    ProductDetails.addToCart();
    
    ShoppingCart.checkCart();
    ShoppingCart.deleteItem();
  });

  // from 1 to 2 for example
  it.skip("increasing item quantity in cart should be successful", function() {
    throw new Error("NOT IMPLEMENTED");
  });

  // from 2 to 1 for example
  it.skip("decreasing item quantity in cart should be successful", function() {
    throw new Error("NOT IMPLEMENTED");
  });

  afterEach(function() {
    browser.deleteCookies();
    browser.refresh();
  });
});

