import { Component, OnInit } from '@angular/core';
import { GlobalInfoService } from '../global-info.service';

@Component({
  selector: 'app-video-photo-viewer',
  templateUrl: './video-photo-viewer.component.html',
  styleUrls: ['./video-photo-viewer.component.css']
})
export class VideoPhotoViewerComponent implements OnInit {
  photo
  constructor(private global: GlobalInfoService) { }

  ngOnInit(): void {
    this.photo = this.global.viewedphoto
    console.log(this.photo);
  }
}
