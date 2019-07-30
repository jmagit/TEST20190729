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

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
