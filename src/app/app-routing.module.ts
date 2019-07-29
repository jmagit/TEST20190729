import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { DemosComponent } from './demos/demos.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { PersonasListComponent, PersonasViewComponent, PersonasEditComponent,
  PersonasAddComponent } from './personas/componentes.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'inicio', component: HomeComponent},
  { path: 'demos', component: DemosComponent},
  { path: 'chisme/de/hacer/numeros', component: CalculadoraComponent},
  { path: 'personas', component: PersonasListComponent},
  { path: 'personas/add', component: PersonasAddComponent},
  { path: 'personas/:id/edit', component: PersonasEditComponent},
  { path: 'personas/:id', component: PersonasViewComponent},
  { path: 'personas/:id/:kk', component: PersonasViewComponent},
  { path: 'empleados', children: [
    { path: '', component: PersonasListComponent},
    { path: 'add', component: PersonasAddComponent},
    { path: ':id/edit', component: PersonasEditComponent},
    { path: ':id', component: PersonasViewComponent},
    { path: ':id/:kk', component: PersonasViewComponent},
  ]},
  { path: 'pepito/grillo', redirectTo: '/personas/2'},
  { path: 'config',
    loadChildren: () => import('./config/config.module').then(mod => mod.ConfigModule)},

  { path: '404.html', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor( @Optional() @SkipSelf() parentModule: AppRoutingModule) {
    if (parentModule) {
      const msg = `ModuleName has already been loaded.
        Import ModuleName once, only, in the root AppModule.`;
      throw new Error(msg);
    }
  }
}
