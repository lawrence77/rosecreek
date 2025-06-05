import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/dogs',
    pathMatch: 'full',
  },
  {
    path: 'dogs',
    loadComponent: () => import('@rosecreek/dogs').then((m) => m.DogsComponent),
  },
  {
    path: 'litters',
    loadComponent: () =>
      import('@rosecreek/litters').then((m) => m.LittersComponent),
  },
  {
    path: 'updates',
    loadComponent: () =>
      import('@rosecreek/updates').then((m) => m.UpdatesComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('@rosecreek/about-us').then((m) => m.AboutUsComponent),
  },
  {
    path: 'inquiries',
    loadComponent: () =>
      import('@rosecreek/inquiries').then((m) => m.InquiriesComponent),
  },
];
