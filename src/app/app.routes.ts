import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { App } from './app';
import { Places } from './places/places';
import { PlaceDetails } from './place-details/place-details';

export const routes: Routes = [
    {
        path : '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path : 'home',
        component: Home
    },
    {
        path : 'places',
        component: Places
    },
    {
        path : 'place-details/:id',
        component: PlaceDetails
    }
];
