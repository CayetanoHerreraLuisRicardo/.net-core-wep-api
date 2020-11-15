// MODULOS ANGULAR
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'; // tipo de ruteo en angular
// DEPENDENCIAS
import { CookieModule } from 'ngx-cookie'; // cookies
import { ToastrModule } from 'ngx-toastr'; // alertas
import { ApiModule, Configuration } from 'ng-slabon-api-client';
import { MessageService } from '@progress/kendo-angular-l10n';
import { NgxSpinnerModule } from "ngx-spinner";
// SERVICIOS
import { AuthGuard } from './auth/auth.guard'; // nuestro guardian para rutas privadas
import { CookiesService, ValidatorService, CollectionsService, UtilsService, ChangesService, UserService, AuthService, KendoMessageService } from './services'; // Servicios: cookies, validar formulario, datos, funciones, variables observables, funciones usadas para del crud de usuario
// COMPONENTE
import { AppComponent } from './app.component'; // componente raiz
// MÓDULOS
import { AppRoutingModule } from './app-routing.module'; // rutas
import { BootstrapModule } from './modules/bootstrap/bootstrap.module'; // bootstrap CSS
import { LayoutModule } from './modules/layout/layaut.module'; // modulo de los componentes

import { environment } from './../environments/environment';
import { ErrorService } from './services/error.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookieModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      enableHtml: true
    }),
    AppRoutingModule,
    BootstrapModule,
    LayoutModule,
    ApiModule,
    NgxSpinnerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CookiesService,
    CollectionsService,
    ValidatorService,
    UtilsService,
    ChangesService,
    UserService,
    ErrorService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MessageService, useClass: KendoMessageService },
    { provide: Configuration, useFactory: (authService: CookiesService) => new Configuration({ basePath: environment.API_BASE_PATH, accessToken: authService.getToken.bind(authService) }), deps: [CookiesService], multi: false }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
