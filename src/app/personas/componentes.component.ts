import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonasViewModelService } from './servicios.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './template.component.html',
  styleUrls: ['./estilos.component.css']
})
export class PersonasComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-personas-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./estilos.component.css']
})
export class PersonasListComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-personas-add',
  templateUrl: './template-form.component.html',
  styleUrls: ['./estilos.component.css']
})
export class PersonasAddComponent implements OnInit {
  constructor(private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  ngOnInit() {
    this.vm.add();
  }
}

@Component({
  selector: 'app-personas-edit',
  templateUrl: './template-form.component.html',
  styleUrls: ['./estilos.component.css']
})
export class PersonasEditComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router,
              private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  private obs$: any;
  ngOnInit() {
     this.obs$ = this.route.paramMap.subscribe(
       (params: ParamMap) => {
       const id = +params.get('id'); // (+) converts string 'id' to a number
       if (id) {
         this.vm.edit(id);
       } else {
         this.router.navigate(['/404.html']);
       }
      });
   }
   ngOnDestroy() { this.obs$.unsubscribe(); }
 }

@Component({
  selector: 'app-personas-view',
  templateUrl: './template-view.component.html',
  styleUrls: ['./estilos.component.css']
})
export class PersonasViewComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private router: Router,
              private vm: PersonasViewModelService) { }
  public get VM() { return this.vm; }
  private obs$: any;
  ngOnInit() {
     this.obs$ = this.route.paramMap.subscribe(
       (params: ParamMap) => {
       const id = +params.get('id'); // (+) converts string 'id' to a number
       if (id) {
         this.vm.view(id);
       } else {
         this.router.navigate(['/404.html']);
       }
      });
   }
   ngOnDestroy() { this.obs$.unsubscribe(); }
 }

export const PERSONAS_COMPONENTS = [ PersonasComponent, PersonasListComponent, PersonasAddComponent,
  PersonasEditComponent, PersonasViewComponent];
