import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { GlobalInfoService } from '../global-info.service';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {
  i = 0;

  arrOfPhotos = []
  arrOfVideos = []
  videosBefore = []
  videos = []
  photosBefore = []
  photos = []
  albumarr = []

  constructor(private http: HttpClient, private global: GlobalInfoService) { }

  counter(e) {
    if(this.i + 1!= e.target.files.length){
      this.i++;
      this.handleDrop(e)
    } 
  }
  handleDrop(e) {
    
    var formData = new FormData();
  
    formData.append("photos", e.target.files[this.i]);
    
    // var web = this.webSocket
    // var extension = this.getextension(e.target.files[this.i]['name'])
    // console.log(extension)
    // var uploadObj = {
    //   percent: 0,
    //   index: this.i,
    //   // type: extension,
    //   location: `http://192.168.1.86:4012/${e.target.files[this.i]['name'].replace(new RegExp(' ', 'g'), '%20')}`,
    //   title: e.target.files[this.i]['name']
    // }
    // if(uploadObj['type'] == "png" || uploadObj['type'] == "jpeg") {
    //  this.arrOfPhotos.push(uploadObj)
    // }
    // if(uploadObj['type'] == "mov" || uploadObj['type'] == "mp4" || uploadObj['type'] == "MOV") {
    //   this.arrOfVideos.push(uploadObj)
    // }
    this.http.post("http://192.168.1.86:4012/api/mov/uploadmedia", formData,{ reportProgress: true, observe: 'events' }).subscribe((data: any) => {
        console.log(data)
        if (data.type === HttpEventType.Response) {
          console.log('Upload complete');
      }
      if (data.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * data.loaded / data.total);
          console.log('Progress ' + percentDone + '%');
      }
        // const percentDone = Math.round(100 * data.loaded / data.total);
        
        // console.log(percentDone);
        // if(percentDone == 100) {
        //   this.albumarr = data
        // }
        
        // console.log(this.albumarr);
      })
    this.counter(e)
  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  
  drag(ev) {
    ev.dataTransfer.setData("text", ev);
    console.log(ev.target.src);
  }
  
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  ngOnInit(): void {
    this.http.get('http://192.168.1.86:4012/api/mov/getlatestimports').subscribe((res: any) => {
      console.log(res);
      this.albumarr = res
    })
  }
}
