import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatVideoModule } from 'mat-video';

import { IonicModule } from '@ionic/angular';

import { MoviePage } from './movie.page';

const routes: Routes = [
  {
    path: '',
    component: MoviePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatVideoModule
  ],
  declarations: [MoviePage]
})
export class MoviePageModule {}
