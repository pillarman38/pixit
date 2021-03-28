import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalInfoService } from '../global-info.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cameraroll',
  templateUrl: './cameraroll.component.html',
  styleUrls: ['./cameraroll.component.css']
})
export class CamerarollComponent implements OnInit {
  albumarr = []
  newImports = []
  tmp = []
  isDown = false
  @ViewChild('box') draggableElement;
  a;
  b;
  c;
  wentOver = false
  event;
  pOnePointX
  pOnePointY
  pTwoPointX
  pTwoPointY
  pTwo;
  pOne;
  box;
  classStorage = []

  @HostListener("document:mousedown", ["$event"]) 
  mouseDrag(event) {

    // var ele = document.getElementsByClassName('ele')
    
    
    var elemArray = []
  
    if(event.target.closest('.selected') == null) {
      var elem = document.querySelectorAll('.selected')
      // console.log(elem.length);
      // this.global.selectedArr = []
      for(var i = 0; i < elem.length; i++) {
        // console.log(i);
        elem[i].classList.remove('selected')
      }
    } else {
      // console.log("not null");
      var elem = document.querySelectorAll('#drag1')
      // console.log(elem.length);
      // this.global.selectedArr = []
      for(var i = 0; i < elem.length; i++) {
        // // console.log(i);
      }
      
    }
    this.event = event
    var pointOne = document.createElement("div")
    pointOne.setAttribute("id", "pointOne")
    document.body.appendChild(pointOne)

    var pointTwo = document.createElement("div")
    pointTwo.setAttribute("id", "pointTwo")
    document.body.appendChild(pointTwo)

    this.box = document.createElement("div")
    this.box.setAttribute("id", "box")
    document.body.appendChild(this.box)
    

    this.pOne = document.getElementById("pointOne")
    this.pTwo = document.getElementById("pointTwo")
    // document.body.textContent = "clientX: " + event.clientX + " - clientY: " + event.clientY;

    this.isDown = true
    this.pOne.style.position = "absolute"
    this.pOne.style.left = event.pageX + 'px';
    this.pOne.style.top = event.pageY + 'px';
    this.pOne.style.width = "10px"
    this.pOne.style.backgroundColor = "blue"
    this.pOne.style.height = "10px"
    this.pOnePointX = event.pageX
    this.pOnePointY = event.pageY

    this.box.style.left = (parseInt(event.pageX, 10) + 25) + 'px';
    this.box.style.top = (parseInt(event.pageY, 10) - 10) + 'px';
    // // console.log("margin: ", this.pOne.style.left)  
    }

	@HostListener('document:mousemove', ['$event']) 
  handleMouseMove(e) {
    if(this.isDown == true) {

      
      var ele = document.getElementsByClassName('ele')
      
      // // console.log(ele.length);

      for(var i=0; i < ele.length; i++) {
        // // console.log(ele[i].getBoundingClientRect());
        // // console.log(this.box.getBoundingClientRect())
        var boxDimentions = this.box.getBoundingClientRect()
        var pointer = this.pTwo.getBoundingClientRect()
        var eleDimentions = ele[i].getBoundingClientRect()
        var boxX = boxDimentions['x']
        var boxY = boxDimentions['y']
        var boxWidth = boxDimentions['width']
        var boxHeight = boxDimentions['height']
        
        var eleX = eleDimentions['x']
        var eleY = eleDimentions['y']
        var eleWidth = eleDimentions['width']
        var eleHeight = eleDimentions['height']
        var eleXRight = eleWidth + boxX
        var eleYRight = eleWidth + boxY
        

        // console.log(eleDimentions, this.pOne.getBoundingClientRect(), this.pTwo.getBoundingClientRect());
        // if(pointer['x'] >= eleDimentions['x'] && pointer['x'] <= eleDimentions['x'] + eleDimentions['width']) {
        //   // console.log("greater than.");
        //   ele[i].classList.add('selected')
        //   this.wentOver = true
        // } 
        // if(pointer['x'] >= eleDimentions['x'] + eleDimentions['width'] && this.wentOver == true) {
        //   ele[i].classList.remove('selected')
        //   // console.log("less than.");
        // }

        // if(pointer['y'] <= eleDimentions['y'] && pointer['y'] <= eleDimentions['y'] + eleDimentions['height']) {
        //   // console.log("greater than.");
        //   ele[i].classList.add('selected')
        // } 
        // if(pointer['y'] >= eleDimentions['y'] && pointer['y'] >= eleDimentions['y'] + eleDimentions['height']) {
        //   ele[i].classList.remove('selected')
        //   // console.log("less than.");
        // }
      }

      if(this.isDown) {
        this.pTwo.style.position = "absolute"
        this.pTwo.style.left = e.pageX + 'px';
        this.pTwo.style.top = e.pageY + 'px';
        this.pTwo.style.width = "10px"
        this.pTwo.style.backgroundColor = "red"
        this.pTwo.style.height = "10px"
        this.pTwoPointX = e.pageX
        this.pTwoPointY = e.pageY
        this.box.style.backgroundColor = "rgba(51, 170, 51, .1)"

        // // console.log(this.box.offsetTop);
        
        this.a = this.pOnePointX - this.pTwoPointX;
        this.b = this.pOnePointY - this.pTwoPointY;
        // // console.log(this.box.style)
        var c = Math.sqrt( this.a*this.a + this.b*this.b );
        
        // // console.log(c, this.a, this.b, Math.abs(this.a), Math.abs(this.b), e.pageY, e.pageX)
      
        if(this.a >= 0) {
          this.box.style.position = "absolute"
          this.box.style.width = Math.abs(this.a) + "px"
          this.box.style.height = Math.abs(this.b) + "px"
          this.box.style.border = "2px solid green"
          this.box.style.left = e.pageX + "px"
        } else {
          this.box.style.position = "absolute"
          this.box.style.width = Math.abs(this.a) + "px"
          this.box.style.height = Math.abs(this.b) + "px"
          this.box.style.border = "2px solid green"
          this.box.style.right = e.pageX + "px"
        }

        if(this.b >= 0) {
          this.box.style.position = "absolute"
          this.box.style.width = Math.abs(this.a) + "px"
          this.box.style.height = Math.abs(this.b) + "px"
          this.box.style.border = "2px solid green"
          this.box.style.top = e.pageY + "px"
        } else {
          this.box.style.position = "absolute"
          this.box.style.width = Math.abs(this.a) + "px"
          this.box.style.height = Math.abs(this.b) + "px"
          this.box.style.border = "2px solid green"
          this.box.style.bottom = e.pageY + "px"
        }
        // // console.log(e.target.closest('div'));
      }
    }
  }
  // @HostListener('document:click', ["$event"])
  // clicked(e) {
  //   e.preventDefault()
  //   if(e.target.closest('#drag1') == null) {
  //     var elem = document.querySelectorAll('.selected')
  //     // console.log(elem.length);
  //     this.global.selectedArr = []
  //     for(var i = 0; i < elem.length; i++) {
  //       // console.log(i);
  //       elem[i].classList.remove('selected')
  //     }
  // }
//   if(e.target.closest('.selected') > 0) {
//     var elem = document.querySelectorAll('.selected')
//     // console.log(elem.length);
//     this.global.selectedArr = []
//     for(var i = 0; i < elem.length; i++) {
//       // console.log(i);
//       elem[i].classList.remove('selected')
//     }
// }
// }
  @HostListener('document:mouseup', ["$event"])
  dragDone() {
    this.isDown = false
    document.getElementById("pointOne").remove()
    document.getElementById("pointTwo").remove()
    
    document.getElementById('box').remove()
    // console.log("no drag")
  }
 


  @HostListener('document:touchstart', ['$event'])
  touchDrag(event) {
    this.event = event
   var pointOne = document.createElement("div")
   pointOne.setAttribute("id", "pointOne")
   document.body.appendChild(pointOne)

   var pointTwo = document.createElement("div")
   pointTwo.setAttribute("id", "pointTwo")
   document.body.appendChild(pointTwo)

   this.box = document.createElement("div")
   this.box.setAttribute("id", "box")
   document.body.appendChild(this.box)

   this.pOne = document.getElementById("pointOne")
   this.pTwo = document.getElementById("pointTwo")
   // document.body.textContent = "clientX: " + event.clientX + " - clientY: " + event.clientY;

   this.isDown = true
   	this.pOne.style.position = "absolute"
    this.pOne.style.left = event.pageX + 'px';
    this.pOne.style.top = event.pageY + 'px';
    this.pOne.style.width = "10px"
    this.pOne.style.backgroundColor = "blue"
    this.pOne.style.height = "10px"
    this.pOnePointX = event.pageX
    this.pOnePointY = event.pageY

    this.box.style.left = (parseInt(event.pageX, 10) + 25) + 'px';
    this.box.style.top = (parseInt(event.pageY, 10) - 10) + 'px';
    // console.log("margin: ", this.pOne.style.left)
  
  }

	@HostListener('document:touchmove', ['$event']) 
  handleTouchMove(e) {

   // console.log(e.pageX, e.pageY)
   if(this.isDown) {
     this.pTwo.style.position = "absolute"
     this.pTwo.style.left = e.pageX + 'px';
     this.pTwo.style.top = e.pageY + 'px';
     this.pTwo.style.width = "10px"
     this.pTwo.style.backgroundColor = "red"
     this.pTwo.style.height = "10px"
     this.pTwoPointX = e.pageX
     this.pTwoPointY = e.pageY
     this.box.style.backgroundColor = "rgba(51, 170, 51, .1)"
   
     this.a = this.pOnePointX - this.pTwoPointX;
     this.b = this.pOnePointY - this.pTwoPointY;
     // console.log(this.box.style)
     var c = Math.sqrt( this.a*this.a + this.b*this.b );
     
     // console.log(c, this.a, this.b, Math.abs(this.a), Math.abs(this.b), e.pageY, e.pageX)
// var beginningX = event.pageX
			  if(this.a >= 0) {
				  this.box.style.position = "absolute"
				  this.box.style.width = Math.abs(this.a) + "px"
				  this.box.style.height = Math.abs(this.b) + "px"
				  this.box.style.border = "2px solid green"
				  this.box.style.left = e.pageX + "px"
			  } else {
				  this.box.style.position = "absolute"
				  this.box.style.width = Math.abs(this.a) + "px"
				  this.box.style.height = Math.abs(this.b) + "px"
				  this.box.style.border = "2px solid green"
				  this.box.style.right = e.pageX + "px"
			  }

			if(this.b >= 0) {
				this.box.style.position = "absolute"
				this.box.style.width = Math.abs(this.a) + "px"
				this.box.style.height = Math.abs(this.b) + "px"
				this.box.style.border = "2px solid green"
				this.box.style.top = e.pageY + "px"
			} else {
				this.box.style.position = "absolute"
				this.box.style.width = Math.abs(this.a) + "px"
				this.box.style.height = Math.abs(this.b) + "px"
				this.box.style.border = "2px solid green"
				this.box.style.bottom = e.pageY + "px"
      }
      if(e.target.closest('.selected') == null) {
        
        var elem = document.querySelectorAll('#drag1')
        // console.log(elem.length);
        this.global.selectedArr = []
        // console.log("ELEM", elem);
        
        // for(var i = 0; i < elem.length; i++) {
        //   // console.log(i);
        //   elem[i].classList.add('selected')
        // }
    }
	  }
  }

  @HostListener('document:touchend', ["$event"])
  touchDone() {
    this.isDown = false
    document.getElementById("pointOne").remove()
    document.getElementById("pointTwo").remove()
    
    document.getElementById('box').remove()
    // console.log("no drag")
  }
 
  constructor(private http: HttpClient, private global: GlobalInfoService, private router: Router) { }
  wrapperClick(ev) {
    
  }
  method2(e){
    this.global.viewedphoto = e.target.currentSrc
    this.router.navigateByUrl('/viewer')
  }
  click(ev){
    // console.log(ev);
    if(ev.shiftKey) {
      // console.log(ev);
    }
    var elem = document.querySelectorAll('.selected')
    // console.log(elem.length);
    this.global.selectedArr = []
    // console.log(elem.length);
    
    for(var i = 0; i < elem.length; i++) {
      // console.log(i);
      elem[i].classList.remove('selected')
    }
    if(this.global.selectedArr.includes(ev.target.currentSrc)) {
      var index = this.global.selectedArr.indexOf(ev.target.currentSrc)
      
      this.global.selectedArr.splice( index );
      // console.log(this.global.selectedArr);
    } 
      // ev.target.classList.add("selected")
      this.global.selectedArr.push(ev.target.currentSrc)
      // console.log(this.global.selectedArr);
  }
  allowDrop(ev) {
    ev.preventDefault();
    // console.log("hi");
    // ev.target.classList.add("selected")
    this.global.selectedArr.push(ev.target.currentSrc)
    // console.log(ev, this.global.selectedArr);
  }
  
  drag(ev) {
    // console.log("drag", ev);
    ev.dataTransfer.setData("text", ev);
  }
  
  drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  ngOnInit(): void {
    if(this.global.latestImports = []) {
      this.http.get("http://192.168.1.86:4012/api/mov/getlatestimports").subscribe((res: any) => {
        // console.log(res);
        this.global.latestImports = res
        this.tmp = this.global.latestImports
        this.newImports = res
        // console.log(this.newImports);
      })
    }
    this.tmp = this.global.latestImports
    this.newImports = this.tmp.map(itm => itm['photo'])
    // console.log(this.newImports);
    
  }
}
