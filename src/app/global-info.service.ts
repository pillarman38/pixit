import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
}
