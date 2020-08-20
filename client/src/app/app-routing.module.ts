import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealTimeDataComponent } from './real-time-data/real-time-data.component';
import { SearchComponent } from './search/search.component';
import {
  FavoriteListComponent
} from './favorite-list/favorite-list.component';

const routes: Routes = [
  { path: 'real-time-data', component: RealTimeDataComponent },
  { path: 'search', component: SearchComponent },
  { path: 'favorite-list', component: FavoriteListComponent },
  { path: '',   redirectTo: '/real-time-data', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
