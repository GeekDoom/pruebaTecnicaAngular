import { Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { CvsComponent } from './modules/cvs/cvs.component';
import { CrudComponent } from './modules/crud/crud.component';
import { ElementComponent } from './modules/element/element.component';
import { PublicGuard } from './core/guards/public.guard';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
    path: 'login',
        loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [ PublicGuard ],
        canMatch: [ PublicGuard ]
    },
    {
    path: 'index',
        loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
        children: [
            { path:'cvs', component: CvsComponent},
            { path: 'crud', component: CrudComponent },
            { path: 'edit', component: ElementComponent },
            {path: '', redirectTo: 'cvs', pathMatch: 'full'}
        ],
        canActivate: [ AuthGuard ],
        canMatch: [ AuthGuard ]
    },
     {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
    } 
];
