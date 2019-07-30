import { browser, element, by } from 'protractor';

export abstract class PageBase {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
  dameComponente(nombre: string) {
    return element(by.css(nombre));
  }

}
