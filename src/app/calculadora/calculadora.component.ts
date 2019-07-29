import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { LoggerService } from '../../indra-core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit, OnChanges {
  public readonly Math = Math;

  private acumulado: number = 0;
  private operador: string = '+';
  private limpiar: boolean = true;

  private pantalla: string = '0';
  private resumen: string = '';

  @Input() private init: string;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  private separadorDecimal: string = '.';

  constructor(private out: LoggerService) { }

  get Pantalla(): string { return this.pantalla; }
  // set Pantalla(value: string) {
  //   if (!Number.isNaN(parseFloat(value)) || value === '-') {
  //     this.pantalla = value;
  //   }
  // }
  get Resumen(): string { return this.resumen; }
  get EsElResultado() { return this.limpiar; }
  get SeparadorDecimal() { return this.separadorDecimal; }
  @Input() set SeparadorDecimal(value: string) {
    if (value !== this.separadorDecimal && (value === '.' || value === ',')) {
        this.separadorDecimal = value;
    } else {
      this.out.error('Separador decimal no reconocido.');
    }
  }
  inicia() {
    this.acumulado = 0;
    this.operador = '+';
    this.pantalla = '0';
    this.resumen = '';
    this.limpiar = true;
  }

  ponDigito(value: any) {
    if (typeof(value) !== 'string') {
      value = value.toString();
    }
    if (value.length !== 1 || value < '0' || value > '9') {
      this.out.error('No es un valor numerico.');
      return;
    }
    if (this.limpiar || this.pantalla === '0') {
      this.pantalla = value;
      this.limpiar = false;
    } else {
      this.pantalla += value;
    }
  }

  ponOperando(value: any) {
    if (!Number.isNaN(parseFloat(value))) {
        this.pantalla = value.toString();
        this.limpiar = false;
    } else {
        this.out.error('No es un valor numerico.');
    }
  }

  ponComa() {
    if (this.limpiar) {
      if (!isFinite(this.acumulado) || isNaN(this.acumulado)) { return; }
      this.pantalla = '0.';
      this.limpiar = false;
    } else if (this.pantalla.indexOf('.') === -1) {
      this.pantalla += '.';
    } else {
          this.out.warn('Ya tiene separador decimal.');
    }
  }

  borrar() {
    if (this.limpiar || this.pantalla.length === 1) {
      this.pantalla = '0';
      this.limpiar = true;
    } else {
      this.pantalla = this.pantalla.substr(0,
          this.pantalla.length - 1);
    }
  }

  cambiaSigno() {
    this.pantalla = (-this.pantalla).toString();
    if (this.limpiar) {
        this.acumulado = -this.acumulado;
    }
  }

  calcula(value: string) {
    if ('+-*/='.indexOf(value) === -1) {
      this.out.error(`Operacion no soportada: ${value}`);
      return;
    }

    const operando = parseFloat(this.pantalla);
    switch (this.operador) {
    case '+':
      this.acumulado += operando;
      break;
    case '-':
      this.acumulado -= operando;
      break;
    case '*':
      this.acumulado *= operando;
      break;
    case '/':
      this.acumulado /= operando;
      break;
    case '=':
      break;
    }
    // Con eval()
    // acumulado = eval (acumulado + this.operador + this.pantalla);
    this.resumen = value === '=' ? '' : (this.resumen + this.pantalla + value);
    this.pantalla = this.acumulado.toString();
    this.updated.emit(this.acumulado);
    this.operador = value;
    this.limpiar = true;
  }

  ngOnInit() {
    // if (this.init) {
    //   this.ponOperando(this.init);
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.init) {
      this.ponOperando(this.init);
    }
  }
}
