import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { ViewChild } from '@angular/core';
import {ElementRef} from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalInfoService } from '../global-info.service';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  private wasInside = false;

  @HostListener('click')
  clickInside() {
    console.log("was inside");
    
    this.wasInside = true;
  }
  
  @HostListener('document:click')
  clickout() {
    if (!this.wasInside && this.global.plusButtonClicked == false) {
      console.log("was outside");
      this.global.change()
    }
    if (!this.wasInside && this.global.plusButtonClicked == true) {
      console.log("was outside");
      this.global.plusButtonClicked = false
    }
    this.wasInside = false;
  }

  @ViewChild("myModal", { static: false }) modal: ElementRef;
  @ViewChild("content", { static: false }) content: ElementRef;
  albumForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private global: GlobalInfoService) { 
    this.albumForm = fb.group({
      albuminput: ["", [Validators.required]]
    });
  }

open() {
    this.modal.nativeElement.style.display = "block";
  }

  close() {
    this.modal.nativeElement.style.display = "none";
  }
onFormSubmit(){
    console.log("hi")
    let formData = new FormData ()
    var d = new Date();
    var getDay = d.getDay()
    var getMonth = d.getMonth()
    var getYear = d.getFullYear()

    formData.append("name", this.albumForm.get("albuminput").value)
    formData.append("dateCreated", `${getMonth}/${getDay}/${getYear}`)
  
  
    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
    let options = { headers: headers };
  console.log(formData);
  
  this.http.post('http://192.168.1.86:4012/api/mov/albumcreate', formData).subscribe((res: any)=>{
    console.log(res);
    this.global.updateAlbum(res)
  })
  }
  ngOnInit(): void {
  }

}
