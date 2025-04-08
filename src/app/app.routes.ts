import { Routes } from '@angular/router';
import { BacaComponent } from './pages/baca/baca.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail', component: DetailComponent },
    { path: 'baca', component: BacaComponent },
    { path: 'favorite', component: FavoriteComponent }
];
