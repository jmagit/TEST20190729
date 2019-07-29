import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../common-app';
import { LoggerService } from 'src/indra-core';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit {
  public nombre: string = 'mundo';
  public listado = [
    { id: 1, nombre: 'Madrid' },
    { id: 2, nombre: 'BARCELONA' },
    { id: 3, nombre: 'sevilla' },
    { id: 4, nombre: 'a coruña' },
  ];
  idProvincia = 2;
  fontSize = 24;

  resultado = '';
  visible = true;
  estetica = { importante: true, error: false, urgente: true };

  constructor(public notify: NotificationService, private out: LoggerService) { }

  ngOnInit() {
  }

  saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }
  depide() {
    this.resultado = `Adios ${this.nombre}`;
  }
  di(algo: string) {
    this.resultado = `Dice ${algo}`;
  }

  calcula(a: number, b: number): number { return a + b; }

  cambia() {
    this.visible = !this.visible;
    this.estetica.importante = !this.estetica.importante;
    this.estetica.error = !this.estetica.error;
  }

  public add(nombre: string) {
    if (!nombre) {
      this.out.error('Falta el mensaje de la notificación.');
      return;
    }
    const id = this.listado.length ? this.listado[this.listado.length - 1].id + 1 : 1;
    this.listado.push({ id, nombre });
    this.idProvincia = id;
  }

  // tslint:disable:member-ordering
  idiomas = [
    { codigo: 'es', region: 'España' },
    { codigo: 'pt', region: 'Portuges' },
    { codigo: 'en-US', region: 'USA' }
  ];
  idioma = this.idiomas[0].codigo;
  resultados: any[] = [];
  valCalculadora = 666;
  // tslint:enable:member-ordering

  ponResultado(origen: string, valor: any) {
    this.resultados.push({
      pos: this.resultados.length + 1,
      origen,
      valor
    });
  }

}
