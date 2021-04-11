import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewChildren, OnInit } from '@angular/core';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { GlobalInfoService } from '../global-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-imports',
  templateUrl: './latest-imports.component.html',
  styleUrls: ['./latest-imports.component.scss']
})
export class LatestImportsComponent implements OnInit {
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

  dragPhotos(e) {
    console.log("files: ", e);
  }
  
  liftfreeze(e){
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
      // this.global.statusBarUpdater.next(true) 
    } else {
      this.selectContainer.clearSelection()
      this.selectContainer.disabled = false
      // this.global.statusBarUpdater.next(false) 
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
  }
  selectionStarted(e) {
      console.log(this.selectedPhotos.length);
      console.log("started");
      this.global.selectedArr = this.selectedPhotos
  }
  allowDrop(ev) {
    ev.preventDefault();
    this.global.selectedArr = this.selectedPhotos
    this.selectContainer.disabled = false
    
  }
  doubleClick(e) {
    console.log("Double click e: ", e);
  }
  ngOnInit(): void {
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
    this.http.get(`http://192.168.1.86:4012/api/mov/getlatestimports`).subscribe((res: any) => {
      console.log(res);
      
      this.photosArr = res
      
    })
  }
}
