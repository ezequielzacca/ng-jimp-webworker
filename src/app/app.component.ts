import { UNCOMPRESSED_IMAGE } from './image.const';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { compressImage } from './jimp.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  imgUrl: SafeUrl;
  UIAliveWitness: string = "";

  constructor(private ds: DomSanitizer) {

  }

  ngOnInit() {
    setInterval(() => {
      this.UIAliveWitness += "."
    }, 50)
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }

  compressWithWorker() {
    const jimpWorker = new Worker('./jimp.worker', { type: 'module' });
    jimpWorker.onmessage = (img) => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(img.data);
    };
    jimpWorker.postMessage(UNCOMPRESSED_IMAGE);
  }

  compress() {
    compressImage(UNCOMPRESSED_IMAGE).then(img => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(img);
    });
  }

  reset() {
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }

  title = 'jimp-webworker';
}
