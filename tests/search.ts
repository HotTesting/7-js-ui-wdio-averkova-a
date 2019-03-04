import { expect } from "chai";

describe("Items search", function() {
  //  test elements
    const searchInput = 'form[name="search_form"] input[data-type="search"]'
    const allDuckItems = '.products.row.half-gutter div.col-xs-6 div.product.column'
    const yellowDuckPage = 'div.box[data-name*="Yellow"]'
    const YelloDuckTitle = 'div.box[data-name*="Yellow"] h1.title'
    const noResultsPage = "div #box-search-results div em"
  

  function searchWord(word) {
    $(searchInput).setValue(word);
    $(searchInput).addValue("Enter");
    browser.pause(5000);
  }

  beforeEach("Open proper page", function() {
    browser.url("/");
  });

  it("should show results in case multiple items matches", function() {
    searchWord("duck");
    expect(browser.getUrl()).to.contain("query=duck");
    expect($$(allDuckItems).every(duck => duck.isDisplayed())).to.equal(true);
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
    const text = $(noResultsPage).getText();
    expect(text).to.contain("No matching results");
  });
});