import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoubtsPage } from './doubts';

@NgModule({
  declarations: [
    DoubtsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoubtsPage),
  ],
})
export class DoubtsPageModule {}
