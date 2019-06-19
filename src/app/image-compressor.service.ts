import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { compressImage } from './jimp.utils';

@Injectable()
export class ImageCompressorService {
    worker = new Worker('./jimp.worker', { type: 'module' });    //register worker callback

    constructor() { }

    compressImage(base64image: string): Observable<string> {
        let resultSubject = new Subject<string>();
        compressImage(base64image).then(result => {
            resultSubject.next(result);
        });
        return resultSubject;
    }

    compressImageWithWorker(base64image: string): Observable<string> {
        let resultSubject = new Subject<string>();
        this.worker.onmessage = ({ data }: { data: string }) => {
            resultSubject.next(data);
        };
        this.worker.postMessage(base64image);
        return resultSubject;
    }
}