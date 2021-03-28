import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalInfoService } from '../global-info.service';
import { Router } from '@angular/router';
import { SelectContainerComponent } from 'ngx-drag-to-select';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.scss']
})
export class AlbumViewerComponent implements OnInit {
  photosArr: any[] = [];
  selectedPhotos: any[] = [];
  dragtoalbum = false

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
 
  constructor(private http: HttpClient, private global: GlobalInfoService, private router: Router) { }
 
  selected(e) {
    console.log(e);
  }
  click(e) {
    console.log("Selected photos: ", this.selectedPhotos);
    console.log(this.selectContainer.disabled);
    
  }

  dragPhotos(e) {
    console.log("files: ", e);
    // this.selectContainer.disabled = true
  }
  liftfreeze(e){
    console.log("Mouseup");
    
    // this.selectContainer.disableDrag = false
    
    console.log(this.global.selectedArr, this.selectedPhotos);
    this.global.selectedArr = this.selectedPhotos
    
  }

  ngOnInit(): void {
    console.log("WHAT: ", this.global.photosArr);
    
    this.global.currentMsg.subscribe((res) => {
      
      this.photosArr = res
      console.log("UPDATE: ", res, this.photosArr);
      console.log(res, this.photosArr);
      
    })
  }
}
