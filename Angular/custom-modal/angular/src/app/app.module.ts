import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';

/*route*/
import { routing } from './app.routing';

/*service*/
import { ModalService } from './_services/index';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestPageComponent } from './test-page/test-page.component';
import { ModalComponent } from './_directives/index';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestPageComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
