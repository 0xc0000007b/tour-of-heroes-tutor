import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/heroes/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    data: { animation: 'isLeft' },
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./components/heroes/hero-editor/hero-editor.component').then(
        (c) => c.HeroEditorComponent
      ),
    data: { animation: 'isRight' },
  },
  {
    path: 'create-hero',
    loadComponent: () =>
      import('./components/heroes/hero-creator/hero-creator.component').then(
        (c) => c.HeroCreatorComponent
      ),
    data: { animation: 'isRight' },
  },
  {
    path: 'drag',
    loadComponent: () =>
      import(
        './components/additional-components/drag-drop-test/drag-drop-test.component'
      ).then((c) => c.DragDropTestComponent),
  },
];
