import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { CvsComponent } from './modules/cvs/cvs.component';
import { CrudComponent } from './modules/crud/crud.component';

export const routes: Routes = [
    {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
    path: 'index',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
        children: [
            { path:'cvs', component: CvsComponent},
            { path: 'crud', component: CrudComponent },
            {path: '', redirectTo: 'cvs', pathMatch: 'full'}
        ]
    },
     {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
    } 
];
