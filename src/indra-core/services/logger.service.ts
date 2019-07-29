import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';

export const ERROR_LEVEL = new InjectionToken<string>('ERROR_LEVEL');

@Injectable()
export class LoggerService {
  private nivel: number = 5;

  constructor(@Optional() @Inject(ERROR_LEVEL) nivel: number) {
    if (nivel != null) {
      this.nivel = nivel;
    }
  }

  public error(msg: string): void {
    if (this.nivel > 0) {
      console.error(msg);
    }
  }
  public warn(msg: string): void {
    if (this.nivel > 1) {
      console.warn(msg);
    }
  }
  public info(msg: string): void {
    if (this.nivel > 2) {
      // tslint:disable-next-line: no-console
      if (console.info) {
        // tslint:disable-next-line: no-console
        console.info(msg);
      } else {
        this.log(msg);
      }
    }
  }
  public log(msg: string): void {
    if (this.nivel > 3) {
      console.log(msg);
    }
  }
}
