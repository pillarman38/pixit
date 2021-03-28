import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit } from '@angular/core';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { GlobalInfoService } from '../global-info.service';

@Component({
  selector: 'app-latest-imports',
  templateUrl: './latest-imports.component.html',
  styleUrls: ['./latest-imports.component.scss']
})
export class LatestImportsComponent implements OnInit {
  photosArr: any[] = [];
  selectedPhotos: any[] = [];
  dragtoalbum = false

  @ViewChild(SelectContainerComponent) selectContainer: SelectContainerComponent;
 
  constructor(private http:HttpClient, private global: GlobalInfoService) { }

  selected(e) {
    console.log(e);
  }
  click(e) {
    console.log("hi");
    
    e.preventDefault();
    console.log(e);
    // this.selectContainer.disabled = false
    // this.selectContainer.clearSelection()
  }
  // drag(ev) {
  //   this.dragtoalbum = true
  //   console.log("dragging");
    
  // }
  // dragend() {
  //   this.dragtoalbum = false
  //   console.log("done dragging");
    
  // }
  dragPhotos(e) {
    console.log("files: ", e);
    
    
    // console.log("frozen");
    
  }
  liftfreeze(e){
    console.log(e);
    console.log("HIOIIII");

    console.log(this.global.selectedArr, this.selectedPhotos);
    this.selectContainer.disabled = false
    
  }

  // drop(ev) {
  //   ev.preventDefault();
  //   var data = ev.dataTransfer.getData("text");
  //   console.log("data: ", data);
    
  //   ev.target.appendChild(document.getElementById(data));
  // }
  selectionEnded(e) {
    console.log(this.selectedPhotos.length);
    console.log("frozen");
    // this.global.selectedAlbum = this.selectedPhotos
    this.selectContainer.disabled = true
    
    // this.selectContainer.disabled = true
    
  }
  allowDrop(ev) {
    ev.preventDefault();
    // console.log("hi");
    this.global.selectedArr = this.selectedPhotos
    
  }
  ngOnInit(): void {
    this.http.get(`http://192.168.1.86:4012/api/mov/getlatestimports`).subscribe((res: any) => {
      console.log(res);
      
      this.photosArr = res
      
    })
  }
}
