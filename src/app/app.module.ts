import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {
  MatTableModule, MatMenuModule, MatButtonModule, MatDialogModule, MatInputModule, MatChipsModule,
  MatIconModule, MatCheckboxModule, MatTooltipModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { DialogEditComponent } from './dialogs/edit/dialog-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RequestService } from './services/request-service';
import { DialogSendComponent } from './dialogs/send/dialog-send.component';
import { TextMaskModule } from 'angular2-text-mask';
import { Helper } from './helpers/helper';
import { WoodCurrencyPipe } from './pipes/currency.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogEditComponent,
    DialogSendComponent,
    WoodCurrencyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TextMaskModule
  ],
  exports: [ ],
  providers: [ RequestService, Helper],
  entryComponents: [ DialogEditComponent, DialogSendComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
