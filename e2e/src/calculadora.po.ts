import { browser, by, element } from 'protractor';
import { PageBase } from './page-base.po';

export class CalculadoraPage extends PageBase {
  navigate() {
    return browser.get(`${browser.baseUrl}/chisme/de/hacer/numeros`);
  }
}
