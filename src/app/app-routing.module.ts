import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {IndexComponent} from './components/index/index.component';
import {ThreadDetailComponent} from './components/thread-detail/thread-detail.component';
import {ThreadCreateComponent} from './components/thread-create/thread-create.component';
import {IsLoggedInGuardService} from './services/is-logged-in-guard.service';
import {ThreadEditComponent} from './components/thread-edit/thread-edit.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login',  component: LoginComponent},
  {path: 'index', component: IndexComponent, canActivate: [IsLoggedInGuardService]},
  {path: 'threadCreate', component: ThreadCreateComponent, canActivate: [IsLoggedInGuardService]},
  {path: 'threadDetail/:id', component: ThreadDetailComponent, canActivate: [IsLoggedInGuardService]},
  {path: 'threadEdit/:id', component: ThreadEditComponent, canActivate: [IsLoggedInGuardService]},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
