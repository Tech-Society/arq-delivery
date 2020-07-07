import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ServiciosComponent } from './components/pages/servicios/servicios.component';
import { DetalleServicioComponent } from './components/pages/detalle-servicio/detalle-servicio.component';
import { OrdenServicioComponent } from './components/pages/orden-servicio/orden-servicio.component';
import { MiPerfilComponent } from './components/pages/mi-perfil/mi-perfil.component';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NosotrosComponent } from './components/pages/nosotros/nosotros.component';
import { ListServicesComponent } from './components/pages-admin/list-services/list-services.component';
import { ListCustomersComponent } from './components/pages-admin/list-customers/list-customers.component';
import { ListOrdersComponent } from './components/pages-admin/list-orders/list-orders.component';


const routes: Routes = [
  { path: 'Landing', component: LandingComponent },
  { path: 'Servicios', component: ServiciosComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'Landing' },
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    ServiciosComponent,
    DetalleServicioComponent,
    OrdenServicioComponent,
    MiPerfilComponent,
    FooterComponent,
    NosotrosComponent,
    ListServicesComponent,
    ListCustomersComponent,
    ListOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
