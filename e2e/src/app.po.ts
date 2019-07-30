import { browser, by, element } from 'protractor';
import { PageBase } from './page-base.po';

export class AppPage extends PageBase {

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  pulsarMenu(texto: string) {
    return element(by.cssContainingText('app-menu a', texto)).click();
  }

}
