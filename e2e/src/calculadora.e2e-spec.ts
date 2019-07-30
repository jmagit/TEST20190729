import { CalculadoraPage } from './calculadora.po';
import { browser } from 'protractor';

describe('Verificar la calculadora', () => {
  let page: CalculadoraPage;

  beforeEach(() => {
    page = new CalculadoraPage();
    page.navigateTo();
  });

  it('Abre la calculadora', () => {
    page.navigate();
    expect(page.dameComponente('calculadora').isPresent()).toBeTruthy();
  });
  it('Prueba en múltiples navegadores', () => {
    browser.get('http://angular.io');
    let browser2 = browser.forkNewDriverInstance();
    browser2.get(browser.baseUrl);
    browser.sleep(2000);
    browser2.sleep(2000);
  });

});
