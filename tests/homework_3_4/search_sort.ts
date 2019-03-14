import { expect } from "chai";

describe("Items search", function() {
  //  test elements
  const searchInput = 'form[name="search_form"] input[data-type="search"]';
  //const allDuckItems = '.products.row.half-gutter div.col-xs-6 div.product.column';
  const allDuckItems = '#box-search-results .product';
  const yellowDuckPage = 'div.box[data-name*="Yellow"]';
  const YelloDuckTitle = 'div.box[data-name*="Yellow"] h1.title';
  const noResultsPage = 'div #box-search-results';
  const sortByPriceButton = '#box-search-results a[href*="sort=price"]';
  const sortByNameButton = '#box-search-results a[href*="sort=name"]';
  
  function searchWord(word) {
    $(searchInput).setValue(word);
    $(searchInput).addValue("Enter");
    browser.pause(4000);
  }

  beforeEach("Open proper page", function() {
    browser.url("/");
  });

  it("should show results in case multiple items matches", function() {
    searchWord("duck");
    expect(browser.getUrl()).to.contain("query=duck");
    let ducks = $$(allDuckItems);
    let duckLength = $$(allDuckItems).length;
    expect(duckLength).to.not.equal(0);
    expect(ducks.every(duck => duck.isDisplayed())).to.equal(true);
  });

  it("should redirect to item page in case only one result matches", function() {
    searchWord("Yellow");
    expect(browser.getUrl()).to.contain("yellow");
    expect($(yellowDuckPage).isDisplayed());
    const title = $(YelloDuckTitle).getText();
    expect(title).to.contain("Yellow");
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    searchWord("Selenium");
    expect(browser.getUrl()).to.contain("query=Selenium");
    expect($(noResultsPage).isDisplayed());
    const text = $(noResultsPage).getText();
    expect(text).to.contain("No matching results");
  });

  it("correctly arranges items when using 'by price' sorting", function() {
    searchWord("duck");
    $(sortByPriceButton).click();
    browser.pause(3000);

    const duckPriceArr = $$(allDuckItems).map(duck => parseInt(duck.getAttribute("data-price")));
    const duckPriceNewArr = duckPriceArr.slice(0); // copy array
    duckPriceNewArr.sort((a, b) => a - b); // price sorting

    expect(duckPriceArr).to.deep.equal(duckPriceNewArr);
  });

  it("correctly arranges items when using 'by name' sorting", function() {
    searchWord("duck");
    $(sortByNameButton).click();
    browser.pause(3000);

    const duckNameArr = $$(allDuckItems).map(duck => duck.getAttribute("data-name"));
    const duckNameNewArr = duckNameArr.slice(0); // copy array
    duckNameNewArr.sort((a, b) => (a > b ? 1 : -1)); // name sorting a-z

    expect(duckNameArr).to.deep.equal(duckNameNewArr);
  });
});
