import { UNCOMPRESSED_IMAGE } from './image.const';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { compressImage } from './jimp.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading:boolean = false;
  imgUrl: SafeUrl;

  constructor(private ds: DomSanitizer) {  }

  ngOnInit() {    
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }

  compress() {
    compressImage(UNCOMPRESSED_IMAGE).then(img => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(img);
    });
  }

  reset() {
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }

}
