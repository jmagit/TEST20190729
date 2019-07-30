import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('Para probar la página principal', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Debe verse el mensaje de bienvenida', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to Curso de Angular!');
  });

  describe('Deben funcionar las opciones del menu', () => {
    beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
      browser.sleep(1000);
    });

    it('Navego a Demos', () => {
      page.pulsarMenu('demos');
      expect(page.dameComponente('app-demos').isPresent()).toBeTruthy();
      browser.sleep(1000);
    });
    it('Navego a Calculadora', () => {
      page.pulsarMenu('calculadora');
      expect(page.dameComponente('calculadora').isPresent()).toBeTruthy();
      browser.sleep(1000);
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
