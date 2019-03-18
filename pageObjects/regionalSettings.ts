import { BasePO } from "./base";
import { RegionalSettingsDetails } from "./fragments/regionalSettingsDetails";

export class RegionalSettingsPO extends BasePO {
  public regionalSettins: RegionalSettingsDetails;

  constructor() {
    super();
    this.regionalSettins = new RegionalSettingsDetails(
      "#box-checkout-customer .billing-address"
    );
  }

  open() {
    super.open("/");
  }

  //Open Regional settings popup
  openPopup(): any {
      const changeButton = $(".change");
      changeButton.click();
      browser.waitUntil(
        function() {
          return changeButton.isDisplayed();
        }, 200, "Error msg: 'Regional Settings' popup is not displayed");
  }

  // Save Regional settings
  saveSettings(): any {
    const saveSettingsBtn = $('#box-regional-settings button[name="save"]');
    saveSettingsBtn.click();
  }

  checkRegionalSettings(): any {
    const currencyLabel = $("#region div.currency")
    currencyLabel.waitForDisplayed(3000);
    browser.waitUntil(
        function() {
          return currencyLabel.getText() ;
        }, 2000, "Error msg: 'Currency' is not displayed");
  }

}

export const RegionalSettings = new RegionalSettingsPO();