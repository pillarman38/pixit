import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImportsComponent } from './imports/imports.component';
import { CamerarollComponent } from './cameraroll/cameraroll.component';
import { VideoPhotoViewerComponent } from './video-photo-viewer/video-photo-viewer.component';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';
import { ppid } from 'process';
import { LatestImportsComponent } from './latest-imports/latest-imports.component';
import { TrashComponent } from './trash/trash.component';
import { DragToSelectModule } from 'ngx-drag-to-select';

const appRoutes = [
  {path: 'imports', component: ImportsComponent},
  {path: 'cameraroll', component: CamerarollComponent},
  {path: 'viewer', component: VideoPhotoViewerComponent},
  {path: 'albumviewer', component: AlbumViewerComponent},
  {path: 'popup', component: PopupComponent},
  {path: 'latestimports', component: LatestImportsComponent},
  {path: 'trash', component: TrashComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ImportsComponent,
    CamerarollComponent,
    VideoPhotoViewerComponent,
    AlbumViewerComponent,
    PopupComponent,
    LatestImportsComponent,
    TrashComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DragToSelectModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
