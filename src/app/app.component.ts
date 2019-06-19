import { UNCOMPRESSED_IMAGE } from "./image.const";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ImageCompressorService } from "./image-compressor.service";

@Component({
  selector: "app-root",
  template: `
    <div class="container">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
      <div>
        <button (click)="compress()">Compress</button>
        <button (click)="compressWithWorker()">Compress Worker</button>
        <button (click)="reset()">Reset</button>
      </div>
      <img [src]="imgUrl" />
    </div>
  `,
  styles: [
    `
      .container {
        text-align: center;
      }
      .lds-ripple {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 64px;
      }
      .lds-ripple div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
      .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
      }
      @keyframes lds-ripple {
        0% {
          top: 28px;
          left: 28px;
          width: 0;
          height: 0;
          opacity: 1;
        }
        100% {
          top: -1px;
          left: -1px;
          width: 58px;
          height: 58px;
          opacity: 0;
        }
      }
    `
  ]
})
export class AppComponent implements OnInit {
  imgUrl: SafeUrl;

  constructor(private ds: DomSanitizer, private ic: ImageCompressorService) {}

  ngOnInit() {
    this.reset();
  }

  compress() {
    this.ic.compressImage(UNCOMPRESSED_IMAGE).subscribe(compressedImage => {
      this.imgUrl = this.ds.bypassSecurityTrustUrl(compressedImage);
    });
  }

  compressWithWorker() {
    this.ic
      .compressImageWithWorker(UNCOMPRESSED_IMAGE)
      .subscribe(compressedImage => {
        this.imgUrl = this.ds.bypassSecurityTrustUrl(compressedImage);
      });
  }

  reset() {
    this.imgUrl = this.ds.bypassSecurityTrustUrl(UNCOMPRESSED_IMAGE);
  }
}
