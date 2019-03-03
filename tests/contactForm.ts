import * as faker from "faker";
import { expect } from "chai";

describe("Contact us form", function() {
  it.skip("must go to the page with 'Contact us' form", function() {
    browser.url("http://ip-5236.sunline.net.ua:38015");
    $("#default-menu li.customer-service a").click();
    browser.pause(200);
    expect(browser.getUrl()).to.contain("customer-service");
  });

  it("should be successful", function() {
    browser.url("/customer-service-s-0");

    const formTitle = $(".col-md-6 h1").getText();
    expect(formTitle).to.contain("Contact Us");

    const email = faker.internet.email(
      undefined,
      undefined,
      "ip-5236.sunline.net.ua"
    );
    console.log("Email will be used", email);

    $('form[name="contact_form"] input[name="name"]').setValue("Yuliia");
    $('form[name="contact_form"] input[name="email"]').setValue(email);
    $('form[name="contact_form"] input[name="subject"]').setValue(
      "Contact you"
    );
    $('form[name="contact_form"] textarea[name="message"]').setValue(
      "Contact you"
    );
    $('form[name="contact_form"] button[name="send"]').click();
    browser.pause(200);
    expect(browser.getUrl()).to.contain("?page_id=0");
    expect($(".alert.alert-success").isDisplayed()).to.equal(
      true,
      "Expected Alert to be visible, but it doesnt"
    );
    const text = $(".alert.alert-success").getText();
    expect(text).to.contain("Your email has successfully been sent");
  });
});
