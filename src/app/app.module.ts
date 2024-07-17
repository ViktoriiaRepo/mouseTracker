import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { mouseReducer } from './state/mouse.reducer';

import { AppComponent } from './app.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';

@NgModule({
  declarations: [AppComponent, ParentComponent, ChildComponent],
  imports: [BrowserModule, StoreModule.forRoot({ mouse: mouseReducer })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
