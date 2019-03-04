import { expect } from "chai";

describe("Items search", function() {
  beforeEach("Page refreshing", function() {
    browser.url("/");
  });

  const searchInput = 'form[name="search_form"] input[data-type="search"]';
  const sortByPriceButton = '#box-search-results a[href*="sort=price"]';
  const sortByNameButton = '#box-search-results a[href*="sort=name"]';
  const allDucks = '#box-search-results .product';

  function searchWord(word) {
    $(searchInput).setValue(word);
    $(searchInput).addValue("Enter");
    browser.pause(3000);
  }

  it("correctly arranges items when using 'by price' sorting", function() {
    searchWord("duck");
    expect(browser.getUrl()).to.contain("query=duck");
    $(sortByPriceButton).click();
    browser.pause(2000);

    const duckPriceArr = $$(allDucks).map(duck =>parseInt(duck.getAttribute("data-price")));
    const duckPriceNewArr = duckPriceArr.slice(0); // copy array
    duckPriceNewArr.sort((a, b) => a - b); // price sorting

    expect(duckPriceArr).to.deep.equal(duckPriceNewArr);
  });

  it("correctly arranges items when using 'by name' sorting", function() {
    searchWord("duck");
    expect(browser.getUrl()).to.contain("query=duck");

    $(sortByNameButton).click();
    browser.pause(2000);

    const duckNameArr = $$(allDucks).map(duck =>duck.getAttribute("data-name"));
    const duckNameNewArr = duckNameArr.slice(0); // copy array
    duckNameNewArr.sort((a, b) => (a > b ? 1 : -1)); // name sorting a-z

    expect(duckNameArr).to.deep.equal(duckNameNewArr);
  });
});
