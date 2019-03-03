import { expect } from "chai";

describe("Items search", function() {

  beforeEach("Page refreshing", function() {
    browser.url("/");
  });

  it("correctly arranges items when using 'by price' sorting", function() {
    const searchInput = $('form[name="search_form"] input[data-type="search"]');
    searchInput.setValue("duck");
    searchInput.addValue("Enter");
    browser.pause(5000);

    expect(browser.getUrl()).to.contain("query=duck");

    $('#box-search-results a[href*="sort=price"]').click();
    browser.pause(2000);
    
  });

  it("correctly arranges items when using 'by name' sorting", function() {
    const searchInput = $('form[name="search_form"] input[data-type="search"]');
    searchInput.setValue("duck");
    searchInput.addValue("Enter"); 
    browser.pause(5000);

    expect(browser.getUrl()).to.contain("query=duck");

    $('#box-search-results a[href*="sort=name"]').click();
    browser.pause(2000);

    const sortNameAsc = (a, b) => a.name > b.name ? 1 : -1;
  });
});
