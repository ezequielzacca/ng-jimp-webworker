import { UNCOMPRESSED_IMAGE } from './image.const';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { compressImage } from './jimp.utils';
import { ImageCompressorService } from './image-compressor.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgUrl: SafeUrl;

  constructor(private ds: DomSanitizer, private ic: ImageCompressorService) { }

  ngOnInit() {
    this.reset();
  }

  compress() {
    this.ic.compressImage(UNCOMPRESSED_IMAGE).subscribe(result => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(result);
    })
  }

  compressWithWorker() {
    this.ic.compressImageWithWorker(UNCOMPRESSED_IMAGE).subscribe(result => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(result);
    })
  }

  reset() {
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }

  title = 'jimp-webworker';
}
