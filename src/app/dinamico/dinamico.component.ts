import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../main/home/home.component';
import { DemosComponent } from '../demos/demos.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { PersonasComponent } from '../personas/componentes.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css'],
  entryComponents: [ HomeComponent, DemosComponent, CalculadoraComponent, PersonasComponent, ]
})
export class DinamicoComponent implements OnInit {
  menu = [
    { texto: 'Personas', componente: PersonasComponent  },
    { texto: 'Inicio', componente: HomeComponent  },
    { texto: 'Demos', componente: DemosComponent  },
    { texto: 'Calculadora', componente: CalculadoraComponent  },
  ];
  seleccionado = this.menu[0].componente;

  constructor() { }

  seleccionar(index: number) {
    if ( 0 <= index && index < this.menu.length) {
      this.seleccionado = this.menu[index].componente;
    }
  }
  ngOnInit() {
  }

}
