import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Places } from './places/places';
import { PlaceDetails } from './place-details/place-details';
import { Login } from './login/login';
import { Service } from './service/service';
import { Stages } from './stages/stages';

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
        path : 'login',
        component: Login
    },
    {
        path : 'places',
        component: Places
    },
    {
        path : 'place-details/:id',
        component: PlaceDetails
    },
    {
        path : 'service',
        component: Service
    },
    {
        path : 'stages',
        component: Stages
    }
];