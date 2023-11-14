import { Routes } from '@angular/router';

import { ROUTES } from '@core/constant/routes.contants';

export const routes: Routes = [
  ...ROUTES,
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];
