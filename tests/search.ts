import { expect } from "chai";

describe("Items search", function() {
  //  test elements
  const elem = {
    searchInput: $('form[name="search_form"] input[data-type="search"]'),
    allDuckItems: $$('.products.row.half-gutter div.col-xs-6 div.product.column'),
    yellowDuckPage: $('div.box[data-name*="Yellow"]'),
    YelloDuckTitle: $('div.box[data-name*="Yellow"] h1.title'),
    noResultsPage: $("div #box-search-results div em")
  };

  function searchWord(word) {
    elem.searchInput.setValue(word);
    elem.searchInput.addValue("Enter");
    browser.pause(5000);
  }

  beforeEach("Open proper page", function() {
    browser.url("/");
  });

  it("should show results in case multiple items matches", function() {
    searchWord("duck");
    expect(browser.getUrl()).to.contain("query=duck");
    expect(elem.allDuckItems.every(duck => duck.isDisplayed())).to.equal(true);
  });

  it("should redirect to item page in case only one result matches", function() {
    searchWord("Yellow");
    expect(browser.getUrl()).to.contain("yellow");
    expect(elem.yellowDuckPage.isDisplayed());
    const title = elem.YelloDuckTitle.getText();
    expect(title).to.contain("Yellow");
  });

  it("should redirect to 'no matching results' in case no items matched", function() {
    searchWord("Selenium");
    const text = elem.noResultsPage.getText();
    expect(text).to.contain("No matching results");
  });

  afterEach("Clean search input", function() {
    elem.searchInput.clearValue();
  });
});
