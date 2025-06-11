import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';

export const routes: Routes = [
    {
        path : '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path : 'app',
        component: App
    },
    {
        path : '**',
        redirectTo: 'app'
    }
];
