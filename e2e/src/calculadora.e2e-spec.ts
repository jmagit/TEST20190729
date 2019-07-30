import { CalculadoraPage } from './calculadora.po';

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
});
