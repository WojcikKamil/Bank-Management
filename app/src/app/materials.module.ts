import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';

const modules = [
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSnackBarModule,
  MatRippleModule,
  MatSidenavModule,
  MatGridListModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatExpansionModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export default class MaterialModule {}
