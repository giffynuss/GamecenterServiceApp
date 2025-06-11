import { Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Places } from './places/places';

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
        path : 'places',
        component: Places
    }
];
