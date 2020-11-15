// Angular
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Dependencias
import { ExcelModule, GridModule } from '@progress/kendo-angular-grid';
// Directivas
import { PasswordDirective } from '../../directives/password.directive';
// Componentes
import { FooterComponent, HeaderComponent, LoginComponent, RegistryComponent, NotFoundComponent, FieldErrorDisplayComponent } from './';
import { HomeComponent, UserComponent, GridViewComponent, EditComponent } from './../components'
// Servicios
import { StatusPipe, GenderPipe } from 'src/app/pipes';
import { DeleteComponent } from '../components/user/delete/delete.user.component';
@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        NotFoundComponent,
        LoginComponent,
        RegistryComponent,
        FieldErrorDisplayComponent,
        HomeComponent,
        UserComponent,
        GridViewComponent,
        PasswordDirective,
        StatusPipe,
        GenderPipe,
        EditComponent,
        DeleteComponent
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        NotFoundComponent,
        FieldErrorDisplayComponent,
        PasswordDirective,
        HomeComponent,
        GridViewComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        GridModule,
        ExcelModule,
    ],
    providers: [
    ],
})
export class LayoutModule {
}