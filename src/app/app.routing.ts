﻿import {RouterModule, Routes} from '@angular/router';

import {ProfileComponent} from './user/profile/profile.component';
import {RestorePasswordComponent} from './auth/restore-password/restore-password.component';
import {RememberComponent} from './auth/remember/remember.component';
import {UsersListComponent} from './user/users-list/users-list.component';
import {Exception404Component} from './exception/exception404/exception404.component';
import {ViewInstructionComponent} from './instruction/view-instruction/view-instruction.component';
import {EditInstructionComponent} from './instruction/edit-instruction/edit-instruction.component';
import {AdminGuard, WriterGuard} from './auth/guards';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'auth/activate/:code', component: LoginComponent},
    { path: 'restorePassword', component: RestorePasswordComponent},
    { path: 'remember', component: RememberComponent},
    { path: 'restore/:code', component: RestorePasswordComponent},
    { path: 'users', component: UsersListComponent, canActivate: [AdminGuard]},
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'addInstruction', component: EditInstructionComponent},// canActivate: [WriterGuard]},
    { path: 'editInstruction/:id', component: EditInstructionComponent, canActivate: [WriterGuard]},
    { path: 'instruction/:id', component: ViewInstructionComponent},
    { path: 'exception404', component: Exception404Component},
      // children: [
      //   {
      //     path: '',
      //     component: ProfileNewsComponent
      //   },
      //   {
      //     path: 'edit',
      //     component: ProfileEditComponent
      //   }]},
    // otherwise redirect to home
    { path: '**', redirectTo: 'exception404' }
];

export const routing = RouterModule.forRoot(appRoutes);
