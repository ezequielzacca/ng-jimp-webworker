import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ImageCompressorService } from './image-compressor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ImageCompressorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
