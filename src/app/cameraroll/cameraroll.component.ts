import { Component, ViewChild, OnInit, HostListener, ElementRef, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalInfoService } from '../global-info.service';
import { Router } from '@angular/router';
import { SelectContainerComponent } from 'ngx-drag-to-select';

@Component({
  selector: 'app-cameraroll',
  templateUrl: './cameraroll.component.html',
  styleUrls: ['./cameraroll.component.scss']
})
export class CamerarollComponent implements OnInit {
  photosArr: any[] = [];
  selectedPhotos: any[] = [];
  dragtoalbum = false
  touchtime = 0

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
  @ViewChildren('imageChanger') imageChanger;
  constructor(private http:HttpClient, private global: GlobalInfoService, private router: Router) { }

  selected(e) {
    console.log(e);
  }
  // click(e) {
  //   console.log("hi");
    
  //   // e.preventDefault();
  //   // console.log(e);
  //   console.log("disabled");
    
  //   // this.selectContainer.disabled = false
  //   // this.selectContainer.clearSelection()
  // }

  dragPhotos(e) {
    console.log("files: ", e);    
  }
  liftfreeze(e){
    // console.log(e);
    console.log("HIOIIII", this.selectedPhotos.length);
    if (this.touchtime === 0) {
      console.log("SINGLE CLICK");
      this.touchtime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.touchtime < 400) {
        //  time between two clicks to be considered as double click
        this.touchtime = 0;
        console.log("DOUBLE CLICKED");
        this.router.navigateByUrl('/viewer')
      } else {
        console.log("SINGLE CLICK");
        // this.selectContainer.selectMode = true
        this.touchtime = new Date().getTime();
      }
    }
    // console.log(this.global.selectedArr, this.selectedPhotos);
    if(this.selectedPhotos.length > 0 && this.selectContainer.disabled == false) {
      console.log("JUST DO IT!!!!");
      this.selectContainer.disabled = true
    } else {
      this.selectContainer.clearSelection()
      this.selectContainer.disabled = false
    }
    if(this.selectedPhotos.length == 1 && this.selectContainer.disabled == false) {
      console.log("JUST DO IT!!!!");
      this.selectContainer.disableDrag = true
    } else {
      this.selectContainer.disableDrag = false
    }
  }

  selectionEnded(e) {
    console.log(this.selectedPhotos.length);
    console.log("ended");
    this.global.selectedArr = this.selectedPhotos
    
  
    // 
  }
  selectionStarted(e) {
    
    // this.selectContainer.disableDrag = false

      console.log(this.selectedPhotos.length);
      console.log("started");
      this.global.selectedArr = this.selectedPhotos
    
    // 
  }
  allowDrop(ev) {
    ev.preventDefault();
    // console.log("hi");
    this.global.selectedArr = this.selectedPhotos
    this.selectContainer.disabled = false
    
  }
  doubleClick(e) {
    console.log("Double click e: ", e);
    
  }
  ngOnInit(): void {
    this.http.get(`http://192.168.1.86:4012/api/mov/getallphotos`).subscribe((res: any) => {
      console.log(res);
      this.photosArr = res
    })
    this.global.photosArr.subscribe((res) => {
      this.photosArr = res
    })
    this.global.photoSize.subscribe((res) => {
      if(this.imageChanger) {
        console.log(this.imageChanger)
        console.log("album viewer", res);
  
        var results = this.imageChanger['_results']
        console.log("RESULTS: ", results);
        
        results.forEach((element) => {
          element.nativeElement.style.maxHeight = res + "%"
          element.nativeElement.style.maxWidth = res + "%"
        })
      }
    })
      console.log(this.global.selectedAlbum)
  }
}
