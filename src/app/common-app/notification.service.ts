import { Injectable } from '@angular/core';
import { LoggerService } from 'src/indra-core';

export enum NotificationType {
  error = 'error',
  warn = 'warn',
  info = 'info',
  log = 'log'
 }

export class Notification {
  constructor(private id: number, private message: string, private type: NotificationType) {}

  public get Id(): number { return this.id; }
  public get Message(): string { return this.message; }
  public get Type(): NotificationType { return this.type; }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private listado: Array<Notification> = [];

  constructor(private out: LoggerService) { }

  public get Listado() { return Object.assign([], this.listado); }
  public get HayNotificaciones(): boolean { return this.listado.length > 0; }

  public add(msg: string, tipo: NotificationType = NotificationType.error ) {
    if (!msg) {
      this.out.error('Falta el mensaje de la notificación.');
      return;
    }
    const id = this.HayNotificaciones ? this.listado[ this.listado.length - 1].Id + 1 : 1;
    this.listado.push(new Notification(id, msg, tipo));
    if (tipo === NotificationType.error) {
      this.out.error(msg);
    }
  }
  public remove(index: number) {
    if ( 0 <= index && index < this.listado.length) {
      this.listado.splice(index, 1);
    } else {
      this.out.error('Index out of range');
    }
  }
  public clear() {
    if (this.HayNotificaciones) {
      this.listado.splice(0);
    }
  }
}
