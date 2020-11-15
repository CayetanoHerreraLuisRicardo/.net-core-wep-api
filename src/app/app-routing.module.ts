import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './modules/layout';
import { AuthGuard } from './auth/auth.guard';
import { UserComponent } from './modules/components/user/user.component';
import { HomeComponent } from './modules/components/home/home.component';
const routes: Routes = [
    { path: 'index', component: HomeComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'notfoud', component: NotFoundComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '**', pathMatch: 'full', redirectTo: 'notfoud' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
