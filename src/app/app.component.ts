import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalInfoService } from './global-info.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HostListener } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

i = 0;

arrOfPhotos = []
arrOfVideos = []
videosBefore = []
videos = []
photosBefore = []
photos = []
albumarr = [] 
popup = false

constructor(private http: HttpClient, private global: GlobalInfoService, private router: Router, private eRef: ElementRef) {}

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
  var uploadObj = {
    percent: 0,
    index: this.i,
    // type: extension,
    location: `http://192.168.1.86:4012/${e.target.files[this.i]['name'].replace(new RegExp(' ', 'g'), '%20')}`,
    title: e.target.files[this.i]['name']
  }
  // if(uploadObj['type'] == "png" || uploadObj['type'] == "jpeg") {
  //  this.arrOfPhotos.push(uploadObj)
  // }
  // if(uploadObj['type'] == "mov" || uploadObj['type'] == "mp4" || uploadObj['type'] == "MOV") {
  //   this.arrOfVideos.push(uploadObj)
  // }
  this.http.post("http://192.168.1.86:4012/api/mov/uploadmedia", formData, {
      reportProgress: true,
      observe: "events"
    }).subscribe((data) => {
      console.log(this.i, data)
        
        var uploadProgress = 0
        uploadProgress =  Math.ceil((data['loaded'] / data['total']) * 100)
        
        if(!isNaN(uploadProgress)) {
          var foundPhoto = this.arrOfPhotos.find(function(post, index) {
            if(post.title == uploadObj['title']){
              post['percent'] = uploadProgress
            }
          });
          var foundVideo = this.arrOfVideos.find(function(post, index) {
            if(post.title == uploadObj['title']){
              post['percent'] = uploadProgress
            }
          });
          if(uploadObj['type'] == "png" || uploadObj['type'] == "jpeg") {
            console.log("picture")
            // web.emit("photoUpdater", this.arrOfPhotos)
          }
          if(uploadObj['type'] == "mov" || uploadObj['type'] == "mp4" || uploadObj['type'] == "MOV") {
            console.log("video");
            
            // web.emit("videoUpdater", this.arrOfVideos)
          }
        }
    })
  this.counter(e)
}
allowDrop(ev) {
  ev.preventDefault();
  console.log("hi");
}

drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

drop(ev) {
  console.log(ev);
  
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  console.log("yay", ev);
  var unique = this.global.selectedArr;
  
  console.log(unique);
  var postData = {
    album: ev.target.innerHTML,
    photos: unique
  }
console.log(postData);

  this.http.post('http://192.168.1.86:4012/api/mov/albummodifier', postData).subscribe((res) => {
    console.log(res);
  })
}
albumSelect(e) {
  this.global.selectedAlbum = e.target.innerHTML
  console.log(this.global.selectedAlbum);
  this.router.navigateByUrl('/albumviewer')
  this.global.reloadData()
}

createAlbum(e) {
  console.log(e);
  this.global.plusButtonClicked = true
  this.global.change()
}
  ngOnInit() {
    this.http.get('http://192.168.1.86:4012/api/mov/getalbums').subscribe((res: any) => {
      console.log(res);
      this.global.albums = res
      this.albumarr = res
    })
    this.global.showModal$.subscribe((res)=> {
      console.log(res);
      
      this.popup = res
    })
    this.global.albumUpdater.subscribe((res) => {
      this.albumarr = res
    })
  }
}
