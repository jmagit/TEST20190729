import { browser, element, by } from 'protractor';

export class LoginComponent {
  isPresent() {
    return browser.isElementPresent(by.css('app-login'));
  }
  ponUsuario(texto: string) {
    element.all(by.css('app-login form input')).get(0).clear();
    return element.all(by.css('app-login form input')).get(0).sendKeys(texto);
  }
  ponPassword(texto: string) {
    element.all(by.css('app-login form input')).get(1).clear();
    return element.all(by.css('app-login form input')).get(1).sendKeys(texto);
  }
  enviar() {
    return element(by.css('app-login form')).element(by.buttonText('Enviar')).click();
  }
  login(usr: string, pwd: string) {
    this.ponUsuario(usr);
    this.ponPassword(pwd);
    return this.enviar();
  }
  isLogin() {
    return element(by.css('app-login form'));
  }
}
