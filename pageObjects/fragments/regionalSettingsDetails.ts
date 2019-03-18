import { Input } from "./input";
import { Dropdown } from "./dropdown";

export class RegionalSettingsDetails {
  protected containerLocator: string;
  protected get container() {
    return $(this.containerLocator);
  }

  protected currency: Dropdown = new Dropdown(() => {
    return this.container.$('select[name="currency_code"]');
  });
  protected country: Dropdown = new Dropdown(() => {
    return this.container.$('select[name="country_code"]');
  });

  protected state: Dropdown = new Dropdown(() => {
    return this.container.$('select[name="zone_code"]');
  });

  protected tax: Input = new Input(() => {
    return this.container.$('input[name=".radio input[name*="tax]');
  });
 

  constructor(containerLocator: string) {
    this.containerLocator = containerLocator;
  }

  setCurrencyAndRegion(regionalSettings: IRegionalSettings): any {
    $(".loader-wrapper").waitForDisplayed(undefined, true); // invisibility of loader
    this.currency.selectByValueAttribute(regionalSettings.currency);
    this.country.selectByValueAttribute(regionalSettings.country);

    // Optional fields
    if (regionalSettings.state) {
      this.state.selectByValueAttribute(regionalSettings.state);
    }
  }
}

export interface IRegionalSettings {
  currency: string;
  country: string;
  state?: string; 
  tax?: string
}