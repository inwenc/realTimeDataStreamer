import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealTimeDataComponent } from './real-time-data/real-time-data.component';

const routes: Routes = [
  { path: 'real-time-data', component: RealTimeDataComponent },
  { path: '',   redirectTo: '/real-time-data', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
