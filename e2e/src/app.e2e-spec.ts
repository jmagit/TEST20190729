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
    let menu: Array<any> = [
        { ruta: '/inicio', texto: 'inicio', componente: 'app-home' },
        { ruta: '/demos', texto: 'demos', componente: 'app-demos' },
        { ruta: '/chisme/de/hacer/numeros', texto: 'calculadora', componente: 'calculadora' },
        { ruta: '/personas', texto: 'personas', componente: 'xapp-personas-list' },
        { ruta: '/pepito/grillo', texto: 'pepito', componente: 'app-personas-view' },
        { ruta: '/config', texto: 'config', componente: 'app-configuracion' },
        { ruta: '/config/datos', texto: 'datos', componente: 'app-datos' },
      ];
    beforeAll(() => {
      page = new AppPage();
      page.navigateTo();
      browser.sleep(1000);
    });

    menu.forEach(item => {
      it(`Navego a ${item.texto}`, () => {
        page.pulsarMenu(item.texto);
        expect(page.dameComponente(item.componente).isPresent()).toBeTruthy();
        browser.sleep(1000);
      });
    });

    // it('Navego a las opciones', () => {
    //   menu.forEach(item => {
    //     page.pulsarMenu(item.texto);
    //     expect(page.dameComponente(item.componente).isPresent()).toBeTruthy();
    //     browser.sleep(1000);
    //   });
    // });

    // it('Navego a Demos', () => {
    //   page.pulsarMenu('demos');
    //   expect(page.dameComponente('app-demos').isPresent()).toBeTruthy();
    //   browser.sleep(1000);
    // });
    // it('Navego a Calculadora', () => {
    //   page.pulsarMenu('calculadora');
    //   expect(page.dameComponente('calculadora').isPresent()).toBeTruthy();
    //   browser.sleep(1000);
    // });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
