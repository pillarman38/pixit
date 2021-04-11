import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalInfoService {
  viewedphoto;
  albums
  photos
  latestImports
  newAlbumUpdater: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  albumUpdater = this.newAlbumUpdater.asObservable()
  selectedArr = []
  selectedAlbum = ""
  plusButtonClicked = false
  photosArr: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  currentMsg = this.photosArr.asObservable()
  showModal$ = new BehaviorSubject<boolean>(false);
  photoSize: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  changePhotoThumbSize = this.photoSize.asObservable()
  
  statusBarUpdater = new BehaviorSubject<boolean>(false)
  statusBarUpdate = this.statusBarUpdater.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  reloadData(){
    console.log("yo", this.selectedAlbum);
    
    this.http.post('http://192.168.1.86:4012/api/mov/getAlbum', {album: this.selectedAlbum}).subscribe((res: any) => {
      console.log(res);
      console.log("hi", this.selectedAlbum);
      this.photosArr.next(res)
  })
  }
  change() {
    this.showModal$.next(!this.showModal$.getValue());
  }
  updateAlbum(res) {
    this.newAlbumUpdater.next(res)
  }
  updatePicSize(res) {
    this.photoSize.next(res)
  }
}
