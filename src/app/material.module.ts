import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatInputModule,
  MatProgressSpinnerModule

} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ]
})
export class MaterialModule {}
